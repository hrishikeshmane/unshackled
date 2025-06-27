import React from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { LAWYER_INFO } from "../page";
import Link from "next/link";
import {
  ArrowTopLeftIcon,
  ArrowTopRightIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import Footer from "~/components/landing-page/footer";

interface PageParams {
  params: { slug: string };
}

const page = ({ params }: PageParams) => {
  const lawyer = LAWYER_INFO.find((l) => l.id.toString() === params.slug)!;

  return (
    <>
      <MaxWidthWrapper>
        <div className="bg-white py-10">
          <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product Details */}
            <div className="lg:max-w-lg lg:self-end">
              <div className="mt-4 flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="text-primary">{lawyer.name}</span>{" "}
                </h1>
                <p className="text-muted-foreground">
                  {lawyer.title} | {lawyer.experince}+ years of experience
                </p>
              </div>

              <section className="mt-4">
                <div className="flex items-center">
                  <Link
                    className="font-medium text-gray-900"
                    href={lawyer.linkedin ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInLogoIcon />
                  </Link>

                  <Link
                    href={lawyer.website ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground"
                  >
                    Website
                  </Link>
                </div>

                <div className="mt-4 space-y-6">
                  <h3 className="text-2xl">About me</h3>
                  <p className="text-base text-muted-foreground">
                    {lawyer.bio}
                  </p>

                  <h3 className="text-2xl">Who should book a call?</h3>
                  <p className="text-base text-muted-foreground">
                    {lawyer.whoShouldBookACall}
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                  <div className="flex gap-1">
                    {lawyer.visa.map((v) => (
                      <Badge key={v}>{v}</Badge>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-square rounded-lg">
                <Image
                  src={lawyer.img}
                  alt={`${lawyer.name}`}
                  className="h-full w-full object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>

            {/* add to cart part */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              {!!lawyer.consultLink && (
                <Link
                  href={lawyer.consultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="w-full py-1 text-center text-primary">
                    <s>{lawyer.strikePrice}</s> {lawyer.priceTitle}
                  </p>
                  {/* <Button
                    className="b-2 flex w-full items-center border-primary text-primary"
                    variant={"outline"}
                    size={"lg"}
                  >
                    {" "}
                    Book a consult
                    <ArrowTopRightIcon />
                  </Button> */}
                </Link>
              )}
              {!!lawyer.bookingInstruction && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl">Booking Instructions</h3>
                  {lawyer.bookingInstruction}
                </div>
              )}
            </div>
          </div>
        </div>
        <section className="mx-auto my-12 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
          <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[4rem] ">
            Want to get a free consult?{" "}
            <span className="text-primary">Become a member</span> of
            unshackled.club.
          </h2>
          <p className="mx-auto max-w-4xl text-center text-2xl font-bold leading-8 text-muted-foreground ">
            Premium members of unshackled.club get access to free profile
            evaluations with all the top lawyers listed above, and a lot more.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <Link href={"/community"}>
              <Button size={"lg"} className="scale-125">
                Become a Member
              </Button>
            </Link>
          </div>
        </section>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default page;
