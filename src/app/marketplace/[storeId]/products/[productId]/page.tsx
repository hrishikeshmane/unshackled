"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, Shield } from "lucide-react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Badge } from "~/components/ui/badge";
// import AddToCartButton from "~/components/add-to-cart-button";
import BuyNowButton from "~/components/buy-now-button";
import ProductsReel from "~/app/marketplace/_components/products-reel";
import QuantitySelector from "~/components/quantity-selector";
import { Button } from "~/components/ui/button";
import { formatPrice } from "~/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;
  const storeId = params.storeId;
  const product = api.product.getProductById.useQuery({
    id: String(productId),
  });
  const existingRequest = api.approvalForms.checkExistingRequest.useQuery({
    productId: String(productId),
  });  
  const similarProducts = api.product.getApprovedProductsByStoreId.useQuery({
    storeId: String(storeId),
  });
  const similarProductsFiltered = similarProducts.data?.filter(
    (p) => p.id !== productId,
  );

  const [quantity, setQuantity] = useState(1);

  if (product.isPending || similarProducts.isPending || existingRequest.isLoading) {
    return <div>Loading...</div>;
  }

  if (!product.data) {
    redirect(`/marketplace/${String(storeId)}`);
  }

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: `/marketplace/${String(storeId)}` },
  ];

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleManualChange = (value: number) => setQuantity(Math.max(1, value));

  const showButtons = !product.data.requiresVendorApproval ||
    (existingRequest.data?.exists && existingRequest.data.status === "approved");

  return (
    <>
      <MaxWidthWrapper>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product Details */}
            <div className="lg:max-w-lg lg:self-end">
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

              <div className="mt-4 flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="text-primary">{product.data.name}</span>{" "}
                  {!!product.data.isFeatured ? (
                    <Badge
                      variant="outline"
                      className="ml-1 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-2 text-xs text-blue-600"
                    >
                      ⭐ Featured{" "}
                    </Badge>
                  ) : (
                    ""
                  )}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {product.data.tagline}
                </p>
              </div>

              <section className="mt-4">
                <div className="flex items-center">
                  <p className="font-medium text-gray-900">
                    {formatPrice(product.data.price)}
                  </p>

                  <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
                    {product.data.store.name}
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-muted-foreground">
                    {product.data.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                  <Check
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                  />
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
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-square rounded-lg">
                <Image
                  src={product.data.imageUrl}
                  alt={`${product.data.name} logo`}
                  className="h-full w-full object-cover"
                  width={400}
                  height={400}
                  // className="self-center rounded-lg object-contain"
                />
              </div>
            </div>
            
            {/* add to cart part */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <div>
                { showButtons ? 
                (  <>
                  <div className="mt-10 flex items-center space-x-4">
                    {/* <BuyNowButton product={product.data} /> */}
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onManualChange={handleManualChange}
                      />
                    <BuyNowButton
                      product={product.data}
                      quantity={quantity}
                      isDownPayment={false}
                      />
                  </div>
                  {product.data.hasDownPayment && (
                    <>
                      <div className="mt-4 flex flex-col items-center text-center">
                        <p className="text-muted-foreground">
                          OR get started with initial down payment of{" "}
                          {formatPrice(product.data.downPayment)} and pay the rest
                          to vendor later.
                        </p>
                        <BuyNowButton
                          className="b-2 mx-0 my-4 border-primary"
                          variant="outline"
                          product={product.data}
                          quantity={quantity}
                          isDownPayment={true}
                          buttonText="Start with Down Payment"
                          />
                      </div>
                    </>
                  )}
                  {product.data.hasAdditionalLink && (
                    <>
                      <div className="flex flex-col items-center space-x-4 text-center">
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
                    </>
                  )}
                  </>) : (
                    <>
                    <div className="flex flex-col items-center space-x-4 text-center">
                      <Link
                        className="w-full"
                        href={`/marketplace/${storeId}/products/${productId}/approval`}
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
                  </>
                  )
                }
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
        </div>

        <div className="my-10 ">
          {similarProductsFiltered && similarProductsFiltered?.length > 0 ? (
            <ProductsReel
              products={similarProductsFiltered}
              title="Similar Products"
            />
          ) : null}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductPage;
