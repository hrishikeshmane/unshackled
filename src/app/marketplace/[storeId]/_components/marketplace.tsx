import React from 'react'
import{ type ProductWithRelations } from '~/types/globals'
import MarketplaceTable from './marketplace-table'
import { columns } from './columns'

interface MarketplaceProps {
  products: ProductWithRelations[]
}

const Marketplace = ({products}: MarketplaceProps) => {
  
const modifiedProducts = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      store: product.store?.name ?? '',
      type: product.type?.name ?? '',
      tag: product.tag?.name ?? '',
      tagline: product.tagline,
      logo: product.imageUrl,
      price: parseFloat(product.price),
      domainRank: parseFloat(product.domainRank),
      isFeatured: product.isFeatured,
      createdAt: product.createdAt,
      estTurnAroundTime: parseFloat(product.estTurnAroundTime),
      hasPricingPlans: product.hasPricingPlans,
      showPricing: product.showPricing,
      hasAdditionalLink: product.hasAdditionalLink,
      additionalLinkLabel: product.additionalLinkLabel,
      additionalLinkUrl: product.additionalLinkUrl,
      hasDownPayment:product.hasDownPayment,
      downPayment: parseFloat(product.downPayment),
    };
  });

  return (
    <div>
      <MarketplaceTable columns={columns} data={modifiedProducts} />
    </div>
  )
}

export default Marketplace