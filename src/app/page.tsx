import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import JoinNewsLetterDialog from "~/components/elements/JoinNewsLetterDialog";
import {
  JoinNewsletterForm,
  StartHereForm,
} from "~/components/landing-page/convertkit-forms";
import { siteConfig } from "~/lib/config";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col bg-[#F5F9FF]">
      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="http://go.readunshackled.com/unshackled-uac"
          className="md:text-md sticky top-16 z-50 flex h-10 w-full cursor-pointer items-center justify-center bg-primary text-center text-sm font-semibold text-primary-foreground"
        >
          Attend the LARGEST conference for high-skilled immigrants in America
          [Aug 15-16, 2025]
        </Link>
        <HeroSection />

        <section className="mx-auto my-8 flex w-full justify-center">
          <h2 className="text-4xl font-bold">Here’s how we help you</h2>
        </section>
        <section className="my-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-4 p-4 md:flex-row">
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold leading-[4rem] text-primary">
                Get started
              </h2>
              <p className="text-xl font-bold leading-8 text-muted-foreground">
                If you&apos;re hearing the term &quot;talent visas&quot; for the
                first time, head over here and go through our free, 5-day Intro
                course. No legal jargon.
              </p>
              <div className="flex flex-col gap-4 py-4">
                <StartHereForm />
              </div>
            </div>
            <div className="relative flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/landing/phone-slant.png?raw=true"
                alt="Newsletter sample image"
                width={400}
                height={400}
                // className="relative"
              />
              <div className="absolute left-16 top-0 max-w-[16rem] space-y-2 rounded-md bg-card p-4 text-xs">
                <p>Day 1: So, what are talent visas?</p>
                <p>
                  Quite simply, talent visas are a type of visa given to
                  immigrants based on their talent.
                </p>
                <p>
                  There are 5 categories of talent visas: O-1A, O-1B, EB-1A,
                  EB-1B, and EB-2 NIW (National Interest Waiver).
                </p>
              </div>
              <div className="absolute bottom-5 right-16 max-w-56 space-y-2 rounded-md bg-card p-4 text-xs">
                <blockquote>
                  &quot;I literally stayed up till 3 AM finishing this course. I
                  was pretty hopeless about my shot at the O-1 thinking my
                  profile isn&apos;t good enough, but now I have some
                  hope.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="my-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 md:flex-row">
            <div className="relative flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/landing/circle-platform.png?raw=true"
                alt="Unshackled platform sample image"
                width={550}
                height={550}
              />
              <div className="absolute -left-20 bottom-2 hidden max-w-[15rem] space-y-2 rounded-md bg-card p-4 text-xs md:block">
                <p className="font-semibold text-primary">
                  Imran Khan, RAN Engineer @ Samsung
                </p>
                <blockquote>
                  &quot;I joined the community only a few weeks ago. I&apos;ve
                  already been able to book a free call with an EB-2 NIW
                  recipient, who has now become a mentor of mine that I talk to
                  regularly!&quot;
                </blockquote>
              </div>
            </div>
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold leading-[4rem] text-primary">
                Join the club
              </h2>
              <p className="text-xl font-bold leading-8 text-muted-foreground ">
                If you&apos;ve decided to apply for the O-1A, EB-1A, or EB-2 NIW
                visa, and need a roadmap to get there, sign up below & get a
                personal invite to join our paid community.
              </p>
              <div className="flex flex-col gap-4 py-4">
                <Link href={"/community"}>
                  <Button size={"lg"} className="mt-10 w-full">
                    Become a Member
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="my-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-4 p-4 md:flex-row">
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold leading-[4rem] text-primary">
                Love reading books?
              </h2>
              <p className="text-xl font-bold leading-8 text-muted-foreground">
                If you&apos;re still a student on F-1 or just want to understand
                all your work visa options, head over below and get
                &quot;Unshackled.&quot; Some say it &quot;reads like a thriller
                novel.&quot;😉
              </p>
              <div className="my-auto flex flex-col items-center justify-center gap-4 pt-5">
                <Link
                  href={
                    "https://www.amazon.com/dp/B0C55LNV7B/ref=sr_1_1?keywords=unshackled+soundarya&qid=1683996713&sprefix=unshackled+so%2Caps%2C364&sr=8-1"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full">Buy on Amazon</Button>
                </Link>
                <Button
                  variant={"outline"}
                  className="b-2 w-full border-primary"
                >
                  Bulk orders on Website
                </Button>
              </div>
            </div>
            <div className="relative flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/landing/unshackled-hard-cover-book.png?raw=true"
                alt="Book Cover image"
                width={300}
                height={300}
              />
              <div className="absolute -top-16 left-0 max-w-[16rem] space-y-2 rounded-md bg-card p-4 text-xs md:top-2 ">
                <p className="font-semibold text-primary">
                  Apurv Gautham, Incoming CMU Student
                </p>
                <blockquote>
                  &quot;My first purchase in USA! Except for Harry Potter and
                  the Deathly Hallows 2 movie, this book is the most anticipated
                  thing in my life. Thank you for putting in effort to write
                  this book, Soundarya and Sameer. 😊&quot;
                </blockquote>
              </div>
              <div className="absolute -bottom-8 right-0 max-w-[16rem] space-y-2 rounded-md bg-card p-4 text-xs md:bottom-2 ">
                <p className="font-semibold text-primary">
                  Anurupa Sinha, Tech Founder
                </p>
                <blockquote>
                  &quot;Reading this book was a pivotal moment for me. Not only
                  did it give me the clarity to navigate my entrepreneurial
                  journey, it also came with stories of others who&apos;d done
                  this before. Honestly, I wish this book was given to me along
                  with my visa stamp at the US consulate.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto my-4 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
          <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[4rem] text-primary">
            Don’t waste your time and money trying to keep up with U.S.
            immigration.
          </h2>
          <p className="mx-auto max-w-4xl text-center text-2xl font-bold leading-8 text-muted-foreground ">
            {`Join ${siteConfig.newsletterCount} immigrants who get a careful curation of breaking news,
            free webinar invites & latest trends on immigration every week.
            Reading time: 5 minutes.`}
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <JoinNewsletterForm />
          </div>
        </section>
        <JoinNewsLetterDialog />
      </div>
      <Footer />
    </div>
  );
}
