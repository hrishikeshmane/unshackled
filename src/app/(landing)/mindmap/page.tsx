import Image from "next/image";
import React from "react";
import { SendMindmapForm } from "~/components/landing-page/convertkit-forms";
import Footer from "~/components/landing-page/footer";

const MindPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F9FF]">
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg py-28">
        <div className="flex flex-col md:flex-row">
          <div className="flex basis-2/3 flex-col items-start justify-start gap-10 px-8 text-left md:py-20">
            <h2 className="max-w-4xl text-5xl font-bold leading-[4rem]">
              Get the Unshackled Mindmap
            </h2>
            <div className="rounded-md bg-white p-4">
              <SendMindmapForm />
            </div>
          </div>
          <div className="flex basis-1/3 scale-75 items-center justify-center md:scale-100">
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/mindmap/mindmap.png?raw=true"
              alt="Soundarya"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MindPage;
