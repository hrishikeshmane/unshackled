import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SendMeEbookForm } from "~/components/landing-page/convertkit-forms";
import Footer from "~/components/landing-page/footer";

const O1StoryPage = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              How I got my <span className="text-primary">O-1 visa</span> as a
              <br /> <span className="text-primary">Solo Founder</span> in
              America
            </h1>
            <p className="py-4 text-xl font-semibold text-muted-foreground">
              2.5 years. $25,000. RFE. Denial. 221(g).
            </p>
            <div className="mx-auto my-10 flex w-fit flex-col items-center justify-center gap-4 rounded-md bg-white p-4">
              <SendMeEbookForm />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <Image
          src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/o1story/o1story-ebook.png?raw=true"
          alt="Soundarya"
          width={500}
          height={500}
        />
        <p className="py-4 text-xl font-semibold text-muted-foreground">
          Story
        </p>
        <div className="flex max-w-5xl flex-col items-center text-center">
          <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
            So… <span className="text-primary">On September 12th, 2023,</span>
          </h2>
          <h3 className="mt-5 max-w-5xl text-2xl font-semibold leading-normal text-gray-900 sm:text-5xl sm:leading-normal lg:text-4xl lg:leading-normal">
            I got my O-1A extraordinary visa approved as the solo founder and
            100% owner of an educational venture that publishes books & builds
            communities.
          </h3>
          <p className="py-4 text-xl font-semibold text-muted-foreground">
            From the day I learned about the O-1 visa, it took me
          </p>
          <h3 className="mt-5 max-w-5xl text-2xl font-semibold leading-normal text-gray-900 sm:text-5xl sm:leading-normal lg:text-4xl lg:leading-normal">
            2.5 years, $25,000, a denial, and a{" "}
            <Link
              className="text-primary underline decoration-primary"
              href={
                "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/administrative-processing-information.html"
              }
              target="blank"
            >
              221(g)
            </Link>{" "}
            to reach this milestone.
          </h3>
          <p className="py-4 text-xl font-semibold">In these 2.5 years,</p>
          <p className="max-w-4xl py-4 text-2xl font-semibold text-muted-foreground">
            I quit my job at Salesforce,{" "}
            <Link
              className="text-primary underline decoration-primary"
              href={"https://go.readunshackled.com/order"}
              target="blank"
            >
              published a book on immigration
            </Link>{" "}
            (the irony, I know), and{" "}
            <Link
              className="text-primary underline decoration-primary"
              href={"https://www.readunshackled.com/community"}
              target="blank"
            >
              built an online community for O-1/EB-1 visa aspirants
            </Link>{" "}
            (among other things).
          </p>
          <p className="py-4 text-xl font-semibold">
            In this 6000-word short book,
          </p>
          <p className="max-w-4xl py-4 text-2xl font-semibold text-muted-foreground">
            I share the inside story of how/why I quit my job at Salesforce,
            what happened with my O-1 denial, and how I eventually got an
            approval.
          </p>
          <p className="py-4 text-xl font-semibold">
            Grab a cup o’ coffee and dive in! ☕
          </p>
          <div className="mx-auto my-10 flex w-fit flex-col items-center justify-center gap-4 rounded-md bg-white p-4">
            <SendMeEbookForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default O1StoryPage;
