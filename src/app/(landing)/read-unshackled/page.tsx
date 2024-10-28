import Image from "next/image";
import React from "react";
import Footer from "~/components/landing-page/footer";
import ReadHeroSection, {
  ReadHeroSectionCTAButtons,
} from "~/components/landing-page/read-hero";

export const metadata = {
  title: "Read the first book that makes U.S. immigration fun.",
  description:
    "Unshackled is the first book that breaks down U.S. immigration for the masses, with gripping stories and beautiful visuals. Some say it reads like “a thriller novel.”",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const Page = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <ReadHeroSection />
      <section className="mx-auto my-16 flex w-full max-w-7xl flex-col justify-center">
        <h2 className="text-center text-4xl font-bold">
          Read the <span className="text-primary">first book</span> that
          simplifies legal immigration <br></br> with beautiful visuals &
          gripping stories.
        </h2>
        <div className="flex w-full flex-col gap-2 py-8">
          <div className="my-2 flex flex-col-reverse gap-2 md:flex-row">
            <div className="flex basis-1/2 flex-col rounded-lg bg-card p-10">
              <h2 className="text-3xl font-bold">1. Who is it for?</h2>
              <ol className="ml-6 flex list-disc flex-col items-start gap-4 py-8 text-left text-xl font-semibold text-muted-foreground">
                <li>
                  You&apos;re a talented employee aiming for an O-1A
                  extraordinary visa
                </li>
                <li>
                  You&apos;re a proactive student on F-1 wanting to know all
                  your options
                </li>
                <li>
                  You&apos;re an aspiring founder restless to start your own
                  business
                </li>
                <li>
                  You&apos;re an expert in your field ready to self-petition
                  your green card
                </li>
                <li>Or, you want alternatives to the endless H-1B lottery</li>
              </ol>
            </div>
            <div className="flex basis-1/2 items-center justify-center">
              <Image
                src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/feat-1.webp"
                alt="alt"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="my-2 flex flex-col-reverse gap-2 md:flex-row">
            <div className="flex basis-1/2 flex-col rounded-lg bg-card p-10">
              <h2 className="text-3xl font-bold">
                2. What&apos;s inside the book?
              </h2>
              <ol className="ml-6 flex list-disc flex-col items-start gap-4 py-8 text-left text-xl font-semibold text-muted-foreground">
                <li>
                  Gripping stories of real immigrants that keeps you glued to
                  the pages
                </li>
                <li>Expert guidance on navigating every visa path out there</li>
                <li>Beautiful visuals to make the complex = simple</li>
                <li>
                  History of immigration policy, sprinkled with BTS from the
                  White House
                </li>
                <li>
                  And, a handy mind map that guides you on how to use the book
                </li>
              </ol>
            </div>
            <div className="flex basis-1/2 items-center justify-center ">
              <Image
                src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/feat-2.webp"
                alt="alt"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="my-2 flex flex-col-reverse gap-2 md:flex-row">
            <div className="flex basis-1/2 flex-col rounded-lg bg-card p-10">
              <h2 className="text-3xl font-bold">
                3. What&apos;s on top of the book?
              </h2>
              <ol className="ml-6 flex list-disc flex-col items-start gap-4 py-8 text-left text-xl font-semibold text-muted-foreground">
                <li>O-1/EB-1 profile building tracker</li>
                <li>List of 30+ grants & fellowships</li>
                <li>6 sample recommendation letters</li>
                <li>Top VC funds that support immigrants</li>
              </ol>
            </div>
            <div className="flex basis-1/2 items-center justify-center ">
              <Image
                src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/feat-3.webp"
                alt="alt"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="my-2 flex flex-col-reverse gap-2 md:flex-row">
            <div className="flex basis-1/2 flex-col rounded-lg bg-card p-10">
              <h2 className="text-3xl font-bold">4. Why write this?</h2>
              <p className="py-4 text-xl font-semibold text-muted-foreground">
                The immigration system in the United States is outdated by 33
                years.
              </p>
              <ol className="ml-6 flex list-disc flex-col items-start gap-4 py-4 text-left text-xl font-semibold text-muted-foreground">
                <li>0% chance for start up visa</li>
                <li>More than 1 million immigrant wait</li>
                <li>10% chance of H-1B</li>
              </ol>
              <p className="py-4 text-xl font-semibold text-muted-foreground">
                Yet, despite these constraints, immigrats have done{" "}
                <span className="text-primary">extraordinary </span>things.
              </p>
              <p className="py-4 text-xl font-semibold text-muted-foreground">
                With <span className="text-primary">Unshackled</span>, we want
                to lower the barrier so you can too.
              </p>
            </div>
            <div className="flex basis-1/2 items-center justify-center ">
              <Image
                src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/feat-4.webp"
                alt="alt"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <Image
          src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/book-3.webp"
          alt="book chapter image 2"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </section>

      <section className="relative flex flex-col justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <h2 className="my-8 mt-5 text-center text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight">
          Our Team
        </h2>
        <div className="mx-auto mb-20 grid w-full max-w-7xl grid-cols-2 grid-rows-2 gap-10 px-6 md:grid-cols-4">
          <div className="col-start-1 md:col-start-2">
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/team/Soundarya%20Balasubramani.png?raw=true"
              alt="Soundarya Soundararajan"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">
                Soundarya Soundararajan
              </h3>
              <p className="text-muted-foreground">Author</p>
            </div>
          </div>
          <div className="col-start-2 md:col-start-3">
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/team/Soundarya%20Soundararajan.webp"
              alt="Sameer Khedekar"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">
                Sameer Khedekar
              </h3>
              <p className="text-muted-foreground">Author</p>
            </div>
          </div>

          <div className="col-start-1">
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/team/Rishabh%20Singh.webp"
              alt="Rishabh Singh"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">Rishabh Singh</h3>
              <p className="text-muted-foreground">Design & Contributor</p>
            </div>
          </div>
          <div className="col-start-2">
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/team/Komal%20Telagavi.webp"
              alt="Komal Telagavi"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">Komal Telagavi</h3>
              <p className="text-muted-foreground">Design & Illustrator</p>
            </div>
          </div>
          <div className="col-start-1 md:col-start-3">
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/team/Ben%20Merill.webp"
              alt="Ben Merill"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">Ben Merill</h3>
              <p className="text-muted-foreground">Researcher & Contributor</p>
            </div>
          </div>
          <div className="col-start-2 md:col-start-4">
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/team/Anaik%20Alcasas.webp"
              alt="Anaik Alcasas"
              width={270}
              height={270}
              className="rounded-lg"
            />
            <div className="flex flex-col py-4 text-center">
              <h3 className="text-lg font-bold text-primary">Anaik Alcasas</h3>
              <p className="text-muted-foreground">Editor</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        <Image
          src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/book-4.webp"
          alt="book chapter image with cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="scale-110 md:scale-100"
        />
      </div>

      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="my-8 mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight">
              We spent <span className="text-primary">9 months</span> and{" "}
              <span className="text-primary">2000+ hours</span>
            </h2>
            <Image
              src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/book-5.webp"
              alt="us working on the book"
              width={1220}
              height={567}
              className="my-14"
            />
            <p className="my-4 text-lg font-semibold text-muted-foreground">
              You moved to this country for a better life, where
              &ldquo;better&rdquo; could mean high-quality education, a dream
              job, or even a diverse society. Our hope with Unshackled is to
              give you all the help you need to thrive in your new life. We hope
              you enjoy reading the book as much as we enjoyed creating it.
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight">
              ... and now you can buy it in less than{" "}
              <span className="text-primary">2 minutes</span>.
            </h2>

            <ReadHeroSectionCTAButtons />
          </div>
        </div>
      </section>

      <div className="w-full">
        <Image
          src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/book/book-6.webp"
          alt="book chapter images with cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "50%", height: "auto", margin: "4rem auto" }}
          className="scale-150 md:scale-100"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
