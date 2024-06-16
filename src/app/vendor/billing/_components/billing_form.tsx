"use client";

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from '~/components/ui/button';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';


interface BillingFormProps {
    stripeConnected: boolean;
    link: string;
}

const BillingForm = ({ link, stripeConnected}: BillingFormProps) => {
    const router = useRouter(); 

    const handleOnClick = () => {
        router.push(link);
    }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Find all your details regarding your payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stripeConnected === false && (
                <Button onClick={handleOnClick} >
                    Link your Accout to stripe
                </Button>
            )}
  
            {stripeConnected === true && (
                <Button onClick={handleOnClick} >
                    View Dashboard
                </Button>
            )}
          </CardContent>
        </Card>
      </section>
  )
}

export default BillingForm