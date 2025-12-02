// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { auth } from '@/lib/auth'
import prisma from "@/lib/prisma";
import type { 
  CreateOrderRequest, 
  UserSession 
} from '@/types/api'


interface ValidatedItem {
  produkId: string
  jumlah: number
  hargaSatuan: Decimal
  subtotal: Decimal
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentikasi user
    const session = await auth.api.getSession({ headers: request.headers }) as UserSession | null
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: CreateOrderRequest = await request.json()
    const { items, metodePengambilan, waktuPengambilan } = body

    // 2. Validasi input
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Keranjang kosong' },
        { status: 400 }
      )
    }

    if (!metodePengambilan) {
      return NextResponse.json(
        { error: 'Metode pengambilan harus dipilih' },
        { status: 400 }
      )
    }

    // 3. Validasi stok produk dan hitung total
    let totalHarga = 0
    const validatedItems: ValidatedItem[] = []

    for (const item of items) {
      const produk = await prisma.produk.findUnique({
        where: { id: item.produkId }
      })

      if (!produk) {
        return NextResponse.json(
          { error: `Produk dengan ID ${item.produkId} tidak ditemukan` },
          { status: 404 }
        )
      }

      if (produk.stok < item.jumlah) {
        return NextResponse.json(
          { error: `Stok ${produk.namaProduk} tidak mencukupi` },
          { status: 400 }
        )
      }

      if (produk.statusProduk !== 'tersedia') {
        return NextResponse.json(
          { error: `${produk.namaProduk} tidak tersedia` },
          { status: 400 }
        )
      }

      const subtotal = Number(produk.hargaDiskon) * item.jumlah
      totalHarga += subtotal

      validatedItems.push({
        produkId: item.produkId,
        jumlah: item.jumlah,
        hargaSatuan: produk.hargaDiskon,
        subtotal: new Decimal(subtotal)
      })
    }

    // 4. Buat transaksi dengan detail
    const transaksi = await prisma.transaksi.create({
      data: {
        pembeliId: session.user.id,
        totalHarga,
        statusTransaksi: 'pending',
        metodePengambilan,
        waktuPengambilan: waktuPengambilan || null,
        detailTransaksi: {
          create: validatedItems
        }
      },
      include: {
        detailTransaksi: {
          include: {
            produk: {
              include: {
                penjual: true
              }
            }
          }
        }
      }
    })

    // 5. Update stok produk
    for (const item of items) {
      await prisma.produk.update({
        where: { id: item.produkId },
        data: {
          stok: {
            decrement: item.jumlah
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        transaksiId: transaksi.id,
        totalHarga: transaksi.totalHarga,
        statusTransaksi: transaksi.statusTransaksi,
        items: transaksi.detailTransaksi
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat pesanan' },
      { status: 500 }
    )
  }
}

// GET: Ambil semua order user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers }) as UserSession | null
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await prisma.transaksi.findMany({
      where: {
        pembeliId: session.user.id
      },
      include: {
        detailTransaksi: {
          include: {
            produk: true
          }
        },
        pembayaran: true
      },
      orderBy: {
        waktuTransaksi: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: orders
    })

  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data pesanan' },
      { status: 500 }
    )
  }
}