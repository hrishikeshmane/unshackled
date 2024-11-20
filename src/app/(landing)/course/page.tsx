import React from "react";
import { ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";
import HeroVideo from "~/components/landing-page/hero-video";
import Footer from "~/components/landing-page/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { siteConfig } from "~/lib/config";

const faqs = [
  {
    question: "Who is teaching this course?",
    answer: (
      <>
        <p>
          This course is taught by Attorney Allison Kranz. She is the Principal
          Partner at Lodestone Legal. With 15+ years of experience, she has
          filed 1000s of petitions. She has also advised Fortune 500 companies
          in immigration matters and her global immigration practice focuses on
          finding self-sponsored solutions.
        </p>
      </>
    ),
  },
  {
    question: 'What is the right "track" for me? How do I choose?',
    answer: (
      <>
        <p>Of course! Immigration is not a simple topic.</p>
        <p>
          <strong>
            If you're looking for ways to self-sponsor your green card and
            current don't have a priority date, we recommend looking at the
            EB-1A and EB-2 NIW tracks.
          </strong>{" "}
          The difference between the two tracks is this: EB-1A is a{" "}
          <em>first</em>-preference employment based green card category whereas
          the EB-2 NIW is a <em>second</em>-preference one. As of Nov 2024, the
          priority date for EB-1 categories for Indian nationals is 15th April,
          2022. On the other hand, the priority date for EB-2 categories for
          Indian nationals is 1st January, 2013. (IMPORTANT: The visa bulletin
          changes <em>every</em> month.{" "}
          <a
            href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Please check this link
          </a>{" "}
          for the latest one.)
        </p>
        <p>
          <strong>
            If you already have a priority date, originate from India/China, and
            want to get your green card faster, we recommend looking at the
            EB-1A track.
          </strong>{" "}
          We say this since the priority dates for EB-1A are currently the
          closest to present time. However, if you're not from India or China,
          we recommend you look at both the EB-1A and EB-2 NIW tracks.
        </p>
        <p>
          <strong>
            If you're looking to start a company or looking for an alternative
            to the H-1B, we recommend looking at the O-1A track.
          </strong>{" "}
          The O-1A is a temporary work visa (like the H-1B). It's a great option
          for founders, as well as those who want an alternative to the H-1B and
          have the right credentials.
        </p>
        <p>
          We hope that helped. None of this is legal advice. In the end, we
          recommend you consult a lawyer on the pathway that best fits your
          needs.
        </p>
      </>
    ),
  },
  {
    question: "I'm a student. Is there a scholarship available?",
    answer: (
      <>
        <p>Of course!</p>
        <p>We offer a 25% discount on courses exclusively for students.</p>
        <p>
          If you're currently a student, please email{" "}
          <a href="mailto:amulya@readunshackled.com">
            amulya@readunshackled.com
          </a>{" "}
          with proof of your student status (e.g. LinkedIn URL, I-20 dates, F1
          visa stamp dates, transcript, etc).
        </p>
        <p>
          P.S. You can also consider applying for the{" "}
          <a
            href="http://go.readunshackled.com/scholarship"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unshackled student scholarship
          </a>{" "}
          which gives you between 30-100% off on our community membership—which
          includes access to all three courses!
        </p>
      </>
    ),
  },
  {
    question: "I have more questions.",
    answer: (
      <>
        <p>
          Awesome! We'd love to hear from you at{" "}
          <a href="mailto:hi@readunshackled.com">hi@readunshackled.com</a>.
        </p>
      </>
    ),
  },
];

const pricingData = [
  {
    title: "EB-1A Track",
    price: "$299",
    description:
      "Best for immigrants on H-1B who are looking to self-sponsor their green card & get it within a few years.",
    features: ["24 lessons"],
    ctaText: "Get started",
    ctaLink: "http://go.readunshackled.com/course-eb1a",
  },
  {
    title: "O-1 Track",
    price: "$249",
    description:
      "Best for immigrants who want an alternative to H-1B or become a founder someday.",
    features: ["23 lessons"],

    ctaText: "Get started",
    ctaLink: "http://go.readunshackled.com/course-o1a",
  },
  {
    title: "EB-2 NIW Track",
    price: "$249",
    description:
      "Best for immigrants who have a master's degree & want to self-sponsor their green card and skip PERM certification.",
    features: ["17 lessons"],

    ctaText: "Get started",
    ctaLink: "http://go.readunshackled.com/course-niw",
  },
  {
    title: "Join Community",
    price: "$1199",
    originalPrice: "$999",
    description: `Choose this if you're looking to understand all your pathways in depth and join ${siteConfig.memberCount} aspirants`,
    features: ["60+ lessons"],
    ctaText: "Become a member",
    ctaLink: "http://go.readunshackled.com/membership ",
    highlight: true,
  },
];

const curriculum = [
  {
    category: "Introduction & Basics",
    openings: [
      {
        title: "Intro to talent visas: what and why?",
        location: "15 min",
        link: "#",
      },
      {
        title: "What goes into an EB1A application packet?",
        location: "20 min",
        link: "#",
      },
      {
        title: "Why your citizenship and country of origin matters",
        location: "15 min",
        link: "#",
      },
      {
        title: "Who should file this and why?",
        location: "15 min",
        link: "#",
      },
      {
        title: "Self-petitioning versus employer filing",
        location: "10 min",
        link: "#",
      },
    ],
  },
  {
    category: "Core Requirements & Evidence",
    openings: [
      {
        title: "Identifying your niche",
        location: "15 min",
        link: "#",
      },
      {
        title: "The 10 pillars & comparable evidence",
        location: "20 min",
        link: "#",
      },
      {
        title: "Deep dive into each pillar (Pillars 1-10)",
        location: "60 min",
        link: "#",
      },
      {
        title:
          "All the letters - Advisory, Expert Opinion, & Critical Capacity",
        location: "30 min",
        link: "#",
      },
    ],
  },
  {
    category: "Application Process",
    openings: [
      {
        title: "Choosing your best-fit lawyer",
        location: "15 min",
        link: "#",
      },
      {
        title: "Submitting your application",
        location: "15 min",
        link: "#",
      },
      {
        title: "Approval vs RFE vs NOID vs Denial",
        location: "20 min",
        link: "#",
      },
      {
        title: "Bringing your dependents",
        location: "10 min",
        link: "#",
      },
    ],
  },
  {
    category: "Post-Approval & Resources",
    openings: [
      {
        title: "Life after approval",
        location: "15 min",
        link: "#",
      },
      {
        title: "Your next steps",
        location: "15 min",
        link: "#",
      },
      {
        title: "BONUS: Interviews with past recipients",
        location: "30 min",
        link: "#",
      },
    ],
  },
];

const CourseHero = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* <Badge variant="outline">New Release</Badge> */}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Master talent visas with our in-depth, attorney-led course
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              50+ short-videos. Everything you need to know about EB-1A, O-1A
              and EB-2 NIW visas.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link href="#pricing">
                <Button className="w-full sm:w-auto">Join the course</Button>
              </Link>
            </div>
          </div>
          <Image
            src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/course/Group_8315-removebg.png?raw=true"
            alt="placeholder hero"
            className="max-h-96 w-full rounded-md object-cover"
            height={200}
            width={600}
          />
        </div>
      </div>
    </section>
  );
};

