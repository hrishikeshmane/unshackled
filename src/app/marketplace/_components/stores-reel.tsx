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

const StoresReel: React.FC<StoresReelProps> = ({ stores, reelTitle, reelSubtitle }) => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary text-center mb-2">
          {reelTitle}
        </h2>
        {reelSubtitle && (
          <p className="text-lg text-muted-foreground text-center mb-8">
            {reelSubtitle}
          </p>
        )}
        <div className="space-y-8">
          {stores.map((store) => (
            <Link key={store.id} href={store.link}>
              <div className="relative w-full h-64 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-10">
                <Image
                  src={store.imageUrl}
                  alt={store.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-4xl font-bold text-primary mb-2">
                      {store.title}
                    </h3>
                    <p className="text-primary text-opacity-80">
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