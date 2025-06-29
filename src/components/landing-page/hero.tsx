import React from "react";
import AvatarCircles from "@/components/magicui/avatar-circles";
import { Button } from "@/components/ui/button";
import { Companies } from "./social-proof";
import HeroVideo from "./hero-video";
import { ArrowUpRight, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "~/lib/config";

const avatarUrls = [
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Hitesh%20Kenjale.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Digvijay%20Singh.jpeg?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Twinkle%20Mohan.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Dominic%20Damoah.jpeg?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Zoya%20Brar.jpeg?raw=true",
];

const HeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            A community by and for <br /> skilled immigrants
            {/* Escape the H-1B lottery <br />{" "}
            <span className="text-primary">Empower</span> your career with a
            talent visa */}
          </h1>
          <p className="mx-auto mt-12 max-w-5xl text-2xl font-bold leading-8 text-muted-foreground ">
            Events, community, and support for immigrant founders, tech workers,
            and creatives shaping their future in America.
            {/* At <span className="text-primary">unshackled.club</span>, we do one
            thing really well: help{" "}
            <span className="text-primary">ambitious immigrants </span>
            secure a talent visa in America - that doesn&apos;t rely on a
            lottery. */}
          </p>

          <div className="group relative mx-auto mt-10 inline-flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link href="/community">
              <Button size={"lg"} className="w-full md:w-fit">
                Become a member
              </Button>
            </Link>
            {/* <Link
              href="https://go.greencard.inc/evaluation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant={"outline"}
                size={"lg"}
                className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
              >
                <Phone className="h-5" />
                Book a Free Call
              </Button>
            </Link> */}
          </div>
          <div className="mb-4 mt-6 flex justify-center">
            <Link
              href="https://go.readunshackled.com/scholarship"
              target="blank"
            >
              <Button
                variant={"link"}
                size={"lg"}
                className="flex gap-1 text-primary hover:text-primary"
              >
                Student? Apply for Scholarship
                <ArrowUpRight className="h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center space-x-4 md:mt-12 md:flex-row ">
        <AvatarCircles
          numPeople={parseInt(siteConfig.memberCount.slice(0, -1))}
          avatarUrls={avatarUrls}
        />
        <span className="font-semibold">
          Trusted by {siteConfig.memberCount} ambitious immigrants
        </span>
      </div>
      <div className="mx-auto w-full items-center justify-center">
        <Companies />
      </div>
      <div className="mx-auto my-10 w-full items-center justify-center">
        <HeroVideo videoId="CxCDbO2iZ_o" />
      </div>
    </section>
  );
};

export default HeroSection;
