"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Cart from "../cart";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAuthButton from "./user-auth-button";
import { Phone, ShoppingBag } from "lucide-react";

interface NavButtonsProps {
  role?: CustomJwtSessionClaims["metadata"]["role"];
  toggleSheet?: () => void;
}

const NavButtons = ({ role, toggleSheet }: NavButtonsProps) => {
  const pathname = usePathname();

  const mobileSheetToggle = () => {
    if (toggleSheet) {
      toggleSheet();
    }
  };

  return (
    <div className="ml-auto flex w-full items-center justify-end gap-4 md:flex-row lg:gap-4">
      {pathname.includes("marketplace")}
      {!pathname.includes("marketplace") && (
        <div className="flex gap-4">
          {role === "vendor" ? (
            <Link href="/vendor">
              <Button className="">Vendor Dashboard</Button>
            </Link>
          ) : role === "admin" ? (
            <Link href="/admin">
              <Button className="">Admin Dashboard</Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-4 md:flex md:flex-row">
              {/* <Link href="/marketplace">
                <Button
                  variant={"outline"}
                  className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
                  onClick={mobileSheetToggle}
                >
                  <ShoppingBag className="h-5" />
                  Shop on Marketplace
                </Button>
              </Link> */}
              <Link
                href={
                  pathname.includes("/community")
                    ? "#pricing-grid"
                    : "/community"
                }
              >
                <Button onClick={mobileSheetToggle}>Become a member</Button>
              </Link>
              <Link
                href="https://go.greencard.inc/evaluation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant={"outline"}
                  className="flex gap-2 border-2 border-primary text-primary hover:text-primary"
                >
                  <Phone className="h-5" />
                  Book a Free Call
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
      <UserAuthButton />
    </div>
  );
};

export default NavButtons;
