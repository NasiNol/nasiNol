import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useNotification } from '@/contexts/NotificationContext'

interface OrderData {
  id: string
  totalHarga: number
  statusTransaksi: string
  waktuTransaksi: Date
  pembayaran?: {
    statusPembayaran: string
    metodePembayaran: string
  } | null
  detailTransaksi: Array<{
    id: string
    jumlah: number
    hargaSatuan: number
    subtotal: number
    produk: {
      id: string
      namaProduk: string
      fotoProduk: string | null
    }
  }>
}

interface OrderResponse {
  success: boolean
  data: OrderData
}

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const { addNotification } = useNotification()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  // Fetch order data
  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId)
    }
  }, [orderId])

  const fetchOrderData = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/orders/${id}`)
      const data: OrderResponse = await response.json()
      
      if (data.success) {
        setOrderData(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    }
  }

  const handlePaymentComplete = async (): Promise<void> => {
    if (!orderId) return

    setIsProcessing(true)
    
    try {
      // Optional: Bisa tambahkan API call untuk confirm manual payment
      // const response = await fetch(`/api/payments/confirm`, {
      //   method: 'POST',
      //   body: JSON.stringify({ transaksiId: orderId })
      // })

      setTimeout(() => {
        setIsProcessing(false)
        setIsOrderModalOpen(true)
        
        addNotification({
          title: 'Pesanan Dikonfirmasi',
          message: `Pesanan #${orderId.slice(0, 8)} sedang diproses`,
          time: 'Baru saja',
          isRead: false,
          type: 'order'
        })
      }, 2000)
    } catch (error) {
      console.error('Payment confirmation error:', error)
      setIsProcessing(false)
    }
  }

  // Poll untuk cek status pembayaran (optional)
  useEffect(() => {
    if (!orderId || !orderData) return

    const interval = setInterval(async () => {
      const response = await fetch(`/api/orders/${orderId}`)
      const data: OrderResponse = await response.json()
      
      if (data.success && data.data.pembayaran?.statusPembayaran === 'success') {
        setIsOrderModalOpen(true)
        clearInterval(interval)
        
        addNotification({
          title: 'Pembayaran Berhasil',
          message: 'Pesanan Anda sedang diproses',
          time: 'Baru saja',
          isRead: false,
          type: 'order'
        })
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [orderId, orderData, addNotification])

  return {
    orderData,
    isProcessing,
    isOrderModalOpen,
    setIsOrderModalOpen,
    handlePaymentComplete
  }
}