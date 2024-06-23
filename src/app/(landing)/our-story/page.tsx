import Image from "next/image";
import React from "react";
import Footer from "~/components/landing-page/footer";
import StoryStartedTimeline from "~/components/landing-page/story-started-timeline";

const StoryPage = () => {
  return (
    <div className="lex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg py-28">
        <div className="flex">
          <div className="flex basis-1/2 flex-col items-start justify-start gap-10 p-8 text-left">
            <h2 className="max-w-4xl text-5xl font-bold">Our Story</h2>
            <p className="text-xl font-bold text-muted-foreground">
              Hi there, <br />
              {"I'm Soundarya, founder of unshackled.club. :)"}
            </p>
            <p className="text-xl font-bold text-muted-foreground">
              Honestly, I never dreamt of starting a community to help
              immigrants get talent visas. It happened because of an insane
              2.5-year journey that I went through to get my O-1A visa as a solo
              founder.
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
      <section>
        <StoryStartedTimeline />
      </section>
      <Footer />
    </div>
  );
};

export default StoryPage;
