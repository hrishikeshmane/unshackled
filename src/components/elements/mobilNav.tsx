"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./logo";
import { type Routes } from "./header";

export type NavComponent = { title: string; href: string; description: string };

const MobileNav = ({ components }: { components: Routes }) => {
  const pathname = usePathname();

  const isMarketplaceRoute = pathname.startsWith("/marketplace");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomeRoute = pathname.startsWith("/");

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo className="h-6 w-6" />
            </Link>
            {isMarketplaceRoute && (
              <>
                {components.marketplaceRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.title}
                  </Link>
                ))}
              </>
            )}
            {isVendorRoute && (
              <>
                {components.vendorRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.title}
                  </Link>
                ))}
              </>
            )}
            {isAdminRoute && (
              <>
                {components.adminRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
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
