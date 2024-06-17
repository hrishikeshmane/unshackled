import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenuDemo } from "./navigation-menu";
import Logo from "./logo";

export type NavComponent = { title: string; href: string; description: string };
const components: NavComponent[] = [
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
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="h-6 w-6" />
        </Link>

        <NavigationMenuDemo components={components} />
      </nav>
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
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Link href="/marketplace">
          <Button
            variant={"outline"}
            className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
          >
            <ShoppingBag className="h-5" />
            Shop on Marketplace
          </Button>
        </Link>
        <Button>Become a member</Button>
      </div>
    </header>
  );
};

export default Header;
