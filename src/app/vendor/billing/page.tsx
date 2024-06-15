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
  
  export default async function BillingRoute() {
    noStore();
    const { userId } = auth()
    
    if (!userId) {
        return null;
    }

    const data = await api.vendor.getVendorById({ userId: userId });

    const handleCreateLink = async () => {
        const data = await api.payment.createVendorStripeAccountLink({ userId: userId });
        redirect(data.url);
    }
    const handleGetLink = async () => {
        const data = await api.payment.getVendorStripeAccountLink({ userId: userId });
        redirect(data.url);
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
            {data?.stripeConnected === false && (
                <Button onClick={handleCreateLink} title="Link your Accout to stripe" />
            )}
  
            {data?.stripeConnected === true && (
                <Button onClick={handleGetLink} title="View Dashboard" />
            )}
          </CardContent>
        </Card>
      </section>
    );
  }
  