// src/components/checkout/ProductSummary.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface ProductSummaryProps {
  product: {
    name: string
    image: string
    quantity: number
  }
}

export default function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <div className="max-w-[1500px] mx-auto pl-[79px] pr-[78px] pt-[80px] relative z-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-[111px] h-[106px] rounded-lg flex-shrink-0 overflow-hidden">
            <Image 
              src={product.image}
              alt={product.name}
              width={111} 
              height={106}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-normal text-[#000000] text-[30px] mb-3">{product.name}</h3>
            <Link href="/orders">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-[79px] h-[27px] text-[18px] font-normal border-[#60A9E4] text-[#000000] hover:bg-blue-50 rounded-[19px] p-0 flex items-center justify-center"
              >
                <Edit size={21} className="mr-1 text-[#000000]" />
                Edit
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-[30px] font-medium text-[#000000] flex items-center">
          x{product.quantity}
        </div>
      </div>
    </div>
  )
}