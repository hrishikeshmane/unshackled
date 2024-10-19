"use client";

import React from 'react'
import { Button } from '~/components/ui/button'
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { api } from "~/trpc/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import BecomeASeller from './become-a-seller';

const BecomeASellerSection = () => {

    // const { user, isLoaded } = useUser()

    // if (!isLoaded) {
    //     return <div>Loading...</div>;
    //   }

    // const vendorApplicationMutation = api.vendor.createVendorApplication.useMutation({
    //     onSuccess: ({res}) => {
    //         toast.success(res)
    //     },
    //     onError: (error) => {
    //         toast.error(error.message)
    //     }
    // })

    const handleOnClick = () => {
        // if (!user?.id) {
        //     toast.error('You need to sign in first to become a seller')
        //     return
        // }

        // vendorApplicationMutation.mutate({ userId: user.id})
    }

  return (
    <div className='mx-auto text-center justify-center flex w-full max-w-7xl flex-col gap-4 p-4 md:flex-row'>
    <div className="basis-1/2 bg-gray-100 p-8">
              <h2 className="rounded-lg py-4 text-3xl font-bold leading-[4rem] text-primary">
                Become a Vendor
              </h2>
              <p className="text-xl font-bold leading-8 text-muted-foreground ">
                Become a seller with Unshackled and start selling your services on to thousands of talent visa aspirants .
              </p>
              <div className="flex flex-col gap-4 py-4">
                {/* <Link href={"/community"}> */}
                  <Button size={"lg"} className="mt-10 w-full">
                    <BecomeASeller />
                  </Button>
                {/* </Link> */}
              </div>
            </div>
    </div>
  )
}

export default BecomeASellerSection