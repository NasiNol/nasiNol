// src/components/checkout/OrderInformationForm.tsx
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormData {
  name: string
  phone: string
  email: string
}

interface OrderInformationFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export default function OrderInformationForm({ 
  formData, 
  setFormData, 
  paymentMethod, 
  setPaymentMethod 
}: OrderInformationFormProps) {
  
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  return (
    <div className="flex-[2]">
      <h2 className="text-[25px] font-semibold text-[#000000] mb-6">Informasi Pesanan</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[25px] font-medium text-[#484848] mb-2">
            Nama <span className="text-red-500">*</span>
          </label>
          <Input 
            placeholder="Nama Pemesan" 
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full max-w-[716px] h-[46px] placeholder:text-[20px] placeholder:font-normal placeholder:text-[#939393]" 
          />
        </div>

        <div>
          <label className="block text-[25px] font-medium text-[#484848] mb-2">
            Nomor Telefon <span className="text-red-500">*</span>
          </label>
          <div className="flex max-w-[716px]">
            <div className="flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md h-[46px]">
              <Image 
                src="/flag-checkout.png" 
                alt="ID" 
                width={24} 
                height={16} 
                className="mr-2" 
              />
              <span className="text-sm text-gray-600">+62</span>
            </div>
            <Input 
              placeholder="82309871432" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="flex-1 h-[46px] rounded-l-none placeholder:text-[20px] placeholder:font-normal placeholder:text-[#939393]" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[25px] font-medium text-[#484848] mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input 
            placeholder="abc@gmail.com" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full max-w-[473px] h-[46px] placeholder:text-[20px] placeholder:font-normal placeholder:text-[#939393]" 
          />
        </div>

        <div>
          <label className="block text-[25px] font-medium text-[#484848] mb-2">
            Metode Pembayaran
          </label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full max-w-[245px] h-[46px] text-[25px] font-normal text-[#939393]">
              <SelectValue placeholder="Pilih Metode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank-debit">Bank Debit</SelectItem>
              <SelectItem value="qris">QRIS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}