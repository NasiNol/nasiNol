// src/hooks/useCheckout.ts - UPDATED VERSION
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

interface FormData {
  name: string
  phone: string
  email: string
}

export function useCheckout() {
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: ''
  })
  const router = useRouter()
  const { items, clearCart } = useCart()

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Silakan lengkapi semua data')
      return
    }

    setIsProcessing(true)

    try {
      // 1. Create Order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            produkId: item.id,
            jumlah: item.quantity,
            hargaSatuan: item.price
          })),
          metodePengambilan: 'pickup', // atau 'delivery'
          waktuPengambilan: new Date(Date.now() + 60 * 60 * 1000) // 1 jam dari sekarang
        })
      })

      if (!orderResponse.ok) {
        throw new Error('Gagal membuat pesanan')
      }

      const orderData = await orderResponse.json()
      const transaksiId = orderData.data.transaksiId

      // 2. Initiate Payment
      const paymentResponse = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaksiId,
          metodePembayaran: paymentMethod // 'qris', 'bank-transfer', 'all'
        })
      })

      if (!paymentResponse.ok) {
        throw new Error('Gagal memproses pembayaran')
      }

      const paymentData = await paymentResponse.json()

      // 3. Redirect ke Midtrans Snap atau custom payment page
      if (paymentMethod === 'midtrans') {
        // Redirect ke Midtrans Snap
        window.location.href = paymentData.data.redirect_url
      } else if (paymentMethod === 'bank-transfer') {
        // Redirect ke custom bank transfer page
        router.push(`/payment/bank?order_id=${transaksiId}`)
      } else if (paymentMethod === 'qris') {
        // Redirect ke custom QRIS page
        router.push(`/payment/qr?order_id=${transaksiId}`)
      }

      // Clear cart setelah sukses
      clearCart()

    } catch (error) {
      console.error('Checkout error:', error)
      alert('Gagal melakukan checkout. Silakan coba lagi.')
    } finally {
      setIsProcessing(false)
    }
  }

  const validateForm = () => {
    return formData.name && formData.phone && formData.email && paymentMethod
  }

  return {
    quantity,
    setQuantity,
    paymentMethod,
    setPaymentMethod,
    formData,
    setFormData,
    handlePayment,
    validateForm,
    isProcessing
  }
}