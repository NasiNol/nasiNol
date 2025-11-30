"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Food } from '@/types/food'

interface FavoriteContextType {
  favorites: Food[]
  addToFavorites: (food: Food) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Food[]>([])

  const addToFavorites = (food: Food) => {
    // TODO: Implement add to favorites logic
    console.log('Add to favorites:', food.name)
  }

  const removeFromFavorites = (id: string) => {
    // TODO: Implement remove from favorites logic
    console.log('Remove from favorites:', id)
  }

  const isFavorite = (id: string) => {
    return favorites.some(food => food.id === id)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoriteContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider')
  }
  return context
}