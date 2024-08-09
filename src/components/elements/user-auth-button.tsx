"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const UserAuthButton = () => {
  return (
    <div className="">
      <SignedIn>
        <UserButton afterSignOutUrl="/">
          <UserButton.UserProfileLink
            label="Vendor Dashboard"
            url="/vendor"
            labelIcon={<DotIcon />}
          />
          <UserButton.UserProfileLink
            label="My Orders"
            url="/myorders"
            labelIcon={<DotIcon />}
          />
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"secondary"}>Sign in</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default UserAuthButton;
