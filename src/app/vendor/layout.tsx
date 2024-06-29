import Link from "next/link";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { checkRole } from "~/lib/clerk";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!checkRole("vendor")) {
    redirect("/marketplace");
  }
  return (
    <div className="">
      {/*  TODO: Show this only when stripe not linked  */}
      <div className="sticky top-16 flex h-12 w-screen items-center justify-center bg-primary text-primary-foreground">
        You have not linked your Stripe account.
        <Link href={"/vendor/billing"} className="ml-1 underline">
          Link your account to start selling on Unshackled!
        </Link>
      </div>
      <div className="">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
    </div>
  );
}
