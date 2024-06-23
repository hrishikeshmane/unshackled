import Footer from "@/components/landing-page/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CommunityBenotGrid } from "~/components/landing-page/community-bento-grid";
import { CommunityFaq } from "~/components/landing-page/community-faq";
import CommunityHeroSection from "~/components/landing-page/community-hero";
import CommunityTestimonials from "~/components/landing-page/community-testimonials";
import HeroVideo from "~/components/landing-page/hero-video";
import PricingGrid from "~/components/landing-page/pricing-grid";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <main>
        <CommunityHeroSection />

        <section className="mx-auto my-8 flex w-full flex-col items-center justify-center">
          <h2 className="text-5xl font-bold">
            <span className="text-primary">unshackled.club</span> is an
            exclusive community.
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-center text-xl font-semibold leading-7 text-muted-foreground">
            We built it for{" "}
            <span className="text-primary">ambitious immigrants</span> who
            contribute significantly to their fields - and have big dreams for
            their future.
          </p>
        </section>
        <section className="my-4">
          <div className="mx-auto flex w-full max-w-7xl gap-4 p-4">
            <div className="basis-1/2 rounded-lg bg-card p-8">
              <h3 className="text-2xl font-bold">You should only join if:</h3>
              <div className="mx-auto flex flex-col gap-2 py-4">
                <div className="flex gap-4 text-lg font-semibold">
                  {/* <Check className="w-6 text-green-600" /> */}
                  <p className="text-muted-foreground">
                    You have a basic understanding of talent visas, especially
                    the O-1A, EB-1A, or EB-2 NIW. If you don&apos;t, no worries.
                    Enroll for our free course.
                  </p>
                </div>
                <div className="flex gap-4 text-lg font-semibold">
                  {/* <Check className="w-6 text-green-600" /> */}
                  <p className="text-muted-foreground">
                    You are clear about your motivation for getting a talent
                    visa. E.g. starting your company, quitting your job, getting
                    freedom via green card, etc.
                  </p>
                </div>
                <div className="flex gap-4 text-lg font-semibold">
                  {/* <Check className="w-6 text-green-600" /> */}
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
                  {/* <X className="text-destructive " /> */}
                  <p className="text-muted-foreground">
                    You&apos;re looking for a &quot;hack&quot; to get your green
                    card. There is
                  </p>
                </div>
                <div className="flex gap-2 py-2 text-lg font-semibold">
                  {/* <X className="text-destructive " /> */}
                  <p className="text-muted-foreground">
                    You want hand-holding through every step of the process
                    until you file. We look for members who are proactive and
                    make use of our resources well.
                  </p>
                </div>
                <div className="flex gap-2 py-2 text-lg font-semibold">
                  {/* <X className="text-destructive " /> */}
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

        <section className="mx-auto my-8 flex w-full flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-primary">
            Sounds like you? Awesome.
          </h2>
          <h2 className="text-4xl font-bold">This is the place for you.</h2>
          <div className="group relative mt-10 inline-flex scale-150 space-x-4">
            <Button size={"lg"}>Become a member</Button>
          </div>
        </section>

        <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">
            Hear it from <span className="text-primary">Hitesh Kenjale</span>,
            one of our <br /> members who got the{" "}
            <span className="text-primary">O-1A</span>
          </h2>

          <div className="mx-auto my-10 w-full items-center justify-center">
            <HeroVideo videoId="i258IxKFrYg" />
          </div>
        </section>

        <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">
            We’ve got engineers, founders, product <br /> managers, scientists,
            and researchers.
          </h2>
          <p className="mt-8 text-lg font-bold text-muted-foreground">
            Our community of{" "}
            <span className="text-primary">450+ aspirants</span> span all
            corners of tech, STEM and business fields.
          </p>

          <div className="mx-auto my-10 w-full items-center justify-center">
            <div className="mx-auto mb-20 grid w-full max-w-7xl grid-cols-4 grid-rows-2 gap-6">
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/661146688101b845ca4d45b5_Rectangle%202091-p-500.png"
                  alt="Aswarth Abhilash Dara"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Aswarth Abhilash Dara
                  </h3>
                  <p className="text-muted-foreground">
                    Staff Software Engineer Al/ML at Walmart Global Tech EB-2
                    NIW Recipient
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/661146685e3125edbced43b6_Rectangle%202091-1-p-500.png"
                  alt="Nikin Tharan"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Nikin Tharan
                  </h3>
                  <p className="text-muted-foreground">
                    Founder of Mental Health Startup | Ex-Cofounder of Medsix
                    EB-1A Visa Recipient
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66114668a3de6dd984db53fa_Rectangle%202091-2-p-500.png"
                  alt="Hitesh Kenjale"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Hitesh Kenjale
                  </h3>
                  <p className="text-muted-foreground">
                    Co-founder of DesiHangover | UC Berkeley MBA Graduate |
                    Acumen Fellow O-1A Recipient
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66114667cfd687f3274e556f_Rectangle%202091-3-p-500.png"
                  alt="Chinmay Jog"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Chinmay Jog
                  </h3>
                  <p className="text-muted-foreground">
                    Senior Machine Learning Engineer O1-A Recipient
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/661146684894562998fbccad_Rectangle%202091-4-p-500.png"
                  alt="Sunku Ranganath"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Sunku Ranganath
                  </h3>
                  <p className="text-muted-foreground">
                    Principal Product Manager. EB-1A Recipient
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66114668882f79fe097a7aa0_Rectangle%202091-5-p-500.png"
                  alt="Nirupama Narayanaswamy"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Nirupama Narayanaswamy
                  </h3>
                  <p className="text-muted-foreground">
                    Organizational Effectiveness Consultant
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/6611466852601225c77830ba_Rectangle%202091-6-p-500.png"
                  alt="Jenil Shah"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">Jenil Shah</h3>
                  <p className="text-muted-foreground">
                    CTO and Co-founder, Upview
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/661146688101b845ca4d45bc_Rectangle%202091-7-p-500.png"
                  alt="Sharath Kumar"
                  width={270}
                  height={270}
                  className="rounded-lg"
                />
                <div className="flex flex-col py-4 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    Sharath Kumar
                  </h3>
                  <p className="text-muted-foreground">Data Science Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="companies">
          <div className="py-8">
            <div className="container mx-auto px-4 md:px-8">
              <h3 className="pb-6 text-center text-3xl font-semibold">
                Our members come from{" "}
                <span className="text-primary">top companies</span>
              </h3>
              <div className="relative mt-6">
                <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4">
                  {companies.map((logo, idx) => (
                    <Image
                      key={idx}
                      width={160}
                      height={40}
                      src={`https://cdn.magicui.design/companies/${logo}.svg`}
                      className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                      alt={logo}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white px-44 py-32">
          <h3 className="pb-4 text-center text-3xl font-semibold">
            Goal of <span className="text-primary">unshackled.club</span> = Help
            you get your <span className="text-primary">talent visa</span>
          </h3>
          <p className="mt-2 pb-8 text-center text-lg font-bold text-muted-foreground">
            So every benefit we offer is geared toward helping you reach your
            goal.
          </p>
          <div className="mx-auto max-w-7xl">
            <CommunityBenotGrid />
          </div>
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

        <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">
            Never work solo. <br />
            <span className="text-primary">Make progress</span> with people like
            you.
          </h2>
          <div className="max-w-5xl py-8 text-2xl font-semibold">
            <p className="mt-2 pb-8 text-left font-semibold text-muted-foreground">
              Being an immigrant in America can be lonely. Applying for a talent
              visa only amplifies the loneliness.
            </p>
            <p className="mt-2 pb-8 text-left font-semibold text-muted-foreground">
              So we designed unshackled.club to be the ONE place you can go to
              any day and get what you need - whether that is connecting with
              another aspirant, speaking to a past recipient, consulting with a
              top lawyer, or getting a list of competitions to judge.
            </p>
            <p className="mt-2 pb-8 text-left font-semibold text-muted-foreground">
              Become a member today and start your journey. 🚀
            </p>
          </div>
        </section>

        <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">
            Join <span className="text-primary">450+</span> ambitious immigrants
          </h2>

          <PricingGrid />
        </section>

        <section className="mx-auto my-8 mt-24 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">
            To put things into <span className="text-primary">perspective</span>{" "}
            for you
          </h2>

          <div className="m-8 grid max-w-7xl grid-cols-3 gap-4  p-4">
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">1-hour lawyer consultation costs</h3>
              <h3 className="py-6 text-3xl text-primary">$500</h3>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">1-hour EB-1 recipient consultation costs </h3>
              <h3 className="py-6 text-3xl text-primary">$250</h3>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">An online course on EB-1 costs</h3>
              <h3 className="py-6 text-3xl text-primary">{">$1500"}</h3>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">A co-working membership costs</h3>
              <h3 className="py-6 text-3xl text-primary">$250/month</h3>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">A decent gym membership costs</h3>
              <h3 className="py-6 text-3xl text-primary">$80/month</h3>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-8 text-center text-2xl font-bold">
              <h3 className="">Forbes Tech Council membership costs</h3>
              <h3 className="py-6 text-3xl text-primary">$250/month</h3>
            </div>
          </div>
        </section>

        <section className="mx-auto my-4 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
          <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold">
            Not ready to commit yet?
          </h2>
          {/* TODO: Add form here to get free courses */}
        </section>

        <section className="mx-auto my-8 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg py-10">
          <div className="flex">
            <div className="flex basis-1/2 flex-col items-start justify-start gap-10 p-8 text-left">
              <h2 className="max-w-4xl text-3xl font-bold">
                About the founder
              </h2>
              <p className="text-xl font-bold text-muted-foreground">
                Hi there, <br />
                {"I'm Soundarya, founder of unshackled.club. :)"}
              </p>
              <p className="text-xl font-bold text-muted-foreground">
                I&apos;m a founder, 2x author, and ex-product manager from
                Salesforce. I graduated from Columbia University with a
                master&apos;s in Management Sciences.
              </p>
              <p className="text-xl font-bold text-muted-foreground">
                Honestly, I never dreamt of starting a community to help
                immigrants get talent visas. It happened because of an insane
                2.5-year journey that I went through to get my O-1A visa as a
                solo founder.
              </p>
              <p className="text-xl font-bold text-muted-foreground">
                By the end, I knew that if I had a community like this, it would
                have cut my time in half and made the journey less lonely - and
                a lot more enjoyable. That&apos;s why I built this.
              </p>
            </div>
            <div className="flex basis-1/2 items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f17882131b6fade744d32c_Group%208320.png"
                alt="Soundarya"
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto my-4 flex w-full max-w-4xl flex-col justify-center gap-4 rounded-lg p-10">
          <h2 className="mx-auto mb-10 max-w-5xl text-center text-4xl font-bold">
            The <span className="text-primary">Team</span> behind Unshackled
          </h2>
          <div className="flex gap-4 py-2">
            <div>
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f17c70b31e0313c78c7afd_Rectangle%202048.png"
                alt="Soundarya Soundararajan"
                width={270}
                height={270}
                className="rounded-lg"
              />
              <div className="flex flex-col py-4 text-center">
                <h3 className="text-lg font-bold text-primary">
                  Soundarya Soundararajan
                </h3>
                <p className="text-muted-foreground">
                  Founder & Author of <br />
                  Unshackled
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f17c702656dc2edb7ab076_Rectangle%202049.png"
                alt="Disha Brara"
                width={270}
                height={270}
                className="rounded-lg"
              />
              <div className="flex flex-col py-4 text-center">
                <h3 className="text-lg font-bold text-primary">Disha Brara</h3>
                <p className="text-muted-foreground">
                  Head of Sales,
                  <br /> unshackled.club
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f17c706b521a73c8e044ca_Rectangle%202050.png"
                alt="Bhuvan Shakthi"
                width={270}
                height={270}
                className="rounded-lg"
              />
              <div className="flex flex-col py-4 text-center">
                <h3 className="text-lg font-bold text-primary">
                  Bhuvan Shakthi
                </h3>
                <p className="text-muted-foreground">
                  Sales & Operations Associate,
                  <br /> unshackled.club
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto flex gap-4 py-2">
            <div>
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f17c70a11527cf20c20384_Rectangle%202051.png"
                alt="Mahantesh NG"
                width={270}
                height={270}
                className="rounded-lg"
              />
              <div className="flex flex-col py-4 text-center">
                <h3 className="text-lg font-bold text-primary">Mahantesh NG</h3>
                <p className="text-muted-foreground">
                  Designer,
                  <br /> unshackled.club
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/660fea73a27fc462e8254a93_Unshackled%20Team%20Story-Arjun%20Kamath%201-p-500.png"
                alt="Arjun Kamath"
                width={270}
                height={270}
                className="rounded-lg"
              />
              <div className="flex flex-col py-4 text-center">
                <h3 className="text-lg font-bold text-primary">Arjun Kamath</h3>
                <p className="text-muted-foreground">
                  Community Head,
                  <br /> unshackled.club
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto my-8 flex w-full max-w-7xl flex-col items-center justify-center gap-4 py-10">
          <h2 className="max-w-4xl text-4xl font-bold">
            Frequently asked questions
          </h2>

          <div className="flex w-full flex-col">
            <CommunityFaq />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
