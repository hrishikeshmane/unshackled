import MaxWidthWrapper from "~/components/MaxWidthWrapper";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="">
        <MaxWidthWrapper>
            {children}
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
