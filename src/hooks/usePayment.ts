// src/hooks/usePayment.ts
import { useState } from 'react'
import { useNotification } from '@/contexts/NotificationContext'
import { PaymentMethod } from '@/types/payment'

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const { addNotification } = useNotification()

  // Payment method configuration (easy to switch)
  const paymentMethod: PaymentMethod = {
    type: 'bank_transfer',
    accountNumber: '1234567891011',
    bankName: 'Bank BNI',
    instructions: [
      'Transfer pembayaran ke nomor rekening yang tertera di atas sesuai dengan nominal yang harus dibayarkan.',
      'Pastikan nama penerima transfer sesuai dengan informasi bank yang ditampilkan.',
      'Jangan lupa untuk menyertakan kode unik jika diperlukan.',
      'Setelah melakukan transfer, simpan bukti pembayaran (screenshot atau foto struk).',
      'Klik tombol "Pembayaran Selesai" untuk mengkonfirmasi bahwa Anda telah melakukan transfer. Setelah itu, sistem kami akan mulai memproses verifikasi pembayaran.',
      'Proses verifikasi biasanya memakan waktu 5-10 menit, namun pada kondisi tertentu dapat memakan waktu hingga 1×24 jam. Mohon menunggu hingga status pesanan Anda berubah.',
      'Jika ada kendala atau pembayaran tidak terverifikasi, silakan hubungi tim support melalui kontak yang tersedia.'
    ]
  }

  const handlePaymentComplete = () => {
    setIsProcessing(true)
    
    setTimeout(() => {
      setIsProcessing(false)
      setIsOrderModalOpen(true)
      
      addNotification({
        title: 'Pesanan Siap Diambil',
        message: 'Pesanan #NL001 sudah siap untuk diambil di counter utama',
        time: 'Baru saja',
        isRead: false,
        type: 'order'
      })
    }, 2000)
  }

  // Future: Easy switch to Midtrans
  const switchToMidtrans = () => {
    return {
      ...paymentMethod,
      type: 'midtrans' as const,
      instructions: [] // Midtrans gak perlu manual instructions
    }
  }

  return {
    paymentMethod,
    isProcessing,
    isOrderModalOpen,
    setIsOrderModalOpen,
    handlePaymentComplete,
    switchToMidtrans
  }
}