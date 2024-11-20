"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./logo";
import { type Routes } from "./header";
import NavButtons from "./nav-buttons";
import { Separator } from "../ui/separator";
import UserAuthButton from "./user-auth-button";

export type NavComponent = { title: string; href: string; description: string };

const MobileNav = ({
  components,
  role,
}: {
  components: Routes;
  role?: CustomJwtSessionClaims["metadata"]["role"];
}) => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const toggleSheet = () => setSheetOpen((prev) => !prev);

  const isMarketplaceRoute = pathname.startsWith("/marketplace");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex items-center gap-2">
      <UserAuthButton />
      <Sheet open={sheetOpen} onOpenChange={toggleSheet}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo className="h-6 w-6" />
            </Link>

            <div className="">
              {/* This is wehre dashboard buttons will go */}
              <NavButtons role={role} toggleSheet={toggleSheet} />
            </div>

            {/* Landing page routes */}
            {
              <>
                <Link
                  href={"/read-unshackled"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Read Unshackled
                </Link>
                <Link
                  href={"/community"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Community
                </Link>
                <Link
                  href={"/find-lawyers"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Find Lawyers
                </Link>
                <Link
                  href={"/course"}
                  // href="https://unshackled.thinkific.com/courses/eb1a"
                  // target="_blank"
                  // rel="noopener noreferrer"
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Course
                </Link>
                <Link
                  href={"/copilot"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  [NEW] EB-1A Copilot
                </Link>
                {/*<Link
                  href={"/course"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Free Course
                </Link>

                <Link
                  href="/student-plan"
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Student Plan
                </Link>
                <Link
                  href={"/newsletter"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Newsletter
                </Link>
                <Link
                  href={"/our-story"}
                  onClick={toggleSheet}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Our Story
                </Link> */}
                {/* <NavButtons role={role} toggleSheet={toggleSheet} /> */}
              </>
            }

            {isMarketplaceRoute && (
              <>
                <Separator />
                {components.marketplaceRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={toggleSheet}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.title}
                  </Link>
                ))}
              </>
            )}
            {isVendorRoute && (
              <>
                <Separator />
                {components.vendorRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={toggleSheet}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.title}
                  </Link>
                ))}
              </>
            )}
            {isAdminRoute && (
              <>
                <Separator />
                {components.adminRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={toggleSheet}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.title}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
