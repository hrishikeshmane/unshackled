import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { api } from "~/trpc/server";
import ProductsReel from "./_components/products-reel";
import Footer from "~/components/landing-page/footer";

export default async function MarketplacePage() {
  const perks = [
    {
      name: "Instant Delivery",
      Icon: ArrowDownToLine,
      description:
        "Get your assets delivered to your email in seconds and download them right away.",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      description:
        "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
    },
    {
      name: "For the Planet",
      Icon: Leaf,
      description:
        "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    },
  ];

  const products = await api.product.getApprovedProducts();
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-primary">Vendors</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to Unshackled. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* border-t border-gray-200 bg-gray-50 */}
      <section className="">
        <MaxWidthWrapper>
          <div className="py-10 sm:py-20">
            {featuredProducts && featuredProducts?.length > 0 ? (
              <ProductsReel
                products={featuredProducts}
                title="Featured Products"
                subtitle="Unshackled trusted & recommended exclusive products for you."
              />
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-primary">
                    {<perk.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      <Footer />
    </>
  );
}
