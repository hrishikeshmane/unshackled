import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { auth } from "@clerk/nextjs/server";
  import { unstable_noStore as noStore } from "next/cache";
  import { Button } from "@/components/ui/button";
  import { api } from "~/trpc/server";
  import { redirect } from "next/navigation";
  import Link from "next/link";
import BillingForm from "./_components/billing_form";
  
  export default async function BillingRoute() {
    noStore();
    const { userId } = auth()
    
    if (!userId) {
        return null;
    }

    const data = await api.vendor.getVendorById({ userId: userId });

    if(!data) {
        return null;
    }

    let link = "/"
    if (data.stripeConnected === false) {
       const createLink = await api.payment.createVendorStripeAccountLink({ userId: userId });
        link = createLink.url;
    } else {
     const getLink = await api.payment.getVendorStripeAccountLink({ userId: userId });
        link = getLink.url;
    }

    return (
      <div className="flex items-center justify-center mt-10">
        <BillingForm stripeConnected={data.stripeConnected} link={link} />
      </div>
    );
  }
  