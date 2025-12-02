// src/app/api/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, DetailTransaksi, Produk } from '@/generated/prisma/client'
import crypto from 'crypto'
import prisma from "@/lib/prisma";



interface MidtransNotification {
  order_id: string
  transaction_status: string
  fraud_status?: string
  payment_type: string
  gross_amount: string
  status_code: string
  signature_key: string
  transaction_id?: string
}

interface DetailTransaksiWithProduk extends DetailTransaksi {
  produk: Produk
}

export async function POST(request: NextRequest) {
  try {
    const notification: MidtransNotification = await request.json()
    
    // 1. Verify signature dari Midtrans
    const isValid = verifySignature(notification)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const {
      order_id,
      transaction_status,
      fraud_status,
      payment_type,
      gross_amount
    } = notification

    console.log('Midtrans notification:', {
      order_id,
      transaction_status,
      fraud_status,
      payment_type
    })

    // 2. Ambil data transaksi
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: order_id },
      include: {
        pembayaran: true,
        detailTransaksi: {
          include: {
            produk: true
          }
        }
      }
    })

    if (!transaksi) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      )
    }

    // 3. Tentukan status pembayaran berdasarkan notifikasi Midtrans
    let statusPembayaran = 'pending'
    let statusTransaksi = 'pending'

    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        statusPembayaran = 'success'
        statusTransaksi = 'sedang_diproses'
      }
    } else if (transaction_status === 'settlement') {
      statusPembayaran = 'success'
      statusTransaksi = 'sedang_diproses'
    } else if (transaction_status === 'pending') {
      statusPembayaran = 'pending'
      statusTransaksi = 'pending'
    } else if (
      transaction_status === 'deny' ||
      transaction_status === 'expire' ||
      transaction_status === 'cancel'
    ) {
      statusPembayaran = 'failed'
      statusTransaksi = 'dibatalkan'
      
      // Kembalikan stok produk
      await restoreStock(transaksi.detailTransaksi)
    }

    // 4. Update status pembayaran
    if (transaksi.pembayaran) {
      await prisma.pembayaran.update({
        where: { id: transaksi.pembayaran.id },
        data: {
          statusPembayaran,
          metodePembayaran: payment_type,
          buktiPembayaran: notification.transaction_id || null
        }
      })
    }

    // 5. Update status transaksi
    await prisma.transaksi.update({
      where: { id: order_id },
      data: {
        statusTransaksi
      }
    })

    // TODO: Kirim notifikasi ke user (bisa pakai WebSocket atau Push Notification)
    // await sendNotificationToUser(transaksi.pembeliId, statusPembayaran)

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Verify signature dari Midtrans
function verifySignature(notification: MidtransNotification): boolean {
  const { order_id, status_code, gross_amount, signature_key } = notification
  const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
  
  const hash = crypto
    .createHash('sha512')
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest('hex')
  
  return hash === signature_key
}

// Kembalikan stok produk jika pembayaran gagal
async function restoreStock(detailTransaksi: DetailTransaksiWithProduk[]): Promise<void> {
  for (const detail of detailTransaksi) {
    await prisma.produk.update({
      where: { id: detail.produkId },
      data: {
        stok: {
          increment: detail.jumlah
        }
      }
    })
  }
}