const CourseCurriculum = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-screen-lg">
          <div className="text-center lg:text-left">
            <h2 className="text-center text-4xl font-bold">
              Course curriculum for EB-1A
            </h2>
          </div>
          <div className="mx-auto mt-2 flex flex-col gap-10 md:mt-14">
            {curriculum.map((section) => (
              <div key={section.category} className="grid">
                <h2 className="border-b pb-4 text-xl font-bold">
                  {section.category}
                </h2>
                {section.openings.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <p className="font-semibold">{item.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export function CouseFaq() {
  return (
    <>
      <h2 className="text-center text-4xl font-bold">FAQ</h2>
      <Accordion type="single" collapsible className="my-6 w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-xl font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-lg">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

const CoursePricingGrid = () => {
  return (
    <section
      id="pricing"
      className="container mx-auto my-12 max-w-7xl px-6 py-8"
    >
      <h2 className="text-center text-4xl font-bold">
        Join and start the course today
      </h2>
      <div className="mt-16 grid gap-6 sm:grid-cols-1 md:grid-cols-4">
        {pricingData.map((tier, index) => (
          <div
            key={index}
            className={`flex transform flex-col rounded-lg ${
              tier.highlight ? "border-2 border-primary" : "border"
            } px-6 py-4 transition-colors duration-300 ${
              tier.highlight ? "relative" : ""
            }`}
          >
            <p className="pb-2 text-lg font-medium text-gray-800 dark:text-gray-100">
              {tier.title}
            </p>

            <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
              {tier.originalPrice && (
                <del className="text-muted-foreground">
                  {tier.originalPrice}
                </del>
              )}{" "}
              {tier.price}
            </h4>
            <div className="mt-2">
              {tier.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4">{tier.description}</p>
            <Link
              href={tier.ctaLink}
              target={tier.ctaLink.startsWith("http") ? "_blank" : "_self"}
              rel={tier.ctaLink.startsWith("http") ? "noreferrer" : undefined}
              className="mt-auto"
            >
              <Button
                variant={tier.highlight ? "default" : "outline"}
                className={`mt-10 w-full transform self-end rounded-md ${
                  tier.highlight ? "" : "border-primary"
                } px-4 py-2 font-medium tracking-wide transition-colors duration-300`}
              >
                {tier.ctaText}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

const MeetPeople = () => {
  const team = [
    {
      name: "Allison Kranz",
      designation: "Principal Partner at Lodestone Legal",
      image:
        "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/allison.png?raw=true",
      bio: "Allison is the Principal Partner at Lodestone Legal. With 15+ years of experience, she has filed 1000s of petitions. She has also advised Fortune 500 companies in immigration matters and her global immigration practice focuses on finding self-sponsored solutions.",
      email: "allison.kranz@lodestonelegal.com",
    },
    {
      name: "Soundarya Balasubramani",
      designation: "Author & Founder of Unshackled",
      image:
        "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/team/Soundarya%20Balasubramani.png?raw=true",
      bio: "Soundarya is the Author & Founder of Unshackled. She is an advocate for immigrant entrepreneurship and coaches high-skilled immigrants through complex U.S. visa processes. A storyteller at heart, Soundarya simplifies legal intricacies into accessible, actionable insights.",
      linkedin: "https://www.linkedin.com/in/soundarya-balasubramani/",
      instagram: "https://www.instagram.com/thecuriousmaverick/",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="my-8 text-center text-4xl font-bold">
        Meet your instructors
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {team.map((member) => (
          <Card
            key={member.name}
            className="flex flex-col overflow-hidden md:flex-row"
          >
            <div className="md:w-2/5">
              <Image
                width={300}
                height={300}
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:w-3/5">
              <CardHeader className="mb-4 p-0">
                <CardTitle className="mb-1 text-2xl">{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {member.designation}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <p className="mb-4 text-sm">{member.bio}</p>
                <div className="flex items-center gap-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:text-primary/80"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                      aria-label={`${member.name}'s Instagram profile`}
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CoursePage = () => {
  return (
    <div className="space-y-2">
      <CourseHero />
      <div className="mx-auto max-w-7xl ">
        <CourseCurriculum />
        <div className="mx-auto my-10 w-full items-center justify-center px-4">
          <h2 className="my-8 text-center text-4xl font-bold">
            Watch a sample lesson from EB-1A track
          </h2>
          <HeroVideo videoId="3fd1KDUtRrs" />
        </div>
        <CoursePricingGrid />
        <div className="mx-auto my-10 w-full items-center justify-center px-4">
          <h2 className="my-8 text-center text-4xl font-bold">
            Watch a sample lesson from O-1 track
          </h2>
          <HeroVideo videoId="p_IvOKV0PM0" />
        </div>
        <div className="flex w-full flex-col px-4 py-8">
          <MeetPeople />
        </div>
        <div className="mx-4 flex w-full flex-col px-4 py-8">
          <CouseFaq />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
