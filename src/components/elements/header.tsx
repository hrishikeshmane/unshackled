import React from "react";
import Link from "next/link";
import { api } from "~/trpc/server";
import { ConditionalNavigationMenu } from "./conditional-navigation-menu";
import Logo from "./logo";
import NavButtons from "./nav-buttons";
import { auth } from "@clerk/nextjs/server";

export type NavComponent = { title: string; href: string; description: string };
export type Route = {
  href: string;
  title: string;
  description: string;
};

export type Routes = {
  marketplaceRoutes: Route[];
  vendorRoutes: Route[];
  adminRoutes: Route[];
  homeRoutes: Route[];
};

const Header = async () => {
  const data = await api.store.getStores();
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role;

  console.log("role", role);

  const routes: Routes = {
    marketplaceRoutes: data.map((route) => ({
      href: `/marketplace/${route.id}`,
      title: route.name,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    })),
    vendorRoutes: [
      {
        href: `/vendor`,
        title: "Overview",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        href: `/vendor/products`,
        title: "Products",
        description: "",
      },
      {
        href: `/vendor/orders`,
        title: "Orders",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        href: `/vendor/billing`,
        title: "Billing",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
    ],
    adminRoutes: [
      {
        href: `/admin`,
        title: "Overview",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        href: `/admin/users`,
        title: "Users",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        href: `/admin/vendors`,
        title: "Vendors",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
    ],
    homeRoutes: [
      {
        title: "Press",
        href: "/marketplace/press",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Lawyers",
        href: "/marketplace/lawyers",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Expert Opinion",
        href: "/marketplace/expert-opinion",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Paid Courses",
        href: "/marketplace/paid-courses",
        description: "Visually or semantically separates content.",
      },
      {
        title: "Become a Vendor",
        href: "/marketplace/vendor",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="h-6 w-6" />
        </Link>

        <ConditionalNavigationMenu components={routes} />
      </nav>

      <NavButtons role={role} />
    </header>
  );
};

export default Header;