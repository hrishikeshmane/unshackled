import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Store {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface StoresReelProps {
  stores: Store[];
  reelTitle: string;
  reelSubtitle?: string;
}

const StoresReel: React.FC<StoresReelProps> = ({
  stores,
  reelTitle,
  reelSubtitle,
}) => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-center text-4xl font-bold text-primary">
          {reelTitle}
        </h2>
        {reelSubtitle && (
          <p className="mb-8 text-center text-lg text-muted-foreground">
            {reelSubtitle}
          </p>
        )}
        <div className="space-y-8">
          {stores.map((store) => (
            <Link key={store.id} href={store.link}>
              <div className="relative mb-10 h-64 w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <Image
                  src={store.imageUrl}
                  alt={store.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                  <div className="p-6 text-center">
                    <h3 className="mb-2 text-4xl font-bold text-primary">
                      {store.title}
                    </h3>
                    <p className="max-w-3xl text-center text-white text-opacity-80">
                      {store.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoresReel;
