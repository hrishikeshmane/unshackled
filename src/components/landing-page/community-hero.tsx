import React from "react";
import { Button } from "@/components/ui/button";
import HeroVideo from "./hero-video";
import Link from "next/link";

const CommunityHeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            Where ambitious <span className="text-primary">immigrants</span>{" "}
            meet and empower each other to get{" "}
            <span className="text-primary">talent visas</span> — and beyond
          </h1>

          <div className="group relative mt-10 inline-flex space-x-4">
            <Link href="#pricing-grid">
              <Button size={"lg"}>Become a member</Button>
            </Link>
            {/* <Link href="/marketplace">
              <Button
                variant={"outline"}
                size={"lg"}
                className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
              >
                <ShoppingBag className="h-5" />
                Shop on Marketplace
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 w-full items-center justify-center">
        <HeroVideo videoId="i8h6mifHGtc" />
      </div>
    </section>
  );
};

export default CommunityHeroSection;
