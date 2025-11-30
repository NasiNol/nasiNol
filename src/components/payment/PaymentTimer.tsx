// src/components/payment/PaymentTimer.tsx
import { useState, useEffect } from 'react'
import { inter } from '@/lib/fonts'

interface PaymentTimerProps {
  initialTime: number
  onTimeUp?: () => void
}

export default function PaymentTimer({ initialTime, onTimeUp }: PaymentTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      onTimeUp?.()
    }
  }, [timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Timer */}
      <div className="text-center mb-[7px]">
        <h1 className={`text-[40px] font-extrabold text-[#000000] ${inter.className}`}>
          {formatTime(timeLeft)}
        </h1>
      </div>

      {/* Timer Description */}
      <div className="text-center mb-[20px]">
        <p className={`text-[15px] font-normal text-[#000000] ${inter.className}`}>
          Selesaikan pembayaran sebelum waktu habis
        </p>
      </div>
    </>
  )
}