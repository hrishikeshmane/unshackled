"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BecomeASeller = () => {
  const { user, isLoaded } = useUser();

  console.log("user", user?.id);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const vendorApplicationMutation =
    api.vendor.createVendorApplication.useMutation({
      onSuccess: ({ res }) => {
        toast.success(res);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleOnClick = () => {
    if (!user?.id) {
      toast.error("You need to sign in first to become a seller");
      return;
    }

    vendorApplicationMutation.mutate({ userId: user.id });
  };

  return (
    // <div>
    //   <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
    //     <div className="absolute inset-0 overflow-hidden rounded-lg">
    //       <div
    //         aria-hidden="true"
    //         className="absolute inset-0 bg-zinc-50 bg-opacity-90 bg-gradient-to-br"
    //       />
    //     </div>
    //     <div className="relative mx-auto flex max-w-sm flex-col items-center gap-3 text-center">

    <Dialog>
      <DialogTrigger>Become a seller</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Become a seller.</DialogTitle>
          <DialogDescription>
            Clicking the button below will submit your application to become a
            seller.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleOnClick} className="w-24">
            Apply &rarr;
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BecomeASeller;
