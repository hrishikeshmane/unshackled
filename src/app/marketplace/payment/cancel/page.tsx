import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CacncelRoute() {
  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <XCircle className="h-12 w-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6">Payment Canceled</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong with your payment. You havent been charged.
              Please try again.
            </p>

            <Button
              className="broder-primary b-1 mt-5 w-full sm:mt-6"
              asChild
              variant={"outline"}
            >
              <Link href="/myorders">My Orders</Link>
            </Button>

            <Button className="mt-5 w-full sm:mt-4" asChild>
              <Link href="/marketplace">Back to Marketplace</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
