import React from "react";
import Globe from "~/components/magicui/globe";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Footer from "~/components/landing-page/footer";

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const StudentPlanPage = () => {
  return (
    <div className="bg-[#F5F9FF]">
      <div className="flex min-h-screen w-full flex-col items-center">
        <section className="max-w-screen relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background px-40 pb-40 pt-8 md:pb-[24rem] md:shadow-xl">
          <h1 className="max-w-4xl text-center text-6xl font-bold text-primary">
            Your Guide to Success as an International Student
          </h1>
          <p className="pt-4 text-center text-lg text-muted-foreground">
            Navigate the Transition from F-1 Visa to Green Card with Unshackled
            Student Plan
          </p>
          <Globe className="top-52" />
          {/* <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" /> */}
        </section>

        <section className="flex max-w-6xl flex-col items-center py-28">
          <h2 className="max-w-4xl text-center text-5xl font-bold text-primary">
            Unlock Your American Dream as an International Student
          </h2>
          <p className="max-w-4xl pt-4 text-center text-lg text-muted-foreground">
            The Student Plan is your comprehensive guide to securing your EB-1A
            or O-1 visa, paving the way to success without needing a Ph.D.,
            patents, or research experience.
          </p>
          <div className="py-12">
            <BentoGrid className="lg:grid-rows-3">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPlanPage;
