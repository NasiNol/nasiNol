// src/components/details/ProductInfo.tsx
import { Button } from '@/components/ui/button'
import { inter } from '@/lib/fonts'

interface ProductInfoProps {
  name: string
  price: string
  description: string[]
}

export default function ProductInfo({ name, price, description }: ProductInfoProps) {
  return (
    <div className="ml-[39px] flex-1 mt-[40px]">
      <div className="space-y-[20px]">
        <h1 className={`text-[45px] font-normal text-[#000000] ${inter.className}`}>
          {name}
        </h1>
        
        <div className="space-y-[18px]">
          <p className={`text-[60px] font-normal text-[#000000] ${inter.className}`}>
            {price}
          </p>
          
          <Button className={`bg-[#60A9E4] hover:bg-[#4A90E2] text-white text-[20px] font-bold px-6 py-3 rounded-[20px] ${inter.className}`}>
            Keterangan
          </Button>
          
          <div className={`w-[464px] h-[120px] text-[20px] font-normal text-[#000000] ${inter.className}`}>
            <ul className="list-disc pl-5 leading-tight">
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}