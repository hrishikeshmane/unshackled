import Header from "@/components/elements/header";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <main>
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
                <Input />
                <Input />
                <Button className="w-full">Get started</Button>
              </div>
            </div>
            <div className="basis-1/2 rounded-lg bg-card p-8">a</div>
          </div>
        </section>

        <section className="my-4">
          <div className="mx-auto flex w-full max-w-7xl gap-4 p-4">
            <div className="basis-1/2 rounded-lg bg-card p-8">a</div>
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
                <Input />
                <Input />
                <Button className="w-full">Get started</Button>
              </div>
            </div>
          </div>
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
                <Input />
                <Input />
                <Button className="w-full">Get started</Button>
              </div>
            </div>
            <div className="basis-1/2 rounded-lg bg-card p-8">a</div>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
