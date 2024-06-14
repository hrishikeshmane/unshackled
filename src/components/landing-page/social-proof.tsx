const companies = ["Google", "Amazon", "YouTube", "Instagram", "Spotify"];

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
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={`https://cdn.magicui.design/companies/${logo}.svg`}
                  className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                  alt={logo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
