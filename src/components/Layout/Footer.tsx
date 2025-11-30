// src/components/Layout/Footer.tsx
"use client"

import { Instagram, Youtube } from 'lucide-react'

interface FooterProps {
  className?: string
  containerClassName?: string
}

export default function Footer({
  className = "mt-[41px] relative z-10",
  containerClassName = "max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 h-[193px] flex items-center"
}: FooterProps) {
  return (
    <footer className={className}>
      <div className="w-full">
        <div className={containerClassName}>
          <div className="w-full flex items-center">
            
            {/* Left - Contact Us */}
            <div className="flex-shrink-0">
              <h3 className="font-bold text-[#0F0F0F] mb-3 text-[32px]">Contact Us:</h3>
              <div className="space-y-1 text-[20px] font-normal text-[#0F0F0F]">
                <p>Support: Admin</p>
                <p>Email Address: nasinol@gmail.com</p>
              </div>
            </div>

            {/* Spacing between Contact Us and Center */}
            <div className="w-[228px]"></div>

            {/* Center - Social Media & Copyright */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <div className="flex space-x-4 mb-3">
                <Instagram size={32} className="text-[#0F0F0F]" />
                <svg className="w-[30px] h-[30px] text-[#0F0F0F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04.01z"/>
                </svg>
                <Youtube size={36} className="text-[#0F0F0F]" />
              </div>
              <p className="text-[20px] font-normal text-[#0F0F0F]">Copyright © NasiNol</p>
            </div>

            {/* Spacing between Center and Right */}
            <div className="w-[349px]"></div>

            {/* Right - Policies */}
            <div className="flex-shrink-0 flex flex-col items-end justify-center">
              <div className="text-right space-y-1 text-[20px] font-normal text-[#0F0F0F]">
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
                <p>Terms & Conditions</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}