import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import { FileTextIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    name: "Get questions answered by past recipients",
    description:
      "Take actionable advice from O-1A, EB-1A, and NIW recipients who've been there, done that - for free.",
    className: "col-span-3 border-primary border-4",
    background: (
      <div className="absolute right-2 flex h-full items-center justify-center">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/660889714532b935d414b988_Rectangle%202020-p-800.png"
          width={500}
          height={250}
          alt="Free Consulting"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_40%)] group-hover:scale-105 group-hover:[mask-image:linear-gradient(to_top,transparent_5%,#000_40%)]"
        />
      </div>
    ),
  },
  {
    name: "Free profile evaluation with top lawyers",
    description:
      "Save hundreds of $$$ and the stress of finding a trusted lawyer. We've done the vetting for you",
    className: "col-span-1",
    background: (
      <div className="absolute flex h-full w-full items-center justify-center">
        <Image
          src="https://media.licdn.com/dms/image/C4E03AQGadaj9NpqF4Q/profile-displayphoto-shrink_800_800/0/1517715524165?e=1726099200&v=beta&t=IiiTWh3jce8dDlAON8YJ5O91bDpH2wkvIH4JtNNGvh4"
          width={365}
          height={365}
          alt="Free Profile Evaluation"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-105 group-hover:[mask-image:linear-gradient(to_top,transparent_30%,#000_40%)]"
        />
      </div>
    ),
  },
  {
    name: "Monthly workshops with experts in your field",
    description:
      "Meet others like you, and get nuanced answers on your situation from experts who've been there, done that.",
    className: "col-span-2",
    background: (
      <div className="absolute right-2 flex h-full items-start justify-center">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66088a0c2a64b123be963466_11-p-800.png"
          width={500}
          height={250}
          alt="Free Consulting"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_80%)] group-hover:scale-105 group-hover:[mask-image:linear-gradient(to_top,transparent_5%,#000_80%)]"
        />
      </div>
    ),
  },
  {
    name: "The ultimate “profile-building” tracker",
    description:
      "Avoid overwhelm in gathering hundreds of pages of evidence. Use our Unshackled Dream Tracker template to document all your evidence.",
    className: "col-span-2",
    background: (
      <div className="absolute right-2 flex h-full items-start justify-center ">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66088b4176c375566c00df74_12-p-800.png"
          width={500}
          height={250}
          alt="Free Consulting"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_80%)] group-hover:scale-105 group-hover:[mask-image:linear-gradient(to_top,transparent_5%,#000_80%)]"
        />
      </div>
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Monthly “Ask Me Anything” with licensed attorney",
    description:
      "Don't waste money booking consults for simple questions. Attend our monthly webinar with a licensed attorney.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    name: "Success case studies of 10+ past recipients",
    description:
      "Dive deep into the insider stories of 10+ O1/EB1/NIW recipients - and exactly how they built their case.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            {/* <blockquote className="mt-2 text-xs">{f.body}</blockquote> */}
            <div className="flex items-center justify-center py-10">
              <FileTextIcon className="h-16 w-16 text-gray-500" />
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    name: "Flagship course on O 1A, EB-1A, & NIW visas in simple language",
    description:
      "Take the only course you'll need to master the requirements for an O-1A, EB-1A, and EB-2 NIW visa. Vetted by our lawyers.",
    className: "col-span-2",
    background: (
      <div className="absolute right-2 flex h-full items-start justify-center ">
        <Image
          src="https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66088bc70678d8241d06b1e0_13-p-1080.png"
          width={500}
          height={250}
          alt="Free Consulting"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_80%)] group-hover:scale-105 group-hover:[mask-image:linear-gradient(to_top,transparent_5%,#000_80%)]"
        />
      </div>
    ),
  },

  //   blank grid
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "/",
  //     cta: "Learn more",
  //     background: (
  //       <Calendar
  //         mode="single"
  //         selected={new Date(2022, 4, 11, 0, 0, 0)}
  //         className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
  //       />
  //     ),
  //   },
];

export function CommunityBenotGrid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
