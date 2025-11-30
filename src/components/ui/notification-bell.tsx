// src/components/ui/notification-bell.tsx
"use client"

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/contexts/NotificationContext'
import NotificationDropdown from './notification-dropdown'

export default function NotificationBell() {
  const { toggleDropdown, unreadCount } = useNotification()

  return (
    <div className="relative notification-container">
      {/* Bell Button with Badge */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleDropdown}
        className="notification-bell-button bg-[#60A9E4] border-[#60A9E4] hover:bg-[#4A90E2] w-[41px] h-[41px] flex items-center justify-center relative"
        style={{ zIndex: 999999 }}
      >
        <Bell size={20} strokeWidth={3.4} className="text-white" />
        {unreadCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            style={{ zIndex: 1000000 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      <NotificationDropdown />
    </div>
  )
}