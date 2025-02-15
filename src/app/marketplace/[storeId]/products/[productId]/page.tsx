'use client'

import Image from "next/image"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Shield } from 'lucide-react'
import MaxWidthWrapper from "~/components/MaxWidthWrapper"
import { Badge } from "~/components/ui/badge"
import BuyNowButton from "~/components/buy-now-button"
import ProductsReel from "~/app/marketplace/_components/products-reel"
import QuantitySelector from "~/components/quantity-selector"
import { Button } from "~/components/ui/button"
import { formatPrice } from "~/lib/utils"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import DOMPurify from 'dompurify'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react";
import { Group, Button as AriaButton, Input,  NumberField } from "react-aria-components";

export default function Component() {
  const params = useParams()
  const searchParams = useSearchParams()
  const productId = params.productId
  const storeId = params.storeId
  const vendorShare = searchParams.get('vendorShare')

  const product = api.product.getProductById.useQuery({
    id: String(productId),
  })
  const existingRequest = api.approvalForms.checkExistingRequest.useQuery({
    productId: String(productId),
  })  
  const similarProducts = api.product.getApprovedProductsByStoreId.useQuery({
    storeId: String(storeId),
  })
  const similarProductsFiltered = similarProducts.data?.filter(
    (p) => p.id !== productId
  )

  const [quantity, setQuantity] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [customPrice, setCustomPrice] = useState(100)
  const [refNumber, setRefNumber] = useState("")

  useEffect(() => {
    if (product.data?.price) {
      setCustomPrice(Number(product.data.price));
    }
  }, [product.data?.price]); 

  if (product.isPending || similarProducts.isPending || existingRequest.isLoading) {
    return <div>Loading...</div>
  }

  if (!product.data) {
    redirect(`/marketplace/${String(storeId)}`)
  }

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Services", href: `/marketplace/${String(storeId)}` },
  ]

  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1))
  const handleManualChange = (value: number) => setQuantity(Math.max(1, value))

  const showButtons = !product.data.requiresVendorApproval
    || (existingRequest.data?.exists && existingRequest.data.status === "approved")
    || vendorShare === 'true'

  const sanitizedDescription = DOMPurify.sanitize(product.data.description)

  const hasPricingPlans = product.data.hasPricingPlans && product.data.pricingPlans && product.data.pricingPlans.length > 0
  const currentPrice = hasPricingPlans
    ? product.data.pricingPlans[selectedPlan]?.price
    : product.data.price

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:col-span-2 lg:pr-8">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="text-sm font-medium text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="text-primary">{product.data.name}</span>{" "}
                {!!product.data.isFeatured && (
                  <Badge
                    variant="outline"
                    className="ml-1 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-2 text-xs text-blue-600"
                  >
                    ⭐ Featured{" "}
                  </Badge>
                )}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.data.tagline}
              </p>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-bold tracking-tight text-gray-900">
                  {!product.data.showPricing ? product.data.hasDownPayment ? `Starting at ${formatPrice(product.data.downPayment)}` : product.data.hasPricingPlans ? `Starting at ${formatPrice(product.data.price)}` : formatPrice(product.data.price) : `Contact for Pricing`}
                </p>
                <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
                  {product.data.store.name}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant access
                </p>
                <div className="ml-4 border-l border-gray-300 pl-4 text-sm text-muted-foreground">
                  {product.data.type.name}
                </div>
                <div className="ml-4 border-l border-gray-300 pl-4 text-sm text-muted-foreground">
                  {product.data.tag.name}
                </div>
              </div>
            </section>

            {/* Add to cart part */}
            <div className="mt-10">
              <div>
                <>
                {
                  showButtons && product.data.requiresRefNumber && (
                    <>
                    {/* gap-4 */}
                      <div className="mt-2 flex flex-col">
                        {/* mb-4 */}
                        <h3 className="text-xl text-primary font-semibold">Reference Number</h3>
                        <Input
                          id="refNumber"
                          value={refNumber}
                          onChange={(e) => setRefNumber(e.target.value)}
                          placeholder="Enter reference number"
                          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground mb-2" role="region" aria-live="polite">
                        Please enter reference number provided by {product.data.name} prior to payment.
                      </p>
                    </>
                  )
                }
                {
                  product.data.hasVariablePrice && showButtons && 
                  <>
                  <NumberField
                    defaultValue={Number(product.data.price)}
                    minValue={Number(product.data.price)}
                    onChange={(value) => setCustomPrice(value)}
                    formatOptions={{
                      style: "currency",
                      currency: "USD",
                      currencySign: "accounting",
                    }}
                  >
                    <div className="space-y-2">
                      {/* mb-4 */}
                      <h3 className="text-xl text-primary font-semibold mb-2">Enter Price</h3>
                      <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                        <Input className="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none" />
                        <div className="flex h-[calc(100%+2px)] flex-col">
                          <AriaButton
                            slot="increment"
                            className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
                          </AriaButton>
                          <AriaButton
                            slot="decrement"
                            className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
                          </AriaButton>
                        </div>
                      </Group>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
                      Please enter price agreed upon with {product.data.name}
                    </p>
                  </NumberField>
                    <div className="my-4 flex max-w-9/12 items-center space-x-4">
                        <QuantitySelector
                          quantity={quantity}
                          onIncrease={handleIncrease}
                          onDecrease={handleDecrease}
                          onManualChange={handleManualChange}
                        />
                        <BuyNowButton
                          refNumber={refNumber}
                          product={product.data}
                          quantity={quantity}
                          disabled={customPrice<100}
                          price={String(customPrice)}
                          isDownPayment={false}
                        />
                      </div>
                  </>
                }
              {hasPricingPlans && !product.data.showPricing && (
                      <div className="w-full space-y-4 mb-6">
                        <h3 className="text-xl text-primary font-semibold mb-4">Choose Your Plan</h3>
                        <RadioGroup
                          defaultValue={product.data.pricingPlans[0]?.label}
                          onValueChange={(value) => product.data && setSelectedPlan(product.data.pricingPlans.findIndex(plan => plan.label === value))}
                          className="space-y-2"
                        >
                          {product.data.pricingPlans.map((plan, index) => (
                            <Card key={plan.label} className={`${selectedPlan === index ? 'ring-2 ring-primary' : ''}`}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <RadioGroupItem value={plan.label} id={`plan-${index}`} />
                                    <div>
                                      <Label htmlFor={`plan-${index}`} className="text-base font-medium">
                                        {plan.label}
                                      </Label>
                                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                                    </div>
                                  </div>
                                  <div className="font-semibold">{formatPrice(plan.price)}</div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    </>
                {showButtons && !product.data.showPricing ? (
                  <>                                        
                    <div className="flex max-w-9/12 items-center space-x-4">
                      <QuantitySelector
                        quantity={quantity}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onManualChange={handleManualChange}
                      />
                      <BuyNowButton
                        refNumber={refNumber}
                        product={product.data}
                        quantity={quantity}
                        price={String(currentPrice)}
                        isDownPayment={false}
                      />
                    </div>
                    {product.data.hasDownPayment && (
                      <div className="mt-4 max-w-9/12 flex flex-col items-center text-center">
                        <p className="text-muted-foreground">
                          OR get started with initial down payment of{" "}
                          {formatPrice(product.data.downPayment)} and pay the rest
                          to vendor later.
                        </p>
                        <BuyNowButton
                          className="b-2 mx-0 border-primary mt-2"
                          variant="outline"
                          refNumber={refNumber}
                          product={product.data}
                          quantity={quantity}
                          isDownPayment={true}
                          price={product.data.downPayment}
                          buttonText="Start with Down Payment"
                        />
                      </div>
                    )}
                    {product.data.hasAdditionalLink && (
                      <div className="mt-4 max-w-9/12 flex flex-col items-center space-x-4 text-center">
                        <Link
                          className="w-full"
                          href={product.data.additionalLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="lg"
                            className="flex w-full items-center gap-1"
                            variant="secondary"
                          >
                            {product.data.additionalLinkLabel}
                            <ArrowTopRightIcon />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {product.data.hasAdditionalLink && (
                      <div className="flex flex-col max-w-9/12 items-center space-x-4 text-center">
                        <Link
                          className="w-full"
                          href={product.data.additionalLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="lg"
                            className="flex w-full items-center gap-1"
                            variant="secondary"
                          >
                            {product.data.additionalLinkLabel}
                            <ArrowTopRightIcon />
                          </Button>
                        </Link>
                      </div>
                    )}
                    {product.data.requiresVendorApproval && !showButtons && (
                      <div className="flex mt-4 flex-col max-w-9/12 items-center space-x-4 text-center">
                        <Link
                          className="w-full"
                          href={product.data.isExtRequiredFormApprovalLink ? product.data.ExtRequiredFormApprovalLink : `/marketplace/${storeId}/products/${productId}/approval`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="lg"
                            className="flex w-full items-center gap-1"
                            variant="secondary"
                          >
                            Request Access
                            <ArrowTopRightIcon />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
                <div className="mt-6 text-center">
                  <div className="text-medium group inline-flex text-sm">
                    <Shield
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    <span className="text-muted-foreground hover:text-gray-700">
                      Unshackled Trusted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:mt-0 lg:col-span-1">
            <div className="aspect-square rounded-lg">
              <Image
                src={product.data.imageUrl}
                alt={`${product.data.name} logo`}
                className="h-full w-full object-contain"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        {similarProductsFiltered && similarProductsFiltered?.length > 0 && (
          <ProductsReel
            products={similarProductsFiltered}
            title="Similar Services"
          />
        )}
      </div>
    </MaxWidthWrapper>
  )
}