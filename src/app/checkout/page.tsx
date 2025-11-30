// src/app/checkout/page.tsx
"use client"

import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import CheckoutOrnament from '@/components/checkout/CheckoutOrnament'
import ProductSummary from '@/components/checkout/ProductSummary'
import OrderInformationForm from '@/components/checkout/OrderInformationForm'
import PaymentSummary from '@/components/checkout/PaymentSummary'
import { useCheckout } from '@/hooks/useCheckout'

export default function CheckoutPage() {
  const {
    quantity,
    paymentMethod,
    setPaymentMethod,
    formData,
    setFormData,
    handlePayment
  } = useCheckout()

  // Product data (bisa dari props/context/API)
  const product = {
    name: 'Ayam Goreng',
    image: '/ayamgoreng-checkout.png',
    quantity: quantity
  }

  // Payment data (bisa dari calculation/API)
  const paymentData = {
    subtotal: 20000,
    tax: 1350,
    total: 21350
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <CheckoutOrnament />
      <Header locationValue="semarang" />
      
      <ProductSummary product={product} />
      
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