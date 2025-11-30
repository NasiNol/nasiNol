// src/hooks/useProductDetails.ts
import { useState } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  timeAgo: string
  profileImage: string
}

export function useProductDetails() {
  const [quantity, setQuantity] = useState(1)

  // Mock data - nanti bisa dari API
  const product = {
    name: 'Ayam Goreng',
    price: '20K',
    image: '/ayamgoreng-details.png',
    description: [
      'Kondisi: sisa penjualan hari ini, bukan bekas konsumsi',
      'Dikemas sesuai standar kebersihan',
      'Siap dikonsumsi langsung atau dipanaskan kembali'
    ]
  }

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