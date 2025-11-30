// src/components/ui/notification-dropdown.tsx
"use client"

import { useNotification } from '@/contexts/NotificationContext'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { inter } from '@/lib/fonts'
import { createPortal } from 'react-dom'

export default function NotificationDropdown() {
  const { notifications, isDropdownOpen, toggleDropdown, markAsRead } = useNotification()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const bellButtonRef = useRef<HTMLDivElement>(null)

  // Get bell button position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bellButton = document.querySelector('.notification-bell-button')
      if (bellButton && dropdownRef.current) {
        const rect = bellButton.getBoundingClientRect()
        const dropdown = dropdownRef.current
        dropdown.style.position = 'fixed'
        dropdown.style.top = `${rect.bottom + 10}px`
        dropdown.style.right = `${window.innerWidth - rect.right}px`
      }
    }
  }, [isDropdownOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        const bellButton = document.querySelector('.notification-bell-button')
        if (bellButton && !bellButton.contains(event.target as Node)) {
          if (isDropdownOpen) {
            toggleDropdown()
          }
        }
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen, toggleDropdown])

  if (!isDropdownOpen) return null

  const dropdownContent = (
    <>
      {/* Background Overlay */}
      <div 
        className="notification-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999997,
          pointerEvents: 'none'
        }}
      />

      {/* Dropdown Content */}
      <div 
        ref={dropdownRef}
        className={`notification-dropdown-content w-[355px] h-[250px] bg-white rounded-[10px] shadow-lg border border-gray-200 transition-opacity duration-200 ${
          isDropdownOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 999999,
          position: 'fixed',
          pointerEvents: 'auto'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 relative">
          <h3 className={`text-[18px] font-medium text-[#60A9E4] ${inter.className}`}>
            Notifikasi
          </h3>
          <button 
            onClick={toggleDropdown}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notifications List - SCROLL AREA */}
        <div className="h-[190px] relative">
          <div 
            className="overflow-y-scroll h-full pr-2 notification-scroll"
            onScroll={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {notifications.map((notification, index) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index !== notifications.length - 1 ? 'border-b border-gray-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-3">
                  {/* Blue dot indicator */}
                  <div className={`w-[12px] h-[12px] rounded-full bg-[#60A9E4] flex-shrink-0 mt-1 ${
                    notification.isRead ? 'opacity-30' : ''
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-[14px] font-medium text-black mb-1 leading-tight ${inter.className}`}>
                      {notification.title}
                    </h4>
                    <p className={`text-[12px] text-gray-600 mb-2 leading-tight ${inter.className}`}>
                      {notification.message}
                    </p>
                    <p className={`text-[11px] text-gray-400 ${inter.className}`}>
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  // Use portal to render at body level
  if (typeof window !== 'undefined') {
    return createPortal(dropdownContent, document.body)
  }

  return null
}