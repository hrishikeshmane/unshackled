import Image from "next/image";

const features = [
  "https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66052a59eaa3185d691dadde_Rectangle%202030-p-500.png",
  "https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/6605be1f8d2abaaa598be048_Rectangle%202031-p-500.png",
  "https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66052adf7e2dde43904047db_Rectangle%202032-p-500.png",
  "https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66052adfba15766969a8f635_Rectangle%202033-p-500.png",
  "https://cdn.prod.website-files.com/65d45d280fe16f42cb43e774/66052adf67febd152668d3eb_Rectangle%202034-p-500.png",
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
