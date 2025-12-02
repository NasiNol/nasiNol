"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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
  isInCart: (id: string) => boolean
  getItemQuantity: (id: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'nasiNol_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart dari localStorage saat mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save cart ke localStorage setiap kali berubah
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart:', error)
      }
    }
  }, [items, isLoaded])

  const addToCart = (food: Food, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === food.id)
      
      if (existingItem) {
        // Update quantity jika item sudah ada
        return prevItems.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Tambah item baru
        return [...prevItems, { ...food, quantity }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const isInCart = (id: string): boolean => {
    return items.some(item => item.id === id)
  }

  const getItemQuantity = (id: string): number => {
    const item = items.find(item => item.id === id)
    return item ? item.quantity : 0
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
      totalPrice,
      isInCart,
      getItemQuantity
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
