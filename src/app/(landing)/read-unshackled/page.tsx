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
          <div className="col-start-2 h-52  bg-slate-300">1</div>
          <div className="col-start-3 h-52  bg-slate-300">2</div>
          <div className="col-start-1 h-52  bg-slate-300">a</div>
          <div className="h-52  bg-slate-300">a</div>
          <div className="h-52  bg-slate-300">a</div>
          <div className="h-52  bg-slate-300">a</div>
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
