"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, Shield } from "lucide-react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Badge } from "~/components/ui/badge";
import AddToCartButton from "~/components/add-to-cart-button";
import ProductsReel from "~/app/marketplace/_components/products-reel";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;
  const storeId = params.storeId;
  const product = api.product.getProductById.useQuery({
    id: String(productId),
  });
  const similarProducts = api.product.getApprovedProductsByStoreId.useQuery({
    storeId: String(storeId),
  });
  const similarProductsFiltered = similarProducts.data?.filter(
    (p) => p.id !== productId,
  );

  if (product.isPending || similarProducts.isPending) {
    return <div>Loading...</div>;
  }

  if (!product.data) {
    redirect(`/marketplace/${String(storeId)}`);
  }

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: `/marketplace/${String(storeId)}` },
  ];

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
                    {product.data.price}
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
                <div className="mt-10">
                  <AddToCartButton product={product.data} />
                </div>
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
