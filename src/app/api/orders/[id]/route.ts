// src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
import { auth } from '@/lib/auth'
import prisma from "@/lib/prisma";
import type { 
  UpdateOrderStatusRequest, 
  OrderStatus,
  UserSession 
} from '@/types/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers }) as UserSession | null
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    const order = await prisma.transaksi.findUnique({
      where: { id },
      include: {
        detailTransaksi: {
          include: {
            produk: {
              include: {
                penjual: true
              }
            }
          }
        },
        pembayaran: true,
        pembeli: {
          select: {
            id: true,
            name: true,
            email: true,
            noTelepon: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order tidak ditemukan' },
        { status: 404 }
      )
    }

    // Cek ownership
    if (order.pembeliId !== session.user.id) {
      return NextResponse.json(
        { error: 'Tidak memiliki akses ke order ini' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order
    })

  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data order' },
      { status: 500 }
    )
  }
}

// PATCH: Update order status (untuk penjual/admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers }) as UserSession | null
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const { statusTransaksi }: UpdateOrderStatusRequest = await request.json()

    // Validasi status
    const validStatuses: OrderStatus[] = [
      'pending',
      'sedang_diproses',
      'siap_diambil',
      'selesai',
      'dibatalkan'
    ]

    if (!validStatuses.includes(statusTransaksi)) {
      return NextResponse.json(
        { error: 'Status tidak valid' },
        { status: 400 }
      )
    }

    const order = await prisma.transaksi.findUnique({
      where: { id }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order tidak ditemukan' },
        { status: 404 }
      )
    }

    // Update status
    const updatedOrder = await prisma.transaksi.update({
      where: { id },
      data: { statusTransaksi }
    })

    // TODO: Kirim notifikasi ke user
    // if (statusTransaksi === 'siap_diambil') {
    //   await sendNotification(order.pembeliId, 'Order siap diambil!')
    // }

    return NextResponse.json({
      success: true,
      data: updatedOrder
    })

  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate order' },
      { status: 500 }
    )
  }
}