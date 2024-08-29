"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BillingFormProps {
  stripeConnected: boolean;
  link: string;
}

const BillingForm = ({ link, stripeConnected }: BillingFormProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(link);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Find all your details regarding your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stripeConnected === false && (
            <Button onClick={handleOnClick}>Link your Accout to stripe</Button>
          )}

          {stripeConnected === true && (
            <Link href={link}>
              <Button>View Stripe Dashboard</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillingForm;
