import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "~/components/landing-page/footer";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export type VisaType = "EB-A" | "O-1A" | "H-1B" | "EB-2 NIW";
export type ILAWYER_INFO = {
  id: number;
  img: string;
  name: string;
  title: string;
  experince: number;
  visa: VisaType[];
  strikePrice: string;
  priceTitle: string;
  website?: string;
  linkedin?: string;
  bio: string;
  whoShouldBookACall: string;
  consultLink: string;
};
export const LAWYER_INFO: ILAWYER_INFO[] = [
  {
    id: 2,
    name: "Allison Kranz",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/allison.png?raw=true",
    title: "Principal Attorney at Lodestone Legal",
    experince: 15,
    visa: ["EB-A", "O-1A", "EB-2 NIW"],
    strikePrice: "$150",
    priceTitle: "$100 for 30 minutes",
    bio: "Attorney Allison Kranz, JD, LLM, known as The Nerdy Immigration Lawyer, is the Principal Attorney at Lodestone Legal, specializing in U.S. immigration law. Her personal connection to immigration, with family ties extending globally, fuels her passion for her work. Allison advises Fortune 500 companies and focuses on self-sponsored solutions, assisting professionals, startups, experts, and international students with nonimmigrant and immigrant visas, as well as green cards through Adjustment of Status. She also helps families with permanent residency, waivers, citizenship, fiancée visas, and visas for crime victims. Recognized as an Elite Lawyer in 2022 and 2023, and a Women in the Law Award winner in 2019, Allison holds a JD and an LLM in Human Rights. She is licensed in Michigan and Florida, exclusively practicing immigration and nationality law.",
    whoShouldBookACall:
      "Allison ideally works with researchers, scientists, software engineers, machine learning engineers, data engineers, product managers, marketing managers, C-level executives, business leaders, critical employees, founders, entrepreneurs, and others.",
    website: "https://www.lodestonelegal.com/",
    linkedin: "https://www.linkedin.com/in/allisonkranz/",
    consultLink:
      "https://calendly.com/readunshackled/allison-paid-consultation",
  },
  // {
  //   id: 3,
  //   name: "Joel A. Wisniewski",
  //   img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/joel.png?raw=true",
  //   title: "Partner at Lodestone Legal, LLC",
  //   experince: 15,
  //   visa: ["EB-A", "O-1A", "EB-2 NIW"],
  //   strikePrice: "150",
  //   priceTitle: "$100 for 30 minutes",
  //   bio: "Joel is an experienced immigration attorney with over 15 years of experience supporting employers and employees as they navigate through the non-immigrant and immigrant landscape.",
  //   whoShouldBookACall:
  //     "Joel ideally works with software engineers, machine learning engineers, data engineers, researchers, scientists, C-level executives, business leaders, critical employees, founders, entrepreneurs, product managers, marketing managers, and others.",
  //   website: "https://www.lodestonelegal.com/",
  //   linkedin: "https://www.linkedin.com/in/joel-wisniewski-a95859a/",
  //   consultLink:
  //     "https://calendly.com/readunshackled/joel-a-wisniewski-paid-consultation",
  // },
  {
    id: 4,
    name: "Charles Gillman",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/charles.png?raw=true",
    title: "Partner, Head of Employment-Based Immigration Department",
    experince: 20,
    visa: ["EB-A", "O-1A", "EB-2 NIW"],
    strikePrice: "$300",
    priceTitle: "$175 for 30 minutes",
    bio: "Charles, with a three-decade career in global mobility, has worked as an in-house attorney for a Fortune 100 company, with major international consulting firms, and with multi-practice law firms. He has had the privilege of learning from some of the finest lawyers in North America. Regularly assessing issues from a mobility or compliance perspective for universities, businesses, investors, and entrepreneurs, Charles is known for being thoughtful, creative, and diligent. His goal is to provide the perspective and analysis that allows clients to pursue successful outcomes as they face ever-evolving U.S. immigration challenges.",
    whoShouldBookACall:
      "Charles ideally works with founders and entrepreneurs, software engineers, machine learning engineers, data engineers, C-level executives, business leaders, and critical employees.",
    website: "https://www.gonzalezolivierillc.com/attorneys/charles-gillman/",
    linkedin: "https://www.linkedin.com/in/charles-gillman-5654026/",
    consultLink:
      "https://calendly.com/readunshackled/charles-gillman-paid-consultation",
  },
];

const LawyerPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <main>
        <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                Want to consult with a top{" "}
                <span className="text-primary">immigration lawyer</span>? You’ve
                come to the
                <span className="text-primary">right place</span>.
              </h1>
              <p className="mx-auto mt-8 max-w-4xl px-2 text-center text-2xl font-semibold leading-8 text-muted-foreground">
                We&apos;ve carefully vetted lawyers who can help you with
                everything from
                <span className="text-primary">
                  EB-1A profile evaluations to setting up your business as a
                  student
                </span>{" "}
                on OPT. And everything in between.
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center justify-center py-12 sm:py-16 lg:pt-20 xl:pb-0">
          <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight lg:text-4xl lg:leading-tight">
            Lawyer Directory
          </h2>
          <div className="my-8 grid grid-cols-3 gap-10">
            {LAWYER_INFO.map((lawyer) => (
              <div
                className="flex h-full w-[330px] flex-col justify-between rounded-md bg-card p-4 shadow-lg"
                key={lawyer.id}
              >
                <div>
                  <Image
                    src={lawyer.img}
                    height={250}
                    width={300}
                    alt={lawyer.name}
                  />
                  <div className="mt-4 flex flex-col">
                    <h3 className="my-1 text-2xl text-primary">
                      {lawyer.name}
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      {lawyer.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lawyer.experince}+ years of experience
                    </p>
                    <div className="my-2">
                      <div className="flex gap-1">
                        {lawyer.visa.map((v) => (
                          <Badge key={v}>{v}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/find-lawyers/${lawyer.id}`}
                  className="mt-4 w-full"
                >
                  <p className="w-full py-1 text-center text-primary">
                    <s>{lawyer.strikePrice}</s> {lawyer.priceTitle}
                  </p>
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className="b-2 w-full border-primary text-primary"
                  >
                    Book a consult
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LawyerPage;