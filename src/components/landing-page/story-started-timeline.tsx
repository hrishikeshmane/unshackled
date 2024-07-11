import { WorkflowIcon } from "lucide-react";
import React from "react";

const StoryStartedTimeline = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 rounded-lg py-28">
      <h3 className="text-3xl">Timeline of how we came together</h3>
      <div className="py-10">
        <ol className="relative max-w-3xl border-s">
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Soundarya, RK, and Nikin enter the U.S. in 2017, 2017, and 2014
              respectively to pursue their higher education. None of them know
              what “talent visas” are.
            </h3>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Jan 2021
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Soundarya spends 2 years working as a PM at Salesforce, ready to
              quit her job to be a founder. She comes across the O-1 for the
              first time.
            </h3>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Apr 2021
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Nikin gets his O-1A approved after hearing about it from a friend,
              and applying as a founder.
            </h3>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Dec 2021
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Optimistic from his O-1A approval, Nikin files his EB-1A, and gets
              it denied.
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              May 2022
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              After spending a year putting together the application, Soundarya
              files her O-1B as a writer — and gets it denied.{" "}
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Aug 2022
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Soundarya decides a write a book on immigration, titled
              “Unshackled.” It eventually becomes a community and a company.{" "}
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Nov 2022
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              After more than 2 years in the process, Nikin applies for a third
              time for his EB-1A — and finally gets his long-standing freedom.
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Feb 2023
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              RK discovers the term “EB-1A” for the first time and decides to
              take a shot. He files within 2 months and gets it approved —
              something he could’ve done years earlier if he knew about it.
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Sep 2023
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Soundarya files an O-1A a second time as a founder, and gets it
              approved within 3 days. She can finally enter the U.S. again.
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Dec 2023
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Nikin and RK find each other, and decide to work together to help
              more talented immigrants get talent visas. Greencard Inc is born.
            </h3>
          </li>

          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Apr 2023
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Soundarya gets her EB-2 NIW approved, and meets Nikin and RK for
              the first time together.
            </h3>
          </li>

          <li className="ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              Jun 2023
            </time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              We decide to join forces with our companies — Unshackled and
              Greencard Inc — to help immigrants get talent visas in America.
            </h3>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default StoryStartedTimeline;
