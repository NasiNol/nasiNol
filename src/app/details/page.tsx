// src/app/details/page.tsx
"use client"

import { useSearchParams } from 'next/navigation'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import DetailsOrnaments from '@/components/details/DetailsOrnaments'
import ProductDisplay from '@/components/details/ProductDisplay'
import ProductInfo from '@/components/details/ProductInfo'
import RestaurantInfo from '@/components/details/RestaurantInfo'
import ProductActions from '@/components/details/ProductActions'
import RatingSection from '@/components/details/RatingSection'
import ReviewsCarousel from '@/components/details/ReviewsCarousel'
import { useProductDetails } from '@/hooks/useProductDetails'

export default function DetailsPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id') ? parseInt(searchParams.get('id')!) : undefined

  const {
    quantity,
    setQuantity,
    product,
    restaurant,
    reviews,
    rating
  } = useProductDetails(productId)

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      <DetailsOrnaments />
      <Header locationValue="bandung" />

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* Product Section */}
        <div className="pl-[79px] pr-[39px] pt-[76.69px]">
          <div className="flex items-start">
            {/* Left - Product Image */}
            <ProductDisplay 
              image={product.image} 
              name={product.name} 
            />

            {/* Center - Product Info */}
            <ProductInfo 
              name={product.name}
              price={product.price}
              description={product.description}
            />

            {/* Right - Restaurant Info and Actions */}
            <div className="ml-[100px] mt-[40px]">
              <RestaurantInfo 
                distance={restaurant.distance}
                name={restaurant.name}
              />
              
              <ProductActions 
                quantity={quantity}
                setQuantity={setQuantity}
                productId={product.id}
                productName={product.name}
                productImage={product.image}
                productPrice={product.price}
              />
            </div>
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="pl-[79px] pr-[39px] mt-[62px]">
          <RatingSection rating={rating} />
          <ReviewsCarousel reviews={reviews} />
        </div>
      </div>

      <Footer />
    </div>
  )
}