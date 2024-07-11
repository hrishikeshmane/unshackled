import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  // {
  //   question: "What's the cost of membership?",
  //   answer: (
  //     <>
  //       <p>We have simple three-tier pricing.</p>
  //       <p>
  //         - Pay $499 for an annual membership that renews after 12 months, if
  //         you&apos;re a current student. This is ideal for students who are just
  //         starting out and want to educate themselves to see if a talent visa is
  //         the right fit. Email us at hi@unshackled.club with proof of your
  //         current enrollment (through your LinkedIn profile) and we will share
  //         an exclusive coupon code with you!
  //       </p>
  //       ‍
  //       <p>
  //         - Pay $999 for an annual membership that renews after 12 months. This
  //         is ideal for immigrants who are in the early stages of their journey
  //         and need more time to build their profile and file an application.
  //       </p>
  //       ‍
  //       <p>
  //         - Pay $3999 for a white-glove tier that is invite-only and renews
  //         after 12 months. We plan to kick this off in June 2024 with 10
  //         aspirants who are further along in their EB-1A journey and want
  //         personalized guidance to reach the end goal.
  //       </p>
  //     </>
  //   ),
  // },
  {
    question: "What are the benefits of membership?",
    answer: (
      <>
        <p>Here are the immediate benefits you get the moment you join:</p>
        <p>
          - Access to a flagship course on talent visas that will walk you
          through everything you need to know about the O-1A, EB-1A, and EB-2
          NIW. A discussion forum where you can get any questions answered. - A
          biweekly accountability session where you get to meet other members of
          our community and make progress. - Regular workshops with immigration
          lawyers and past recipients. We ensure everyone’s questions get
          answered by the end of the call.
        </p>
        ‍
        <p>
          Here are the benefits you get access to the moment you finish our
          flagship course and contribute to the discussion forum:
        </p>
        ‍
        <p>
          - A database of resources curated over hundreds of hours. This
          includes a profile-building “Dream Tracker”, a masterclass video
          library, a list of competitions to judge to build your O-1/EB-1
          profile, a list of grants to apply to as a founder, and more. - A
          directory of 5+ immigration lawyers who all offer a free profile
          evaluation. Generally, initial consults with a lawyer are anywhere
          from $250-$500. - A directory of 10+ immigrant mentors who’ve already
          gotten a talent visa (O-1/EB-1/NIW) and have been through the process.
          Generally, these consults can cost anywhere from $100-$250.
        </p>
      </>
    ),
  },
  {
    question: "Who is this community for, ideally?",
    answer: (
      <>
        <p>
          Great question! This community is primarily meant for immigrants who
          aim for one of the four talent visas: O-1A, EB-1A, EB-1B, or EB-2 NIW.
          We did not add the O-1B in here since most of the resources in our
          community are geared toward an O-1A audience, specifically those from
          STEM and business fields.
        </p>
        <p>
          Our community is mainly filled with engineers, founders, product
          managers, leaders, and researchers.
        </p>

        <p>If that sounds like you, this is your space!</p>
      </>
    ),
  },
  {
    question: "How will this community help me in my O1A/EB1A/NIW journey?",
    answer: (
      <>
        <p>How will this community help me in my O1A/EB1A/NIW journey?</p>
        <p>
          First, you will save hundreds of hours of your time. We spent more
          than a year building relationships with lawyers, finding good
          immigrant mentors, and putting together resources within the community
          so you don’t have to start from scratch.
        </p>

        <p>
          Second, you will get access to high quality experts at the touch of a
          button. Each of the 10+ experts within our community has agreed to
          offer a free initial call/consult (generally worth $250-$500). You get
          your $250-$500 back the moment you book a single call.
        </p>
        <p>
          Third, you will have a support system in a really lonely process.
          While you may join our community for access to experts and resources,
          what you really end up getting is a lifelong network on incredibly
          high-caliber people who you can take support from.
        </p>
      </>
    ),
  },
  {
    question:
      "What is the difference between the Student and Annual membership?",
    answer: (
      <>
        <p>
          The Student Tier is meant for those who are currently
          bachelors/masters/PhD students in America. Given students are not
          earning yet, we want to lower the bar for them to be able to join our
          community. The Annual tier is meant for working professionals who are
          actively wanting to build their profiles and get an O1/EB1/NIW in the
          next 12-24 months.
        </p>
        ‍
        <p>
          Further, those in the Student tier will NOT have access to book free
          consults with immigration lawyers or past recipients of talent visas.
          This is a benefit reserved only for those in the Annual tier.
        </p>
        <p>
          If you&apos;re a student, begin with a Student tier and then upgrade
          to an
        </p>
      </>
    ),
  },
  {
    question: "What is the selection criteria for the White-glove tier?",
    answer: (
      <>
        <p>
          The white-glove tier is a new addition to our membership. It is meant
          for STEM and business professionals who already check off at least 2
          criteria in their EB-1A journey, and need one-on-one guidance from
          past recipients to reach the finish line.
        </p>
        <p>
          We will only choose 10 people for the initial cohort. We will be
          choosing people based on their industry, job role, years of
          experience, and what evidence they already have under their belt to
          secure an EB-1A.
        </p>
        <p>If you have questions on this, please email hi@unshackled.club.</p>
      </>
    ),
  },
  {
    question: "Why is there no monthly tier option?",
    answer: (
      <>
        <p>
          We thought about it, but decided against it for this reason: We only
          want immigrants who are serious and willing enough to invest at least
          a few hundred dollars to join our community. This way, we maintain a
          pool of highly invested members and talent visa aspirants.
        </p>
        <p>
          We recommend you start off with a Quarterly membership and then
          upgrade to an Annual one later on at a discount.
        </p>
      </>
    ),
  },
  {
    question: "Is this community entirely remote?",
    answer: (
      <>
        <p>
          Yes! Our members are spread across not just the United States, but
          also across the world. Most of our events and workshops happen
          virtually. Further, we record, edit and republish all of our events so
          you can watch them on-demand.
        </p>
        <p>
          We’ve also begun hosting events across key cities in the United
          States, including San Francisco and Seattle.
        </p>
      </>
    ),
  },
  {
    question: "At what times will the weekly sessions be held?",
    answer: (
      <>
        <p>
          We generally hold our events and workshops on Thursdays at 6:30 PM PST
          or Fridays at 8 AM PST (to accommodate all time zones). Further, we
          record, edit and republish all of our events so you can watch them
          on-demand.
        </p>
      </>
    ),
  },
  {
    question: "What's your refund policy?",
    answer: (
      <>
        <p>
          We do not offer any refunds. This is because the community is entirely
          remote and you have access to all the resources and experts the moment
          you purchase a membership.
        </p>
        <p>
          But please email us at hi@unshackled.club if you have any questions on
          membership benefits before you purchase it!
        </p>
      </>
    ),
  },
  {
    question: "I have more questions.",
    answer: (
      <>
        <p>
          We love questions! Please send over an email to hi@unshackled.club :)
        </p>
      </>
    ),
  },
];

export function CommunityFaq() {
  return (
    <Accordion type="single" collapsible className="my-6 w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-xl font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
