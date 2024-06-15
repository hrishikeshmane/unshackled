import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper"
import BecomeASeller from "./marketplace/_components/become-a-seller";

export default async function Home() {

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Home Page</h1>
      </div>
      <Link href="/marketplace/cart">
        Go to Cart
      </Link>
      <BecomeASeller />
    </MaxWidthWrapper>
  );
}