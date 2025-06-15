/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../elements/logo";
import { Instagram, Linkedin, LucideYoutube } from "lucide-react";
import BecomeASeller from "~/app/marketplace/_components/become-a-seller";
import { api } from "~/trpc/server";
import { type IStore } from "@/server/db/schema";

export default async function Footer() {
  // const stores = await api.store.getStores({ live: true });
  const stores = [];

  return (
    <footer className="mt-20 bg-secondary py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-around">
          <div className="max-w-3xl">
            <Logo />
            <p className="mt-4 text-lg">
              Escape the H-1B lottery. Empower your career with a talent visa.
            </p>
            <a href="#" className="mt-2 block">
              hi@unshackled.club
            </a>
            <div className="mt-4 flex items-baseline space-x-4 text-primary">
              <Link
                href="https://www.linkedin.com/company/readunshackled/"
                target={"_blank"}
                rel={"noreferrer"}
              >
                <Linkedin />
              </Link>
              <Link
                href="https://www.instagram.com/readunshackled/"
                target={"_blank"}
                rel={"noreferrer"}
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.youtube.com/@unshackledclub"
                target={"_blank"}
                rel={"noreferrer"}
              >
                <LucideYoutube />
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Disclaimer: The information provided on this website is for
              general informational purposes only and should not be considered
              legal advice. We make no warranties regarding the accuracy,
              completeness, or reliability of this information. We are not
              liable for any loss or damage resulting from the use of this
              website.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              &copy; {`${new Date().getUTCFullYear()} `} unshackled.club
            </p>
          </div>
          <div className="mt-8 flex w-full flex-auto flex-col gap-6 lg:mt-0 lg:max-w-[30rem]">
            <Link href="/community" className="hidden w-full lg:block">
              <Button size={"lg"} className=" hidden w-full lg:block">
                Become a member
              </Button>
            </Link>
            <div className="mx-auto grid grid-cols-2 justify-end gap-10 md:grid-cols-2 md:gap-10 lg:mx-0">
              <div className="col-span-1">
                <h3 className="text-lg font-medium">Site</h3>
                <nav className="mt-4 space-y-4 text-base">
                  <Link href="#" className="block  " prefetch={false}>
                    Home
                  </Link>
                  {/* <Link href="#" className="block  " prefetch={false}>
                    Start Here
                  </Link> */}
                  {/* <Link href="#" className="block  " prefetch={false}>
                    Find top lawyers
                  </Link> */}
                  <Link
                    href="/read-unshackled"
                    className="block  "
                    prefetch={false}
                  >
                    Read Unshackled
                  </Link>
                  <Link href="/newsletter" className="block  " prefetch={false}>
                    Newsletter
                  </Link>
                  {/* <Link
                    href="/find-lawyers"
                    className="block  "
                    prefetch={false}
                  >
                    Find Lawyers
                  </Link> */}
                  <Link href="/course" className="block  " prefetch={false}>
                    Course
                  </Link>
                  <Link href="/copilot" className="block  " prefetch={false}>
                    EB1 Copilot
                  </Link>
                  <Link href="/refer" className="block  " prefetch={false}>
                    Refer
                  </Link>
                  {/* <Link href="#" className="block  " prefetch={false}>
                    Our story
                  </Link> */}

                  {/* <Link href="#" className="block  " prefetch={false}>
                    Get in touch
                  </Link> */}
                </nav>
              </div>
              <div className="col-span-1">
                <h3 className="text-lg font-medium">Legal</h3>
                <nav className="mt-4 space-y-4">
                  <Link
                    href="https://soundarya.notion.site/Terms-of-Service-f650de0ceb1e4f61b1bbca0963ca81fc"
                    target="blank"
                    className="block  "
                    prefetch={false}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="https://soundarya.notion.site/Privacy-Policy-fae09e978c3d4b09b070182e64811729"
                    className="block"
                    target="blank"
                    prefetch={false}
                  >
                    Privacy Policy
                  </Link>
                </nav>

                {/* <div className="my-12 block md:hidden">
                  <MarketplaceLinks stores={stores} />
                </div> */}
              </div>
              {/* <div className="col-span-1 hidden md:block">
                <MarketplaceLinks stores={stores} />
              </div> */}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          {/* <Button variant="ghost" className="rounded-full p-3">
            <ArrowUpIcon className="h-6 w-6 text-primary" />
          </Button> */}
        </div>
      </div>
    </footer>
  );
}

const MarketplaceLinks = ({ stores }: { stores: IStore[] }) => {
  return (
    <>
      <h3 className="text-lg font-medium">Marketplace</h3>
      <nav className="mt-4 space-y-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/marketplace/${store.id}`}
            className="block"
          >
            {store.name}
          </Link>
        ))}
        <BecomeASeller />
      </nav>
    </>
  );
};

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
