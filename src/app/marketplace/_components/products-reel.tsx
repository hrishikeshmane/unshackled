import React from "react";
import Image from "next/image";
import { type ProductWithRelations } from "~/types/globals";
import Link from "next/link";
import { formatPrice } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

interface ProductsReelProps {
  products: ProductWithRelations[];
  title: string;
  subtitle?: string;
}

const ProductsReel = ({ products, title, subtitle }: ProductsReelProps) => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary max-xl:text-center">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-xl:text-center">
          {subtitle}
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <Link href={`/marketplace/${product.storeId}/products/${product.id}`}>
                <div className="relative h-48 w-full rounded-t-xl overflow-hidden bg-gray-100"> 
                  {/* remove bg color if required */}
                  <Image
                    src={product.imageUrl}
                    alt="Product"
                    className="object-contain object-center"
                    // "object-cover"
                    fill
                    quality={100}
                  />
                </div>
              </Link>
              <div className="flex-grow px-4 py-3">
                <span className="mr-3 text-xs uppercase text-gray-400">
                  {product.store?.name}
                </span>
                <p className="block truncate text-lg font-bold capitalize text-primary">
                  {product.name}
                </p>
                {product.hasAdditionalLink && (
                  <div className="text-gray-400 underline">
                    {/* More at{" "} */}
                    <Link href={product.additionalLinkUrl}>
                      {product.additionalLinkLabel}
                    </Link>
                  </div>
                )}
              </div>
              {/* Price and Button at the bottom */}
              <div className="px-4 pb-3 flex items-center">
                <p className="my-3 cursor-auto text-lg font-semibold text-black">
                  {product.hasDownPayment ? `Starting at ${formatPrice(product.downPayment)}` : product.hasPricingPlans ? `Starting at ${formatPrice(product.price)}` : formatPrice(product.price)}
                </p>
                <div className="ml-auto">
                  <Link href={`/marketplace/${product.storeId}/products/${product.id}`}>
                    <Button>View <ArrowTopRightIcon className="ml-2"/></Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsReel;
