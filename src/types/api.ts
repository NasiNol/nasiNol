// src/types/api.ts
// API Request & Response Types

import { Prisma } from '@/generated/prisma/client'

// ==========================================
// ORDER TYPES
// ==========================================

export interface CreateOrderRequest {
  items: OrderItemRequest[]
  metodePengambilan: string
  waktuPengambilan?: string | Date
}

export interface OrderItemRequest {
  produkId: string
  jumlah: number
  hargaSatuan: number
}

export interface CreateOrderResponse {
  success: boolean
  data: {
    transaksiId: string
    totalHarga: number
    statusTransaksi: string
    items: OrderItemDetail[]
  }
}

export interface OrderItemDetail {
  id: string
  produkId: string
  jumlah: number
  hargaSatuan: number
  subtotal: number
  produk: {
    id: string
    namaProduk: string
    fotoProduk: string | null
    penjual: {
      id: string
      namaRestoran: string
    }
  }
}

// Full order with all relations
export type OrderWithRelations = Prisma.TransaksiGetPayload<{
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
    pembayaran: true
    pembeli: {
      select: {
        id: true
        name: true
        email: true
        noTelepon: true
      }
    }
  }
}>

// ==========================================
// PAYMENT TYPES
// ==========================================

export interface InitiatePaymentRequest {
  transaksiId: string
  metodePembayaran: PaymentMethodType
}

export interface InitiatePaymentResponse {
  success: boolean
  data: {
    token: string
    redirect_url: string
    transaksiId: string
  }
}

export interface MidtransNotification {
  order_id: string
  transaction_status: TransactionStatus
  fraud_status?: FraudStatus
  payment_type: string
  gross_amount: string
  status_code: string
  signature_key: string
  transaction_id?: string
  transaction_time?: string
  settlement_time?: string
}

export interface MidtransItemDetail {
  id: string
  price: number
  quantity: number
  name: string
}

export interface MidtransCustomerDetail {
  first_name: string
  email: string
  phone: string
}

export interface MidtransTransactionParameter {
  transaction_details: {
    order_id: string
    gross_amount: number
  }
  item_details: MidtransItemDetail[]
  customer_details: MidtransCustomerDetail
  enabled_payments: string[]
  callbacks: {
    finish: string
    error: string
    pending: string
  }
}

// ==========================================
// ENUMS & CONSTANTS
// ==========================================

export type PaymentMethodType = 
  | 'qris' 
  | 'bank-transfer' 
  | 'e-wallet' 
  | 'midtrans' 
  | 'all'

export type TransactionStatus = 
  | 'capture' 
  | 'settlement' 
  | 'pending' 
  | 'deny' 
  | 'cancel' 
  | 'expire'

export type FraudStatus = 
  | 'accept' 
  | 'deny' 
  | 'challenge'

export type OrderStatus = 
  | 'pending' 
  | 'sedang_diproses' 
  | 'siap_diambil' 
  | 'selesai' 
  | 'dibatalkan'

export type PaymentStatus = 
  | 'pending' 
  | 'success' 
  | 'failed'

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// ==========================================
// USER SESSION TYPE
// ==========================================

export interface UserSession {
  user: {
    id: string
    name?: string | null
    email: string
    role: 'PEMBELI' | 'PENJUAL' | 'ADMIN'
  }
  session: {
    id: string
    expiresAt: Date
  }
}

// ==========================================
// WEBHOOK PAYLOAD TYPE
// ==========================================

export interface WebhookPayload {
  orderId: string
  transactionStatus: TransactionStatus
  paymentType: string
  statusCode: string
  grossAmount: string
  signatureKey: string
}

// ==========================================
// UPDATE ORDER STATUS REQUEST
// ==========================================

export interface UpdateOrderStatusRequest {
  statusTransaksi: OrderStatus
}

export interface UpdateOrderStatusResponse {
  success: boolean
  data: {
    id: string
    statusTransaksi: OrderStatus
    lastUpdate: Date
  }
}