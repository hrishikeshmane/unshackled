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
      <div className="">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
    </div>
  );
}
