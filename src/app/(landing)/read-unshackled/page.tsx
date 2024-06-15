import Image from "next/image";
import React from "react";
import Footer from "~/components/landing-page/footer";
import ReadHeroSection, {
  ReadHeroSectionCTAButtons,
} from "~/components/landing-page/read-hero";

const Page = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <ReadHeroSection />
      <section className="mx-auto my-16 flex w-full max-w-7xl justify-center">
        <h2 className="text-center text-4xl font-bold">
          Read the <span className="text-primary">first book</span> that
          simplifies legal immigration <br></br> with beautiful visuals &
          gripping stories.
        </h2>
        {/* { TODO: add grids for features} */}
      </section>

      <div className="w-full">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/660977e72c8e3c5d53276574_Unshackled_Book_Mockup-p-3200.png"
          alt="book chapter image 2"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <section className="relative flex flex-col justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <h2 className="my-8 mt-5 text-center text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight">
          Our Team
        </h2>
        <div className="mx-auto mb-20 grid w-full max-w-7xl grid-cols-4 grid-rows-2 gap-10">
          <div className="col-start-2">
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
              <p className="text-muted-foreground">Author</p>
            </div>
          </div>
          <div className="col-start-3">
            <Image
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc184d777e6eaf167f9439_Rectangle%202047.png"
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
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc185d267de660e1243889_t2.png"
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
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc185d31cf9a31366f4ba6_t3.png"
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
          <div className="col-start-3">
            <Image
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc185d54b325f0b07effd7_t4.png"
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
          <div className="col-start-4">
            <Image
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc185d6b2c0baaafbbdd6f_t5.png"
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
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66053d554d81a9b6abcfde29_Group%208321.png"
          alt="book chapter image with cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
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
              src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/65fc2055affa13bb084c9b14_img18.png"
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
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/6606d415bb4624996034c903_Rectangle%202067-p-1600.png"
          alt="book chapter images with cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "50%", height: "auto", margin: "4rem auto" }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
