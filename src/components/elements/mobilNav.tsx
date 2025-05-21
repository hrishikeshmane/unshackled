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
              <NavButtons role={role} toggleSheet={toggleSheet} />
            </div>

            {/* Learn Section */}
            <div className="space-y-2">
              <h3 className="font-semibold">Learn</h3>
              <Link
                href={"/read-unshackled"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                Read Unshackled
              </Link>
              <Link
                href={"/course"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                Take a Course
              </Link>
              <Link
                href="http://go.readunshackled.com/webinar"
                onClick={toggleSheet}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                Join a Webinar
              </Link>
            </div>

            {/* Explore Section */}
            <div className="space-y-2">
              <h3 className="font-semibold">Explore</h3>
              <Link
                href="http://go.readunshackled.com/unshackled-uac"
                onClick={toggleSheet}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                [NEW] Conference
              </Link>
              <Link
                href={"/community"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                Community
              </Link>
              <Link
                href={"/community"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                Community
              </Link>
              <Link
                href={"/marketplace"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                Marketplace
              </Link>
            </div>

            {/* Get EB1 Support Section */}
            <Link
              href="https://go.greencard.inc/evaluation"
              onClick={toggleSheet}
              className="font-semibold"
              // className="block text-muted-foreground hover:text-foreground"
            >
              Get EB1 Support
            </Link>
            {/* <div className="space-y-2">
              <h3 className="font-semibold">Get EB1 Support</h3>
              <Link
                href={"/copilot"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                EB1 Copilot
              </Link>
              <Link
                href={"/copilot"}
                onClick={toggleSheet}
                className="block text-muted-foreground hover:text-foreground"
              >
                EB1 Autopilot
              </Link>
            </div> */}
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
