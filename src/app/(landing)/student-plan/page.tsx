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
import { StudentPlanFaq } from "~/components/landing-page/student-plan-faq";
import { StudentPlanWaitlistForm } from "~/components/landing-page/convertkit-forms";

const features = [
  {
    Icon: FileTextIcon,
    name: "Video Courses",
    description:
      "Professional video courses from EB-1A green card awardee and founder of Greencard Inc.",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Step-by-Step Guides",
    description:
      "Detailed profile-building strategies for O-1 and EB-1A visa as a student",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Research Fellowship",
    description:
      "Colaborate with industry leaders on research and co-authoring impactful papers in your field",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Jobseeker workshop",
    description: "Navigate the job market with breeze with our experts",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Expert Sessions",
    description: "Live AMA session with experts in your field",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: BellIcon,
    name: "Startup workshop",
    description:
      "Learn how to build, launch, and grow your own business in the US with support from seasoned entrepreneurs and mentors.",
    href: "/",
    cta: "Learn more",
    background: <></>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
];

const StudentPlanPage = () => {
  return (
    <div className="flex w-full flex-col bg-[#F5F9FF]">
      <div className="flex w-full flex-col items-center">
        <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background px-4 pb-60 pt-8 md:pb-[24rem] md:shadow-xl">
          <h1 className="max-w-3xl text-center text-4xl font-bold text-primary md:text-6xl">
            Your Guide to Success as an International Student
          </h1>
          <p className="pt-4 text-center text-lg text-muted-foreground">
            Navigate the Transition from F-1 Visa to Green Card with Unshackled
            Student Plan
          </p>
          <Globe className="top-56" />
        </section>
      </div>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-28">
        <h2 className="max-w-4xl text-center text-3xl font-bold text-primary md:text-5xl">
          Unlock Your American Dream as an International Student
        </h2>
        <p className="max-w-4xl pt-4 text-center text-lg text-muted-foreground">
          The Student Plan is your comprehensive guide to securing your EB-1A or
          O-1 visa, paving the way to success without needing a Ph.D., patents,
          or research experience.
        </p>
        <div className="px-2 py-12">
          <BentoGrid className="grid-rows-6 md:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">
          FAQ
        </h2>
        <StudentPlanFaq />
      </section>

      <section className="mx-auto my-24 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
        <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[4rem] text-primary">
          Join the waitlist for the student plan
        </h2>
        <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
          <StudentPlanWaitlistForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentPlanPage;
