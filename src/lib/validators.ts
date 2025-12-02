interface OrderItem {
  produkId: string
  jumlah: number
  hargaSatuan: number
}

export function validateOrderItems(items: unknown): items is OrderItem[] {
  if (!Array.isArray(items) || items.length === 0) {
    return false
  }

  return items.every((item): item is OrderItem => 
    typeof item === 'object' &&
    item !== null &&
    typeof (item as OrderItem).produkId === 'string' &&
    typeof (item as OrderItem).jumlah === 'number' &&
    (item as OrderItem).jumlah > 0 &&
    typeof (item as OrderItem).hargaSatuan === 'number' &&
    (item as OrderItem).hargaSatuan > 0
  )
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number format
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}
