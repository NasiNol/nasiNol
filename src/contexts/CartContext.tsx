"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Food } from '@/types/food'

interface CartItem extends Food {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (food: Food, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (food: Food, quantity = 1) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', food.name, quantity)
  }

  const removeFromCart = (id: string) => {
    // TODO: Implement remove from cart logic
    console.log('Remove from cart:', id)
  }

  const updateQuantity = (id: string, quantity: number) => {
    // TODO: Implement update quantity logic
    console.log('Update quantity:', id, quantity)
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}