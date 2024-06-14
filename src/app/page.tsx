import MaxWidthWrapper from "~/components/MaxWidthWrapper"

export default async function Home() {

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Home Page</h1>
      </div>
    </MaxWidthWrapper>
  );
}