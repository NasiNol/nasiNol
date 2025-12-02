// src/app/checkout/page.tsx
"use client"

import { useSearchParams } from 'next/navigation'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import CheckoutOrnament from '@/components/checkout/CheckoutOrnament'
import ProductSummary from '@/components/checkout/ProductSummary'
import OrderInformationForm from '@/components/checkout/OrderInformationForm'
import PaymentSummary from '@/components/checkout/PaymentSummary'
import { useCheckout } from '@/hooks/useCheckout'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id') ? parseInt(searchParams.get('id')!) : undefined
  const initialQuantity = searchParams.get('quantity') ? parseInt(searchParams.get('quantity')!) : 1

  const {
    quantity,
    setQuantity,
    paymentMethod,
    setPaymentMethod,
    formData,
    setFormData,
    handlePayment,
    product
  } = useCheckout(productId, initialQuantity)

  // Fallback product data jika tidak ada dari hook
  const displayProduct = product || {
    name: 'Ayam Goreng',
    image: '/ayamgoreng-checkout.png',
    quantity: quantity
  }

  // Payment calculation berdasarkan product yang dipilih
  const basePrice = product ? parseInt(product.price.replace('K', '000')) : 20000
  const subtotal = basePrice * quantity
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  const paymentData = {
    subtotal: subtotal,
    tax: tax,
    total: total
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <CheckoutOrnament />
      <Header locationValue="semarang" />
      
      <ProductSummary product={displayProduct} />
      
      {/* Form & Payment Section */}
      <div className="w-full relative z-20 pb-8">
        <div className="pl-[79px] pr-[78px]">
          <div className="flex gap-[52px]">
            <OrderInformationForm 
              formData={formData}
              setFormData={setFormData}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            
            <PaymentSummary 
              subtotal={paymentData.subtotal}
              tax={paymentData.tax}
              total={paymentData.total}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}