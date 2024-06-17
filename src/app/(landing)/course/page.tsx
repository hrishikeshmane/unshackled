import Image from "next/image";
import React from "react";
import Footer from "~/components/landing-page/footer";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";

const page = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <div className="mx-auto  flex w-full max-w-7xl p-8 py-20">
        <div className="basis-1/2  p-4">
          <h1 className="text-5xl font-bold">
            A <span className="text-primary">5-day free course</span> on talent
            visas in America
          </h1>
          <div className="my-8 flex flex-col gap-6 bg-card p-4">
            <Input></Input>
            <Input></Input>
            <Button>Get started</Button>
          </div>
        </div>
        <div className="flex basis-1/2 items-center justify-center ">
          <Image
            src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65f2d6d098fbff9c6ee0a7ce_Rotated%20right.png"
            alt="Course page image"
            width={450}
            height={450}
          />
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl py-10 text-center">
        <h2 className="text-4xl font-bold">
          Escape the H-1B lottery.{" "}
          <span className="text-primary">
            Empower your career with a talent visa.
          </span>
        </h2>
        <div className="my-6 flex flex-col gap-8">
          <p className="text-2xl font-semibold text-muted-foreground">
            The H-1B (as you know) lets you work in America based on luck.
            <br />
            Talent visas let you work in America based on your talent.
          </p>
          <p className="text-2xl font-semibold text-muted-foreground">
            Sadly, very few people know about them,
            <br />
            and even fewer understand exactly what they are.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl py-12 text-center">
        <h2 className="text-4xl font-bold">
          Our course will teach you <span className="text-primary">what</span>{" "}
          they are, <br />
          <span className="text-primary">who</span> should apply, & its{" "}
          <span className="text-primary">requirements.</span>
        </h2>
        <div className="my-6 flex flex-col gap-8">
          <p className="text-2xl font-semibold text-muted-foreground">
            The H-1B (as you know) lets you work in America based on luck.
            <br />
            Talent visas let you work in America based on your talent.
          </p>
          <p className="text-2xl font-semibold text-muted-foreground">
            Sadly, very few people know about them,
            <br />
            and even fewer understand exactly what they are.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl py-10 text-center">
        <h2 className="text-4xl font-bold">
          No boring legal jargon. Watch 5 short videos.
        </h2>
        <div className="my-6 flex flex-col gap-8">
          <p className="text-2xl font-semibold text-muted-foreground">
            Sign up and start taking control of your future in America. 👇
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl rounded-lg bg-card p-16 text-center">
        <h2 className="text-4xl font-bold">
          Know the what, who, and why of talent visas in 5 short videos.{" "}
          <span className="text-primary">No legal jargon</span>.
        </h2>
        {/* TODO: FORM HERE */}
      </section>

      <Footer />
    </div>
  );
};

export default page;
