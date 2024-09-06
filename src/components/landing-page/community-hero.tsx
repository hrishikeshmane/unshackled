import React from "react";
import { Button } from "@/components/ui/button";
import HeroVideo from "./hero-video";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const SubCommunityHeroSection = () => {
  return (
    <>
      <section className="mx-auto my-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-5xl font-bold">
          <span className="text-primary">unshackled.club</span> is an exclusive
          community.
        </h2>
        <p className="mx-auto mt-8 max-w-4xl px-2 text-center text-2xl font-semibold leading-8 text-muted-foreground">
          We built it for{" "}
          <span className="text-primary">ambitious immigrants</span> who
          contribute significantly to their fields - and have big dreams for
          their future.
        </p>
      </section>
      <section className="my-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 md:flex-row">
          <div className="basis-1/2 rounded-lg bg-card p-8">
            <h3 className="text-2xl font-bold">You should only join if:</h3>
            <div className="mx-auto flex flex-col gap-2 py-4">
              <div className="flex gap-4 text-lg font-semibold">
                <Check size={32} className="text-green-600" />
                <p className="text-muted-foreground">
                  You have a basic understanding of talent visas, especially the
                  O-1A, EB-1A, or EB-2 NIW. If you don&apos;t, no worries.
                  Enroll for our free course.
                </p>
              </div>
              <div className="flex gap-4 text-lg font-semibold">
                <Check size={32} className="text-green-600" />
                <p className="text-muted-foreground">
                  You are clear about your motivation for getting a talent visa.
                  E.g. starting your company, quitting your job, getting freedom
                  via green card, etc.
                </p>
              </div>
              <div className="flex gap-4 text-lg font-semibold">
                <Check size={18} className="text-green-600" />
                <p className="text-muted-foreground">
                  You are willing to invest time and effort into the community
                  and your future.
                </p>
              </div>
            </div>
          </div>
          <div className="basis-1/2 rounded-lg bg-card p-8">
            <h3 className="text-2xl font-bold">You should NOT join if:</h3>
            <div className="mx-auto flex flex-col py-4">
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <X size={16} className="text-destructive " />
                <p className="text-muted-foreground">
                  You&apos;re looking for a &quot;hack&quot; to get your green
                  card. There is none.
                </p>
              </div>
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <X size={35} className="text-destructive " />
                <p className="text-muted-foreground">
                  You want hand-holding through every step of the process until
                  you file. We look for members who are proactive and make use
                  of our resources well.
                </p>
              </div>
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <X size={35} className="text-destructive " />
                <p className="text-muted-foreground">
                  You come from a field that we don&apos;t have resources for.
                  E.g. artists, actresses, chefs, etc. Our community is geared
                  toward tech, STEM and business fields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

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
