import Image from "next/image";
import Link from "next/link";
import React from "react";
import CommunityHeroSection, {
  SubCommunityHeroSection,
} from "~/components/landing-page/community-hero";
import { FreeResourcesForm } from "~/components/landing-page/convertkit-forms";
import Footer from "~/components/landing-page/footer";
import { Button } from "~/components/ui/button";

const FreeResourcePage = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              Welcome to <span className="text-primary">Unshackled&apos;s</span>
              <br /> free resources!
            </h1>
            <p className="py-4 text-xl font-semibold text-muted-foreground">
              Congrats! You’ve unlocked access to free resources on top of the
              book. Use it wisely. 😁
            </p>
            <div className="mx-auto my-10 flex w-fit flex-col items-center justify-center gap-4 rounded-md bg-white p-4">
              <FreeResourcesForm />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center rounded-md bg-white p-8 text-center">
            <p className="font-semibold text-primary">Notion tracker</p>
            <h3 className="mb-2 py-4 text-2xl font-semibold">
              The Ultimate profile-building tracker for O-1/EB-1
            </h3>
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/free-resources/notion-tracker.png?raw=true"
              alt="alt"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center rounded-md bg-white p-8">
            <p className="font-semibold text-primary">List of grants</p>
            <h3 className="mb-2 py-4 text-2xl font-semibold">
              List of 30+ grants to help you kickstart your idea
            </h3>{" "}
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/free-resources/grants.png?raw=true"
              alt="alt"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center rounded-md bg-white p-8">
            <p className="font-semibold text-primary">List of VC funds</p>
            <h3 className="mb-2 py-4 text-2xl font-semibold">
              Top VC funds that help immigrant founders
            </h3>
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/free-resources/vc-funds.png?raw=true"
              alt="alt"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center rounded-md bg-white p-8">
            <p className="font-semibold text-primary">Recommendation Letters</p>
            <h3 className="mb-2 py-4 text-2xl font-semibold">
              6+ sample recommendations for your visa application
            </h3>{" "}
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/free-resources/lors.png?raw=true"
              alt="alt"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <CommunityHeroSection />
        <SubCommunityHeroSection />
      </section>

      <section className="mx-auto my-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl font-bold text-primary">
          Sounds like you? Awesome.
        </h2>
        <h2 className="text-center text-4xl font-bold">
          This is the place for you.
        </h2>
        <div className="group relative mt-10 inline-flex scale-150 space-x-4">
          <Link href="/community/#pricing-grid">
            <Button size={"lg"}>Become a member</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FreeResourcePage;
