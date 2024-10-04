import { Linkedin } from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  newsletterCount: "20,000+",
  name: "Greencard Inc",
  description:
    "Your one-stop shop to Secure your Green Card with AI-Powered Expertise",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL!,
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "hello@greencard.inc",
    twitter: "https://twitter.com/magicuidesign",
    Linkedin: "https://discord.gg/87p2vpsat5",
    instagram: "https://instagram.com/magicuidesign/",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          // icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Automation",
          description: "Streamline your workflow with intelligent automation.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Task Automation",
            description: "Automate repetitive tasks and save time.",
          },
          {
            href: "#",
            title: "Workflow Optimization",
            description: "Optimize your processes with AI-driven insights.",
          },
          {
            href: "#",
            title: "Intelligent Scheduling",
            description: "AI-powered scheduling for maximum efficiency.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  banner: {
    visible: false,
    title: "Launching our EB1 Copilot Program – Get 33% off today!",
    buttonText: "Claim Your Seat Now!",
  },
  pricing: [
    {
      isPopular: false,
      name: "EB1 Autopilot",
      // href: "https://go.greencard.inc/evaluation",
      href: "/copilot#get-started",
      price: "$30,000",
      period: "One Time",
      // yearlyPrice: "$40",
      features: [
        "Everything from EB1 Copilot",
        "Attorney fees included",
        "Priority Support",
        "AI-Powered Insights",
      ],
      description:
        "Ideal for busy professionals who want a stress-free experience",
      buttonText: "Enroll Now",
    },
    {
      name: "EB1 Copilot",
      // href: "https://go.greencard.inc/evaluation",
      href: "/copilot#get-started",
      price: "$15,000",
      period: "One Time",
      // yearlyPrice: "$16",
      features: [
        "Dashboard Access",
        "Professional Mentorship",
        "Basic Support",
        "Accountability Manager",
        "AI-Powered Insights",
      ],
      description: "For hands-on achievers who want expert guidance.",
      buttonText: "Enroll Now",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "https://go.greencard.inc/evaluation",
      price: "Custom",
      period: "month",
      // yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and companies",
      buttonText: "Contact Us",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is the EB-1A Visa?",
      answer: (
        <>
          <p>
            The EB-1A visa is for individuals who demonstrate extraordinary
            ability in their field, enabling them to fast-track their U.S. green
            card application without needing employer sponsorship.
          </p>
        </>
      ),
    },
    {
      question: "Who qualifies for the EB1 Copilot Program?",
      answer: (
        <>
          <p>
            We focus on individuals in tech and STEM fields with a strong track
            record of achievements. If you have awards, published work, or other
            professional recognition, you’re likely a good fit.
          </p>
        </>
      ),
    },
    {
      question: "What is the cost of the EB1 Copilot Program?",
      answer: (
        <>
          <p>
            The program price is $15,000, but for the first 30 members, we’re
            offering a 33% discount, bringing it down to $10,000.
          </p>
          <p>
            In addition, if you choose to file with us, the filing fee is
            $10,000, with a 20% discount ($8,000) for the first 30 members.
          </p>
        </>
      ),
    },
    {
      question: "Is the filing fee included in the program price?",
      answer: (
        <>
          <p>
            No, the filing fee is separate from the program cost. However, for
            the first 30 members, the filing fee is discounted from $10,000 to
            $8,000.
          </p>
        </>
      ),
    },
    {
      question: "Which law firm will handle my case?",
      answer: (
        <>
          <p>
            We’ve partnered with Lodestone Legal, led by expert attorney Allison
            Kranz, who has extensive experience in filing EB-1A cases,
            especially for individuals in the tech and STEM fields.
          </p>
        </>
      ),
    },
    {
      question: "Will I get a refund if my application is denied?",
      answer: (
        <>
          <p>
            We don’t offer refunds based on the outcome of the application.
            However, once you’ve paid for the program, you’ll have lifetime
            access to all resources, mentorship, and support at no extra cost.
            Additionally, if you need to refile your petition, we’ll offer a
            discount on the filing fee to ensure continued support on your path
            to approval.
          </p>
        </>
      ),
    },
    {
      question: "Can I get a refund if I change my mind?",
      answer: (
        <>
          <p>
            We offer a refund window within the first 30 days of the program. If
            you decide it’s not for you, no problem!
          </p>
        </>
      ),
    },
    {
      question: "How long does it take to complete the program?",
      answer: (
        <>
          <p>
            Most applicants take 6-12 months to complete the program, depending
            on their profile and readiness.
          </p>
        </>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    // {
    //   title: "Company",
    //   links: [
    //     { href: "#", text: "About Us", icon: null },
    //     { href: "#", text: "Careers", icon: null },
    //     { href: "#", text: "Blog", icon: null },
    //     { href: "#", text: "Press", icon: null },
    //     { href: "#", text: "Partners", icon: null },
    //   ],
    // },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "LinkedIn",
          icon: <FaLinkedinIn />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
