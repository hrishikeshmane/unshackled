import React from "react";
import CommunityTestimonials from "~/components/landing-page/community-testimonials";
import { ReferAFriendForm } from "~/components/landing-page/convertkit-forms";
import Footer from "~/components/landing-page/footer";
import HeroVideo from "~/components/landing-page/hero-video";

const AffiliatePage = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              Sign up to become one of our <br />
              first<span className="text-primary"> affiliate partners!</span>
            </h1>
            <p className="py-4 text-xl font-semibold text-muted-foreground">
              Give $100. Earn $100. No caps.
            </p>
            <div className="mx-auto my-10 flex w-fit flex-col items-center justify-center gap-4 rounded-md bg-white p-4">
              <ReferAFriendForm />
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
              Know someone struggling with the #1 problem in getting a talent
              visa: <span className="text-primary">“Where do I start?”</span>
            </h1>
            <div className="my-8 space-y-8 py-4 text-left text-2xl font-semibold text-muted-foreground">
              <p>We built unshackled.club to tackle that.</p>
              <p>
                We spent most of 2023 building the foundations of this
                community. We grew it from 0 to 400+ members. In 2024, we’d love
                to make this the go-to space for talent visa aspirants from tech
                and STEM fields in the world..
              </p>
              <p>
                As we look towards our next 400 members this year, we’d love to
                onboard people who are passionate about breaking the immigration
                handcuffs to start their company, escape the H-1B lottery, or
                get a green card through merit.
              </p>
              <p>
                If you have a nomination for a friend/colleague you’d want on
                here, awesome. Just sign up to be our early affiliate, and
                we&apos;ll send you the next steps soon!
              </p>
              <p>
                For every friend you refer, you give them $100 off on the
                membership and earn $100 when they sign up. No caps :)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl font-bold">
          We’ve tried to make
          <span className="text-primary"> this easy for you!</span>
        </h2>
        <p className="py-4 text-xl font-semibold text-muted-foreground">
          Here’s a quick template to refer a friend to our Unshackled community
        </p>
        <div className="mx-auto my-10 w-full max-w-4xl items-center justify-center space-y-3 rounded-md bg-white p-8 text-xl font-semibold leading-normal text-muted-foreground">
          <p>Hi ABC, </p>
          <p>
            I know about this community called unshackled.club. They’re focused
            on helping O1/EB1/NIW aspirants, especially in tech & STEM. Since
            you’re actively thinking about getting an extraordinary visa, I
            thought you’d find this useful. They’re looking to onboard new
            members, and asked for nominations. Are you interested?{" "}
          </p>
          <p>
            Check it out: <b className="">[ADD YOUR UNIQUE LINK]</b>
          </p>
        </div>
        <p className="py-4 text-xl font-semibold text-muted-foreground">
          Earn $100 for every friend you refer. No caps.
        </p>
      </section>

      <section className="mx-auto my-8 mt-24 flex w-full max-w-5xl flex-col items-center justify-center">
        <p className="py-4 text-xl font-semibold text-muted-foreground">
          What is the Unshackled community?
        </p>
        <h2 className="text-center text-4xl font-bold">
          unshackled.club is where
          <span className="text-primary"> 500+ ambitious immigrants </span>
          in STEM and business fields meet and empower each other to get talent
          visas — and beyond.
        </h2>
        <p className="py-4 text-xl font-semibold text-muted-foreground">
          As soon as you join, here&apos;s what you can expect...
        </p>
        <ol className="mx-auto my-10 w-full max-w-3xl list-disc items-center justify-center space-y-3 rounded-md p-2 text-2xl font-semibold leading-normal ">
          <li>Free 1:1 consults with 10+ past O1/EB1/NIW visa recipients</li>
          <li>Free profile evaluations with 8 top immigration lawyers</li>
          <li>Access to resources and case studies to boost your profile</li>
          <li>
            Monthly masterclasses and Ask-Me-Anythings with top immigration
            experts
          </li>
          <li>
            And of course, the support of 400+ ambitious talent visa aspirants
            in a similar boat!
          </li>
        </ol>
      </section>

      <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl font-bold">
          Hear it from another member, Dominic,{" "}
          <span className="text-primary">who got his O-1A</span>
        </h2>

        <div className="mx-auto my-10 w-full items-center justify-center">
          <HeroVideo videoId="zxfAyLdFQBM" />
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
      <Footer />
    </div>
  );
};

export default AffiliatePage;
