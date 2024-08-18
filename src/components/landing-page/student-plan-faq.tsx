import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "I don’t have a Ph.D. or research experience?",
    answer: (
      <>
        <p>
          No worries! The Student Plan is tailored for students just like you.
          We focus on alternative routes and strategies that don’t require
          advanced degrees.
        </p>
      </>
    ),
  },
  {
    question: "I’m on OPT. Is this useful for me?",
    answer: (
      <>
        <p>
          The Student plan is ideal for students on OPT, providing guidance on
          transitioning to work visas and exploring Green Card options
        </p>
      </>
    ),
  },
  {
    question: "I’m not a STEM major. Can this plan still benefit me?",
    answer: (
      <>
        <p>
          The Student Plan is designed to assist students from all academic
          disciplines. We offer customized strategies that apply to various
          fields, not just STEM.
        </p>
      </>
    ),
  },
  {
    question: "What is the duration for the Student Plan?",
    answer: (
      <>
        <p>
          The Student Plan is self-paced, allowing you to work through the
          materials at your own convenience. Most students finish within a few
          weeks, but you can take your time.
        </p>
      </>
    ),
  },
  {
    question:
      "I am not a student in the US but I am plannig to study in the US in the future. Will this benefit me?",
    answer: (
      <>
        <p>
          The plan is beneficial for both students currently in the U.S. and
          those planning to study here. It equips you with early preparation,
          giving you a strategic edge in the immigration process.
        </p>
      </>
    ),
  },
];

export function StudentPlanFaq() {
  return (
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
  );
}
