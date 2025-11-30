// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { CartProvider } from '@/contexts/CartContext'
import { FavoriteProvider } from '@/contexts/FavoriteContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nasi Nol - Food Delivery',
  description: 'Pengalaman baru belanja kuliner online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <CartProvider>
            <FavoriteProvider>
              {children}
            </FavoriteProvider>
          </CartProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}