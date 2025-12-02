// src/app/api/payments/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
import { auth } from '@/lib/auth'
import midtransClient from 'midtrans-client'
import prisma from "@/lib/prisma";
import type {
  InitiatePaymentRequest,
  PaymentMethodType,
  MidtransTransactionParameter,
  UserSession
} from '@/types/api'


// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false, // Set true untuk production
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
})

interface MidtransTransactionResponse {
  token: string
  redirect_url: string
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentikasi
    const session = await auth.api.getSession({ headers: request.headers }) as UserSession | null
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { transaksiId, metodePembayaran }: InitiatePaymentRequest = await request.json()

    // 2. Validasi transaksi
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiId },
      include: {
        pembeli: true,
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

    if (transaksi.pembeliId !== session.user.id) {
      return NextResponse.json(
        { error: 'Tidak memiliki akses ke transaksi ini' },
        { status: 403 }
      )
    }

    // Cek apakah sudah ada pembayaran
    const existingPayment = await prisma.pembayaran.findUnique({
      where: { transaksiId }
    })

    if (existingPayment && existingPayment.statusPembayaran === 'success') {
      return NextResponse.json(
        { error: 'Transaksi sudah dibayar' },
        { status: 400 }
      )
    }

    // 3. Prepare item details untuk Midtrans
    const itemDetails = transaksi.detailTransaksi.map((detail: {
    produkId: string;
    hargaSatuan: number;
    jumlah: number;
    produk: { namaProduk: string };
    }) => ({
    id: detail.produkId,
    price: Number(detail.hargaSatuan),
    quantity: detail.jumlah,
    name: detail.produk.namaProduk
    }));


    // 4. Buat parameter untuk Midtrans
    const parameter: MidtransTransactionParameter = {
      transaction_details: {
        order_id: transaksi.id,
        gross_amount: Number(transaksi.totalHarga)
      },
      item_details: itemDetails,
      customer_details: {
        first_name: transaksi.pembeli.name || 'Customer',
        email: transaksi.pembeli.email,
        phone: transaksi.pembeli.noTelepon || ''
      },
      enabled_payments: getEnabledPayments(metodePembayaran),
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?order_id=${transaksi.id}`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/payment/error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending?order_id=${transaksi.id}`
      }
    }

    // 5. Create transaction token dari Midtrans
    const transaction = await snap.createTransaction(parameter) as MidtransTransactionResponse

    // 6. Simpan atau update pembayaran di database
    const paymentData = {
      transaksiId,
      metodePembayaran,
      jumlahBayar: transaksi.totalHarga,
      statusPembayaran: 'pending',
      buktiPembayaran: transaction.token // Simpan token
    }

    if (existingPayment) {
      await prisma.pembayaran.update({
        where: { id: existingPayment.id },
        data: paymentData
      })
    } else {
      await prisma.pembayaran.create({
        data: paymentData
      })
    }

    // 7. Return response dengan token dan redirect URL
    return NextResponse.json({
      success: true,
      data: {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        transaksiId: transaksi.id
      }
    })

  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { error: 'Gagal memproses pembayaran' },
      { status: 500 }
    )
  }
}

// Helper function untuk menentukan metode pembayaran
function getEnabledPayments(metodePembayaran: PaymentMethodType): string[] {
  const paymentMethods: Record<PaymentMethodType, string[]> = {
    'qris': ['gopay', 'shopeepay', 'qris'],
    'bank-transfer': ['bca_va', 'bni_va', 'bri_va', 'permata_va'],
    'e-wallet': ['gopay', 'shopeepay'],
    'midtrans': [],
    'all': [] // Kosongkan untuk enable semua metode
  }

  return paymentMethods[metodePembayaran] || []
}