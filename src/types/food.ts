// src/types/food.ts
export interface Food {
  id: string
  name: string
  price: number
  image: string
  category: 'recommended' | 'dessert' | 'drink' | 'main-course' | 'snack'
  rating: number
  reviewCount: number
  restaurant: string
  distance: string
  isFeatured: boolean
  isAvailable: boolean
  discount?: {
    percentage: number
    originalPrice: number
  }
}

export interface FoodCategory {
  id: string
  name: string
  slug: string
  description?: string
}