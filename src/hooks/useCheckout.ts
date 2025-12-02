// src/hooks/useCheckout.ts - UPDATED VERSION
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { getFoodById } from '@/data/mockFood'

interface FormData {
  name: string
  phone: string
  email: string
}

export function useCheckout(productId?: number, initialQuantity?: number) {
  const [quantity, setQuantity] = useState(initialQuantity || 1)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: ''
  })
  const router = useRouter()
  const { items, clearCart } = useCart()

  // Get product data jika ada productId
  const product = useMemo(() => {
    if (productId) {
      const foundProduct = getFoodById(productId)
      if (foundProduct) {
        return {
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          image: foundProduct.image,
          quantity: quantity
        }
      }
    }
    return null
  }, [productId, quantity])

  const handlePayment = () => {
    // Silent validation - no console logs
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Clear cart jika ada items
    if (items && items.length > 0) {
      clearCart()
    }

    // Immediate redirect tanpa try-catch atau processing
    if (paymentMethod === 'bank-debit' || paymentMethod === 'bank-transfer') {
      router.push('/payment/bank')
    } else if (paymentMethod === 'qris') {
      router.push('/payment/qr')
    } else {
      router.push('/payment/qr') // default ke QRIS
    }
    
    setIsProcessing(false)
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      return false
    }
    if (!formData.phone.trim()) {
      return false
    }
    if (!formData.email.trim()) {
      return false
    }
    if (!paymentMethod) {
      return false
    }
    return true
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
    isProcessing,
    product
  }
}