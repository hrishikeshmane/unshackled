import { redirect } from "next/navigation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { checkRole } from "~/lib/clerk";
import "~/styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!checkRole("admin")) {
    redirect("/marketplace");
  }
  return (
    <div>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
}
