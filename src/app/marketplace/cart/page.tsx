"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { api } from "~/trpc/react";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

const Page = () => {
  const { items, removeItem } = useCart();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const createCheckoutSession = api.payment.buyProduct.useMutation({
    onSuccess: (data) => {
      router.push(data?.sessionUrl);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onCheckout = () => {
    const cartItems = items.map(({ product, quantity }) => ({
      productId: product.id,
      quantity: quantity,
    }));

    startTransition(async () => {
      await createCheckoutSession.mutateAsync({ items: cartItems });
    });
  };

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + Number(product.price) * quantity,
    0,
  );

  const fee = 0;

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Order Summary
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div
              className={cn("lg:col-span-7", {
                "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                  isMounted && items.length === 0,
              })}
            >
              <h2 className="sr-only">Items to Checkout</h2>

              {isMounted && items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <div
                    aria-hidden="true"
                    className="relative mb-4 h-40 w-40 text-muted-foreground"
                  >
                    <Image
                      src="/hippo-empty-cart.png"
                      fill
                      loading="eager"
                      alt="empty shopping cart hippo"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold">Your cart is empty</h3>
                  <p className="text-center text-muted-foreground">
                    Whoops! Nothing to show here yet.
                  </p>
                  <Link href="/marketplace" className="text-primary font-bold">Go back to Shopping!</Link>
                </div>
              ) : null}

              <ul
                className={cn({
                  "divide-y divide-gray-200 border-b border-t border-gray-200":
                    isMounted && items.length > 0,
                })}
              >
                {isMounted &&
                  items.map(({ product, quantity }) => {
                    return (
                      <div key={product.id} className="space-y-3 py-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="h-16 w-16 rounded-md"
                            />
                            <div>
                              <p className="text-sm font-semibold">
                                {product.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Category: {product.store?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {quantity}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1 font-medium">
                            {/* <span className="ml-auto text-sm text-muted-foreground line-through">
                              {formatPrice(Number(product.price))}
                            </span> */}
                            <span className="ml-auto text-sm">
                              {formatPrice(Number(product.price) * quantity)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Button
                            aria-label="Remove item"
                            onClick={() => removeItem(product.id)}
                            variant="ghost"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                            Remove
                          </Button>
                          <div className="ml-auto flex items-center space-x-2">
                            <Check
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span className="text-xs text-muted-foreground">
                              Eligible for instant delivery
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </div>

            <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(cartTotal)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Flat Transaction Fee</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-base font-medium text-gray-900">
                    Order Total
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(cartTotal + fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  disabled={items.length === 0 || isPending}
                  onClick={onCheckout}
                  className="w-full"
                  size="lg"
                >
                  {isPending ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : null}
                  Checkout
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
