"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Cart from "../cart";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAuthButton from "./user-auth-button";
import { ShoppingBag } from "lucide-react";

interface NavButtonsProps {
  role?: CustomJwtSessionClaims["metadata"]["role"];
}

const NavButtons = ({ role }: NavButtonsProps) => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
      {pathname.includes("marketplace") && <Cart />}
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
            <>
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
            </>
          )}
        </div>
      )}
      <UserAuthButton />
    </div>
  );
};

export default NavButtons;