// src/hooks/useProductDetails.ts
import { useState, useMemo } from 'react'
import { getFoodById, FoodItem } from '@/data/mockFood'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  timeAgo: string
  profileImage: string
}

export function useProductDetails(productId?: number) {
  const [quantity, setQuantity] = useState(1)

  // Get product data based on ID, fallback ke default jika tidak ada
  const product = useMemo(() => {
    if (productId) {
      const foundProduct = getFoodById(productId)
      if (foundProduct) {
        return {
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          image: foundProduct.image,
          description: [
            'Kondisi: sisa penjualan hari ini, bukan bekas konsumsi',
            'Dikemas sesuai standar kebersihan',
            'Siap dikonsumsi langsung atau dipanaskan kembali'
          ]
        }
      }
    }
    
    // Default product jika tidak ada ID atau product tidak ditemukan
    return {
      id: 1,
      name: 'Ayam Goreng',
      price: '20K',
      image: '/ayamgoreng-details.png',
      description: [
        'Kondisi: sisa penjualan hari ini, bukan bekas konsumsi',
        'Dikemas sesuai standar kebersihan',
        'Siap dikonsumsi langsung atau dipanaskan kembali'
      ]
    }
  }, [productId])

  const restaurant = {
    distance: '200m',
    name: 'KFC'
  }

  const reviews: Review[] = [
    {
      id: 1,
      name: "Vannesha",
      rating: 4.8,
      comment: "Ayam goreng nya masih fresh",
      timeAgo: "2 Hari",
      profileImage: "/vannesha-profile.png"
    },
    {
      id: 2,
      name: "Nami",
      rating: 4.9,
      comment: "Gaa nyesel malem malem buka cobain makanari disini",
      timeAgo: "1 Hari",
      profileImage: "/nami-profile.png"
    },
    {
      id: 3,
      name: "Naruto",
      rating: 4.3,
      comment: "Sedapnyooo",
      timeAgo: "4 Hari",
      profileImage: "/naruto-profile.png"
    },
    {
      id: 4,
      name: "Robin",
      rating: 4.2,
      comment: "Sering sering dong diskon nyaa",
      timeAgo: "3 Hari",
      profileImage: "/robin-profile.png"
    }
  ]

  return {
    quantity,
    setQuantity,
    product,
    restaurant,
    reviews,
    rating: 4.5
  }
}