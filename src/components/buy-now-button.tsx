// components/BuyNowButton.tsx
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { type ProductWithRelations } from '~/types/globals'
import { useRouter } from 'next/navigation'

interface BuyNowButtonProps {
  product: ProductWithRelations;
  quantity: number;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ product, quantity }) => {
  const { clearCart, addItem } = useCart()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleBuyNow = () => {
    setIsLoading(true)
    clearCart()
    addItem(product, quantity)
    router.push('/marketplace/cart')
  }

  return (
    <Button
      onClick={handleBuyNow}
      size='lg'
      className='w-full'
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Buy Now'}
    </Button>
  )
}

export default BuyNowButton