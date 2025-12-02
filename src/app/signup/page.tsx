"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      alert("Password tidak cocok!")
      setLoading(false)
      return
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "http://localhost:3000/homepage",
    })

    setLoading(false)
    if (error) {
      alert(error.message || "Signup failed")
    } else {
      router.push("/homepage")
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/homepage",
      })
    } catch (err) {
      console.error("Google signup failed:", err)
      alert("Google signup gagal!")
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-md lg:max-w-lg mx-auto lg:mx-0 relative z-20">
        {/* Logo */}
        <div className="mb-2 relative z-30" style={{ transform: 'translateY(34px)' }}>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={42} 
            height={47}
            className="w-[51.18px] h-[55.79px]"
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm ml-25 relative z-30">
          <h1 className="text-[36px] font-bold text-black mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-gray-600 text-[18px] font-medium mb-8">
            Masukan email dan sandi yang valid
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Input */}
            <div>
              <Input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
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

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#60A9E4] hover:bg-[#4A90D9] text-white rounded-lg font-medium text-base"
            >
              {loading ? "Loading..." : "Masuk"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="px-4 text-sm text-gray-500">atau masuk dengan</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="w-full h-12 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700">Masuk dengan Google</span>
          </Button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Sudah punya akun? </span>
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