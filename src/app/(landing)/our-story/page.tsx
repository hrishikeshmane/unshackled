import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "~/components/landing-page/footer";
import StoryStartedTimeline from "~/components/landing-page/story-started-timeline";

export const metadata = {
  title: "Read the story behind unshackled.club.",
  description:
    "Read the inside story of how Soundarya, Rathnakumar (RK), and Nikin started Unshackled and Greencard.inc",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const StoryPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg py-28">
        <div className="flex flex-col md:flex-row">
          <div className="flex basis-1/2 flex-col items-start justify-start gap-10 p-8 text-left">
            <h2 className="max-w-4xl text-5xl font-bold">Our Story</h2>
            <p className="text-xl font-bold text-muted-foreground">
              Hi there, <br />
              <Link
                href="https://www.linkedin.com/in/soundarya-balasubramani/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Soundarya
              </Link>
              ,{" "}
              <Link
                href="https://www.linkedin.com/in/rathanuday/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Rathnakumar (RK)
              </Link>
              , and{" "}
              <Link
                href="https://www.linkedin.com/in/ntharan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Nikin
              </Link>{" "}
              here. We’re the founders of Unshackled and{" "}
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
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/our-story/our-story-founders.jpeg?raw=true"
              alt="Soundarya"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className="px-4">
        <StoryStartedTimeline />
      </section>
      <Footer />
    </div>
  );
};

export default StoryPage;
