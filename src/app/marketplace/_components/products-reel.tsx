import React from "react";
import Image from "next/image";
import { type ProductWithRelations } from "~/types/globals";
import Link from "next/link";
import AddToCartButton from "~/components/add-to-cart-button";
import { formatPrice } from "~/lib/utils";

interface ProductsReelProps {
  products: ProductWithRelations[];
  title: string;
  subtitle?: string;
}

const ProductsReel = ({ products, title, subtitle }: ProductsReelProps) => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary max-xl:text-center">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-xl:text-center">
          {subtitle}
        </p>
        <div className="mt-8 flex items-center flex-col md:flex-row gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/marketplace/${product.storeId}/products/${product.id}`}>
                <div className="relative h-48 w-72 rounded-t-xl overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt="Product"
                  className="object-cover object-center"
                  fill
                  quality={100}
                />
              </div>
                <div className="w-72 px-4 py-3">
                  <span className="mr-3 text-xs uppercase text-gray-400">
                    {product.store?.name}
                  </span>
                  <p className="block truncate text-lg font-bold capitalize text-primary">
                    {product.name}
                  </p>
                  <div className="flex items-center">
                    <p className="my-3 cursor-auto text-lg font-semibold text-black">
                        {formatPrice(product.price)}
                    </p>
                    {/* <del>
                      <p className="ml-2 cursor-auto text-sm text-gray-600">
                        $199
                      </p>
                    </del> */}
                    <div className="ml-auto max-w-40 mx-2">
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsReel;
