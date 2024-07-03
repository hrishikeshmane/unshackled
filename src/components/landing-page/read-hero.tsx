import React from "react";
import { Button } from "@/components/ui/button";
import { Companies } from "./social-proof";
import Link from "next/link";
import Image from "next/image";

const ReadHeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            Take control of your future as an <br />{" "}
            <span className="text-primary">immigrant</span> in America
          </h1>

          <ReadHeroSectionCTAButtons />
        </div>
      </div>

      <div className="realtive mx-auto w-full">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66263c0f9352e25bddf1ee14_Rectangle%202029%20(2)-p-800.png"
          alt="book chapter image with cover"
          width={400}
          height={400}
          className="mx-auto my-14"
          //   sizes="100vw"
          //   style={{ width: "50%", height: "auto", margin: "4rem auto" }}
        />
        <div className="absolute right-[28%] top-[25%] hidden max-w-64 rounded-md bg-card p-6 lg:block">
          <blockquote className="text-lg font-semibold text-primary">
            "Finally, a book that demystifies the complex immigration system."
          </blockquote>
          <div className="w-full items-center justify-center pt-1">
            <p className="font-bold">Xiao Wang</p>
            <p className="font-bold text-muted-foreground">CEO of Boundless</p>
          </div>
        </div>
        <div className="absolute left-[28%] top-[35%] hidden max-w-64 rounded-md bg-card p-6 lg:block">
          <blockquote className="text-lg font-semibold text-primary">
            "Dynamite stuff."
          </blockquote>
          <div className="w-full items-center justify-center pt-1">
            <p className="font-bold">Brad Feld</p>
            <p className="font-bold text-muted-foreground">
              Cofounder of TechStars Author of Venture Deals
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full items-center justify-center">
        <Companies />
      </div>
      <div className="w-full">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/660539ac1005b7c3e85bcb8c_bg-1.png"
          alt="book chapter image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
};

export const ReadHeroSectionCTAButtons = () => {
  return (
    <div className="group relative mt-10 inline-flex space-x-4">
      <Link
        href={
          "https://www.amazon.com/dp/B0C55LNV7B/ref=sr_1_1?keywords=unshackled+soundarya&qid=1683996713&sprefix=unshackled+so%2Caps%2C364&sr=8-1"
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size={"lg"}>Buy on Amazon</Button>
      </Link>
      <Link href="/marketplace">
        <Button
          variant={"outline"}
          size={"lg"}
          className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
        >
          Bulk order on website
        </Button>
      </Link>
    </div>
  );
};

export default ReadHeroSection;
