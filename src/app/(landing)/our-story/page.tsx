import Image from "next/image";
import Link from "next/link";
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
              Soundarya, Rathnakumar (RK), and Nikin here. We’re the founders of
              Unshackled and{" "}
              <Link
                className="text-primary underline"
                href={"https://greencard.inc/"}
              >
                Greencard Inc.
              </Link>{" "}
              {":)"}
              {/* {
                "Soundarya, Rathnakumar (RK), and Nikin here. We’re the founders of Unshackled and Greencard Inc. :)"
              } */}
            </p>
            <p className="text-xl font-bold text-muted-foreground">
              None of us imagined building a startup to help immigrants and
              talent visa aspirants in America. It happened through a series of
              events that left us feeling frustrated and disillusioned with the
              immigration system — wanting to make it better for others like
              you.
            </p>
            <p className="text-xl font-bold text-muted-foreground">
              Check out the story below 👇
            </p>
          </div>
          <div className="flex basis-1/2 items-center justify-center">
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/our-story/our-story.png?raw=true"
              alt="Soundarya"
              width={500}
              height={500}
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
