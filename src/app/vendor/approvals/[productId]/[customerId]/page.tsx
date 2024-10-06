"use client";

import { useRouter } from "next/router";
import { api } from "~/trpc/react";
import { Heading } from "~/app/admin/_components/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function FormResponsesPage() {
  // const router = useRouter();
  //   const { productId, customerId } = router.query;
  const params = useParams();
  const productId = params.productId as string;
  const customerId = params.customerId as string;

  const { data: responses, isLoading } =
    api.approvalForms.getFormResponses.useQuery(
      { productId, customerId },
      { enabled: !!productId && !!customerId },
    );

  if (isLoading) return <div>Loading...</div>;

  if (!responses || responses.length === 0)
    return <div>No responses found.</div>;

  return (
    <div className="space-y-4">
      <Heading
        title="Form Responses"
        description=""
        // description={`Responses for product ${productId} and customer ${customerId}`}
      />
      <Separator />
      <div className="space-y-6">
        {responses.map((response, index) => (
          <div key={index} className="rounded border p-4">
            <p>
              <strong>Question:</strong> {response.question}
            </p>
            <p>
              <strong>Answer:</strong> {response.answer}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {/* <Button onClick={() => router.back()}>Go Back</Button> */}
      </div>
    </div>
  );
}
