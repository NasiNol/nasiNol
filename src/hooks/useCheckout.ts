// src/hooks/useCheckout.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  phone: string
  email: string
}

export function useCheckout() {
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: ''
  })
  const router = useRouter()

  const handlePayment = () => {
    if (paymentMethod === 'bank-debit') {
      router.push('/payment/bank')
    } else if (paymentMethod === 'qris') {
      router.push('/payment/qr')
    } else {
      alert('Silakan pilih metode pembayaran terlebih dahulu')
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
    validateForm
  }
}