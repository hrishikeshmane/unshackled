import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  JoinTheClubForm,
  StartHereForm,
} from "~/components/landing-page/convertkit-forms";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col bg-[#F5F9FF]">
      <div>
        <HeroSection />

        <section className="mx-auto my-8 flex w-full justify-center">
          <h2 className="text-4xl font-bold">Here’s how we help you</h2>
        </section>
        <section className="my-4">
          <div className="mx-auto flex w-full max-w-7xl gap-4 p-4">
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold text-primary">
                Get started
              </h2>
              <p className="text-lg font-bold text-muted-foreground">
                If you&apos;re hearing the term &quot;talent visas&quot; for the
                first time, head over here and go through our free, 5-day
                course. No legal jargon.
              </p>
              <div className="flex flex-col gap-4 py-4">
                <StartHereForm />
              </div>
            </div>
            <div className="flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66072884f1d9b815a0b8fa54_1-p-800.png"
                alt="Newsletter sample image"
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>

        <section className="my-4">
          <div className="mx-auto flex w-full max-w-7xl gap-4 p-4">
            <div className="flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/660728c0e47b67010e851002_2-p-1080.png"
                alt="Unshackled platform sample image"
                width={550}
                height={550}
              />
            </div>
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold text-primary">
                Join the club
              </h2>
              <p className="text-lg font-bold text-muted-foreground">
                If you&apos;ve decided to apply for the O-1A, EB-1A, or EB-2 NIW
                visa, and need a roadmap to get there, sign up below & get a
                personal invite to join our paid community.
              </p>
              <div className="flex flex-col gap-4 py-4">
                <JoinTheClubForm />
              </div>
            </div>
          </div>
        </section>

        <section className="my-4">
          <div className="mx-auto flex w-full max-w-7xl gap-4 p-4">
            <div className="basis-1/2 bg-white p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold text-primary">
                Love reading books?
              </h2>
              <p className="text-lg font-bold text-muted-foreground">
                If you&apos;re still a student on F-1 or just want to understand
                all your work visa options, head over below and get
                &quot;Unshackled.&quot; Some say it &quot;reads like a thriller
                novel.&quot;😉
              </p>
              <div className="my-auto flex h-full w-full flex-col items-center justify-center gap-4 py-4">
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
            <div className="flex basis-1/2 items-center justify-center rounded-lg p-8">
              <Image
                src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66092281d4cb0876d08742fb_Rectangle%202075-p-500.png"
                alt="Book Cover image"
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto my-4 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
          <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold text-primary">
            Don’t waste your time and money trying to keep up with U.S.
            immigration.
          </h2>
          <p className="mx-auto max-w-4xl text-center text-lg font-bold text-muted-foreground">
            Join 15,000+ immigrants who get a careful curation of breaking news,
            free webinar invites & latest trends on immigration every week.
            Reading time: 5 minutes.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <JoinTheClubForm />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
