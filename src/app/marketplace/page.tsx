import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { api } from "~/trpc/server";
import ProductsReel from "./_components/products-reel";
import Footer from "~/components/landing-page/footer";
import StoresReel from "./_components/stores-reel";
import { billboard } from "~/server/db/schema";
import BecomeASeller from "./_components/become-a-seller";
import BecomeASellerSection from "./_components/become-a-seller-section";

export default async function MarketplacePage() {
  const storesRaw = await api.store.getStores({live: true});
  const billboards = await api.billboard.getBillboards();

  const stores = await Promise.all(
    storesRaw.map(async (store) => {
      const storeBillboards = billboards.filter(
        (billboard) => billboard.storeId === store.id,
      );
      const imageUrl =
        storeBillboards.length > 0 ? storeBillboards[0]?.imageUrl : "";

      return {
        id: store.id,
        title: storeBillboards[0]?.label ?? "",
        description: storeBillboards[0]?.description ?? "",
        imageUrl: imageUrl ?? "",
        link: `/marketplace/${store.id}`,
      };
    }),
  );

  const products = await api.product.getApprovedProducts();
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your talent visa marketplace for high-quality{" "}
            <span className="text-primary">Vendors</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to Unshackled. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          {/* <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div> */}
        </div>
      </MaxWidthWrapper>

      {/* border-t border-gray-200 bg-gray-50 */}
      <section className="">
        <MaxWidthWrapper>
          <div className="py-10 pb-0 sm:py-10">
            {featuredProducts && featuredProducts?.length > 0 ? (
              <ProductsReel
                products={featuredProducts}
                title="Featured Services"
                subtitle="Unshackled trusted & recommended exclusive Services for you."
              />
            ) : null}
          </div>

          <div className="">
            <StoresReel
              stores={stores}
              reelTitle="Shop Collections"
              reelSubtitle="Discover amazing services from our trusted partners"
            />
          </div>
          
          {/* <div className="py-10">
            <BecomeASellerSection />
          </div> */}
          
        </MaxWidthWrapper>
      </section>
      <Footer />
    </>
  );
}
