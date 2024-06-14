import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import "~/styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
        <MaxWidthWrapper>
          {children}
        </MaxWidthWrapper>
    </div>
  );
}
