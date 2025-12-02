// src/components/details/ProductActions.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Minus, Plus } from 'lucide-react'
import { inter } from '@/lib/fonts'
import { useCart } from '@/contexts/CartContext'

interface ProductActionsProps {
  quantity: number
  setQuantity: (quantity: number) => void
  productId?: number
  productName: string
  productImage: string
  productPrice: string
}

export default function ProductActions({ 
  quantity, 
  setQuantity, 
  productId, 
  productName, 
  productImage, 
  productPrice 
}: ProductActionsProps) {
  const { addToCart } = useCart()

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) return
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    // Convert price string (e.g., "20K") to number
    const priceNumber = parseInt(productPrice.replace(/[^0-9]/g, '')) * 1000
    
    const foodItem = {
      id: productId?.toString() || '1',
      name: productName,
      price: priceNumber,
      image: productImage,
      category: 'main-course' as const,
      rating: 4.5,
      reviewCount: 100,
      restaurant: 'KFC',
      distance: '200m',
      isFeatured: false,
      isAvailable: true
    }
    
    addToCart(foodItem, quantity)
  }

  return (
    <>
      {/* Quantity Controls */}
      <div className="ml-[-10px] flex items-center justify-start mb-[30px]">
        <Button 
          variant="outline"
          onClick={() => updateQuantity(quantity - 1)}
          className="w-[44px] h-[44px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-full flex items-center justify-center p-0"
        >
          <Minus size={16} className="text-white" />
        </Button>
        
        <span className={`text-[28px] font-normal text-[#000000] mx-[30px] ${inter.className}`}>
          {quantity}
        </span>
        
        <Button 
          variant="outline"
          onClick={() => updateQuantity(quantity + 1)}
          className="w-[44px] h-[44px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-full flex items-center justify-center p-0"
        >
          <Plus size={16} className="text-white" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="ml-[-20px] flex items-center space-x-4">
        <Button 
          onClick={handleAddToCart}
          variant="outline"
          className="w-[51px] h-[51px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-[51px] flex items-center justify-center p-0"
        >
          <ShoppingCart size={20} className="text-white" />
        </Button>
        
        <Link href={`/checkout?id=${productId}&quantity=${quantity}`}>
          <Button 
            className={`w-[131px] h-[40px] bg-[#60A9E4] hover:bg-[#4A90E2] text-white text-[25px] font-bold rounded-[15px] ${inter.className}`}
          >
            Pesan
          </Button>
        </Link>
      </div>
    </>
  )
}