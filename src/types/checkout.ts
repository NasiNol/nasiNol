// src/types/checkout.ts
export interface FormData {
  name: string
  phone: string
  email: string
}

export interface Product {
  name: string
  image: string
  quantity: number
}

export interface PaymentSummaryData {
  subtotal: number
  tax: number
  total: number
}