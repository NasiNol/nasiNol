// src/types/product.ts
export interface Product {
  name: string
  price: string
  image: string
  description: string[]
}

export interface Restaurant {
  distance: string
  name: string
}

export interface Review {
  id: number
  name: string
  rating: number
  comment: string
  timeAgo: string
  profileImage: string
}