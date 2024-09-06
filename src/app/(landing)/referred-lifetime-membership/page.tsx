import Link from "next/link";
import React from "react";
import CommunityTestimonials from "~/components/landing-page/community-testimonials";
import Footer from "~/components/landing-page/footer";
import { Button } from "~/components/ui/button";

const ReferedPage = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              You&apos;ve got a great friend!
              <br />
              Join
              <span className="text-primary"> 500+ </span>
              talent visa aspirants to get your O1/EB1/NIW
            </h1>
            <p className="py-4 text-xl font-semibold text-muted-foreground">
              Thanks to your friend, join unshackled.club at $100 off :)
            </p>
            <div className="group relative mt-10 inline-flex space-x-4">
              <Link
                href="https://unshackled.thrivecart.com/unshackled-community-discounted-lifetime/"
                target="blank"
              >
                <Button size={"lg"}>Become a member at $100 off</Button>
              </Link>
              <Link href="/community">
                <Button
                  className="border-2 border-primary"
                  size={"lg"}
                  variant={"outline"}
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl font-bold">
          Want more? Hear it from 10+ members who <br />
          <span className="text-primary">got talent visas</span> — and more
        </h2>

        <div className="mx-auto my-10 w-full items-center justify-center">
          <CommunityTestimonials />
        </div>
      </section>

      <section className="mx-auto my-28 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl font-bold text-primary">
          Learn more about the community and
        </h2>
        <h2 className="text-center text-4xl font-bold">‍explore benefits.</h2>
        <div className="group relative mt-10 inline-flex scale-150 space-x-4">
          <Link href="/community">
            <Button size={"lg"}>Explore all community benefits</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReferedPage;
