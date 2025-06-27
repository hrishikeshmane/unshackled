import React from "react";
import Logo from "~/components/elements/logo";
import { JoinNewsletterForm } from "~/components/landing-page/convertkit-forms";
import Footer from "~/components/landing-page/footer";

const ReferralPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#F5F9FF] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          {/* <div className="mx-auto mb-8 p-4">
            <Logo />
          </div> */}
          <h1 className="mb-6 text-4xl font-bold text-primary">
            Unshackled.club Referral Program
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Our way of rewarding you for helping us grow our community of over
            28,000+ subscribers!
          </p>
        </div>

        {/* Program Overview */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">
            What is the Unshackled.club Referral Program?
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            The Unshackled.club Referral Program is our way of rewarding you for
            helping us grow our community. It's simple: when you share the
            Unshackled.club newsletter with your friends, family, colleagues,
            and connections, you earn exclusive rewards as a thank-you for
            spreading the word.
          </p>
          <p className="text-lg text-muted-foreground">
            Every time someone subscribes using your unique referral link, it
            counts as a referral. As your referrals grow, so do your rewards!
            From exclusive swag to premium benefits, there's no limit to what
            you can earn.
          </p>
        </div>

        {/* Why Join Section */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">
            Why Should You Join the Referral Program?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Help your network access expert resources:
              </h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>
                  Free consultations with top immigration lawyers (worth $500
                  each)
                </li>
                <li>Guidance from 15+ past O1, EB1, and NIW recipients</li>
                <li>
                  Expert-led masterclasses, 100+ award databases, and
                  organizational tools
                </li>
                <li>A supportive community of 800+ like-minded individuals</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Unlock rewards for every milestone:
              </h3>
              <p className="text-muted-foreground">
                From exclusive merchandise to Apple MacBook and even lifetime
                benefits
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 font-semibold">Subscribe</h3>
              <p className="text-muted-foreground">
                Join our growing newsletter community today
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 font-semibold">Get Your Link</h3>
              <p className="text-muted-foreground">
                Find your unique referral link in every newsletter
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 font-semibold">Share</h3>
              <p className="text-muted-foreground">
                Spread the word with your network
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">4</span>
              </div>
              <h3 className="mb-2 font-semibold">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Hit milestones and collect exclusive rewards
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            Referral Rewards: Unlock Incredible Prizes
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 1 Referral */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">1 Referral</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Letter of Recommendation Template
              </h4>
              <p className="text-muted-foreground">
                Receive a professionally crafted Letter of Recommendation
                template to give your applications the winning edge.
              </p>
            </div>

            {/* 3 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">3 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                100+ Talent Visa Holder Directory
              </h4>
              <p className="text-muted-foreground">
                Gain access to an exclusive directory of 100+ Talent Visa
                Holders, a priceless resource for connecting with like-minded
                achievers.
              </p>
            </div>

            {/* 5 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">5 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                100+ Awards & Opportunities
              </h4>
              <p className="text-muted-foreground">
                Unlock a comprehensive guide featuring 100+ opportunities for
                awards, judging panels, and memberships to elevate your profile.
              </p>
            </div>

            {/* 10 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">10 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Limited Edition Magnet
              </h4>
              <p className="text-muted-foreground">
                Show off your Unshackled spirit with a unique limited-edition
                magnet that's as inspiring as you are.
              </p>
            </div>

            {/* 25 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">25 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Unshackled Paperback
              </h4>
              <p className="text-muted-foreground">
                Receive a physical copy of the Unshackled Paperback, filled with
                stories, strategies, and wisdom to inspire your journey.
              </p>
            </div>

            {/* 50 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">50 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Limited Edition T-Shirt
              </h4>
              <p className="text-muted-foreground">
                Wear your success with pride! This exclusive T-shirt is
                available only to top community members.
              </p>
            </div>

            {/* 100 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">100 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Premium Courses Worth $499
              </h4>
              <p className="text-muted-foreground">
                Unlock access to premium courses all about talent visas packed
                with expert insights including Attorney breaking the talent visa
                application process.
              </p>
            </div>

            {/* 250 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">250 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Lifetime Community Membership
              </h4>
              <p className="text-muted-foreground">
                Become a Lifetime Member of Unshackled.club ($999 Value) with
                access to free consults, expert guidance, masterclasses, and
                more!
              </p>
            </div>

            {/* 500 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">500 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Apple iWatch
              </h4>
              <p className="text-muted-foreground">
                Stay connected and stylish with an Apple iWatch, the perfect
                companion for busy changemakers.
              </p>
            </div>

            {/* 1000 Referrals */}
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 text-xl font-semibold">1000 Referrals</h3>
              <h4 className="mb-4 text-lg font-medium text-primary">
                Apple MacBook Air
              </h4>
              <p className="text-muted-foreground">
                Reach the pinnacle of the referral program and claim an Apple
                MacBook Air, the ultimate tool for creativity and productivity.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-semibold">Start Sharing Now!</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            Every referral you make doesn't just bring you closer to incredible
            rewards—it brings more people into a community that inspires and
            transforms lives.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <JoinNewsletterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferralPage;
