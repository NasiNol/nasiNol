// src/components/Layout/PageLayout.tsx
"use client"

import Header from './Header'
import Footer from './Footer'
import Ornaments from './Ornaments'

interface PageLayoutProps {
  children: React.ReactNode
  showOrnaments?: boolean
  showLeftOrnament?: boolean
  showRightOrnament?: boolean
  ornamentLeftStyle?: React.CSSProperties
  ornamentRightStyle?: React.CSSProperties
  locationValue?: string
  showPesanan?: boolean
  showCart?: boolean
  showNotification?: boolean
  showLocation?: boolean
  showLogin?: boolean
  headerClassName?: string
  headerContainerClassName?: string
  footerClassName?: string
  footerContainerClassName?: string
  containerClassName?: string
}

export default function PageLayout({
  children,
  showOrnaments = true,
  showLeftOrnament = true,
  showRightOrnament = true,
  ornamentLeftStyle,
  ornamentRightStyle,
  locationValue = "semarang",
  showPesanan = true,
  showCart = true,
  showNotification = true,
  showLocation = true,
  showLogin = true,
  headerClassName,
  headerContainerClassName,
  footerClassName,
  footerContainerClassName,
  containerClassName = "min-h-screen bg-gray-50 relative overflow-x-hidden"
}: PageLayoutProps) {
  return (
    <div className={containerClassName}>
      
      {/* Header - z-50 paling depan */}
      <Header 
        showPesanan={showPesanan}
        showCart={showCart}
        showNotification={showNotification}
        showLocation={showLocation}
        showLogin={showLogin}
        locationValue={locationValue}
        className={headerClassName}
        containerClassName={headerContainerClassName}
      />

      {/* Content area */}
      <main className="relative">
        {children}
      </main>
      
      {/* PINDAH: Ornaments di render SETELAH children (HeroSection) */}
      {/* Ornaments - z-10 background layer, render terakhir untuk DOM order */}
      {showOrnaments && (
        <Ornaments 
          showLeft={showLeftOrnament}
          showRight={showRightOrnament}
          leftStyle={ornamentLeftStyle}
          rightStyle={ornamentRightStyle}
        />
      )}

      {/* Footer */}
      <Footer 
        className={footerClassName}
        containerClassName={footerContainerClassName}
      />
    </div>
  )
}