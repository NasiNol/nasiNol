// src/components/ui/profile-dropdown.tsx
"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from './button'
import { User, LogOut } from 'lucide-react'
import { poppins } from '@/lib/fonts'

interface ProfileDropdownProps {
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
  onLogout: () => void
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button - ukuran sama dengan cart button (41x41px) */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-[41px] h-[41px] bg-[#60A9E4] border-[#60A9E4] hover:bg-[#4A90E2] rounded-full flex items-center justify-center"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <User size={20} className="text-white" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[240px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-[#60A9E4] rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-gray-900 truncate ${poppins.className}`}>
                  {user.name}
                </p>
                <p className={`text-sm text-gray-500 truncate ${poppins.className}`}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${poppins.className}`}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}