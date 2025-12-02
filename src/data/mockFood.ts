// src/data/mockFoods.ts

export interface FoodItem {
  id: number
  name: string
  price: string
  image: string
  restaurant: string
  distance: string
  rating: string
}

export const recommendedFoods: FoodItem[] = [
  // Baris Pertama
  {
    id: 1,
    name: 'Ayam Goreng',
    price: '20K',
    image: '/ayamgoreng-checkout.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 2,
    name: 'Roti Bakar',
    price: '20K',
    image: '/roti-bakar.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 3,
    name: 'Donut',
    price: '30K',
    image: '/donut.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 4,
    name: 'Onigiri',
    price: '25K',
    image: '/onigiri.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 5,
    name: 'Ricebowl',
    price: '35K',
    image: '/rice-bowl.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  // Baris Kedua
  {
    id: 6,
    name: 'Katsu',
    price: '20K',
    image: '/katsu.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 7,
    name: 'Yoghurt',
    price: '20K',
    image: '/yoghurt.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 8,
    name: 'Es Buah',
    price: '20K',
    image: '/es-buah.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 9,
    name: 'Ayam Bakar',
    price: '20K',
    image: '/ayam-bakar.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 10,
    name: 'Cookies',
    price: '20K',
    image: '/cookies.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  }
]

export const dessertFoods: FoodItem[] = [
  {
    id: 11,
    name: 'Pisang Goreng',
    price: '15K',
    image: '/pisang-goreng.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 12,
    name: 'Es Krim',
    price: '25K',
    image: '/es-krim.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 13,
    name: 'Martabak',
    price: '30K',
    image: '/martabak.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 14,
    name: 'Klepon',
    price: '20K',
    image: '/klepon.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 15,
    name: 'Kue Lapis',
    price: '25K',
    image: '/kue-lapis.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  }
]

export const drinkFoods: FoodItem[] = [
  {
    id: 16,
    name: 'Es Pisang Ijo',
    price: '20K',
    image: '/es-pisang-ijo.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 17,
    name: 'Matcha Latte',
    price: '35K',
    image: '/matcha-latte.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 18,
    name: 'Cheesepresso',
    price: '40K',
    image: '/cheesepresso.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 19,
    name: 'Kopi Jadoel',
    price: '25K',
    image: '/kopi-jadoel.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  },
  {
    id: 20,
    name: 'Thai Tea',
    price: '30K',
    image: '/thai-tea.png',
    restaurant: 'KFC',
    distance: '200m',
    rating: '4.5'
  }
]

// Gabungan semua produk untuk pencarian berdasarkan ID
export const allFoods = [...recommendedFoods, ...dessertFoods, ...drinkFoods]

// Fungsi helper untuk mencari produk berdasarkan ID
export const getFoodById = (id: number): FoodItem | undefined => {
  return allFoods.find(food => food.id === id)
}