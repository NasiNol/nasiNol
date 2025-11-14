"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (newPassword !== confirmPassword) {
      alert("Password tidak cocok!")
      setLoading(false)
      return
    }

    console.log("Reset password for:", email)
    
    setLoading(false)
    alert("Password berhasil direset!")
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-start pt-16 px-8 lg:px-16 max-w-md lg:max-w-lg mx-auto lg:mx-0 relative z-20">
        {/* Logo */}
        <div className="mb-8 relative z-30">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={120} 
            height={40} 
            className="h-8 w-auto"
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm ml-25 relative z-30">
          <h1 className="text-[36px] font-bold text-black mb-2">
            Ganti Sandi
          </h1>
          <p className="text-gray-600 text-[18px] font-medium mb-8">
            Masukan username dan password akun
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Nama"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
            </div>

            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Sandi Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#60A9E4] hover:bg-[#4A90D9] text-white rounded-lg font-medium text-base"
            >
              {loading ? "Loading..." : "Simpan"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Sudah ingat password? </span>
            <Link href="/signin" className="text-sm text-black font-medium hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block flex-1 relative">
        {/* Ornament */}
        <Image
          src="/ornament-login.png"
          alt="Ornament"
          width={499}
          height={700}
          className="absolute z-0 opacity0"
          style={{
            left: '-126px',
            top: '-50px',
            transform: 'rotate(10deg)'
          }}
        />
        
        {/* Main Illustration */}
        <Image
          src="/login-illustration.png"
          alt="Login Illustration"
          width={500}
          height={978}
          className="absolute z-10"
          style={{
            left: '294px',
            top: '12px',
            borderRadius: '30px'
          }}
        />
      </div>
    </div>
  )
}