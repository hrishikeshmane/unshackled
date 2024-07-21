import Image from "next/image";

const features = [
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/features/emergent.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/features/toi.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/features/fortune.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/features/Indiacurrent.png?raw=true",
  "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/features/marginal.png?raw=true",
];

export function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            As featured on
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-5 xl:grid-cols-5 xl:gap-0">
              {features.map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo}
                  alt={logo}
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
