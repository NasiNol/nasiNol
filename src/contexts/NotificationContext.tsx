// src/contexts/NotificationContext.tsx - UPDATE
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  isRead: boolean
  type?: 'promo' | 'order' | 'reminder'
}

interface NotificationContextType {
  notifications: Notification[]
  isDropdownOpen: boolean
  toggleDropdown: () => void
  markAsRead: (id: string) => void
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id'>) => void // TAMBAH
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Promo Hemat Hari Ini',
      message: 'Diskon 20% untuk semua menu, jangan lewatkan!',
      time: '2 Menit Lalu',
      isRead: false,
      type: 'promo'
    },
    {
      id: '2', 
      title: 'Restoran Menambahkan Menu Baru',
      message: 'Cek makanan terbaru dan dapatkan promo!',
      time: '5 Menit Lalu',
      isRead: false,
      type: 'order'
    },
    {
      id: '3',
      title: 'Pengingat Checkout',
      message: 'Masih ada menu di keranjang, lanjutkan pesanan?',
      time: '8 Menit Lalu',
      isRead: false,
      type: 'reminder'
    }
  ])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  // TAMBAH FUNCTION INI
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const unreadCount = notifications.filter(notif => !notif.isRead).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      isDropdownOpen,
      toggleDropdown,
      markAsRead,
      unreadCount,
      addNotification // TAMBAH KE PROVIDER
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}