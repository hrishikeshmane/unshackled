"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  responses: z.array(
    z.object({
      question: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConsumerApprovalForm({ productId, vendorId, storeId }: { productId: string; vendorId: string, storeId: string }) {
  const [isFormReady, setIsFormReady] = useState(false);
  const router = useRouter();
  // const { userId } = useAuth();

  const { data: existingRequest, isLoading: checkingExistingRequest } = api.approvalForms.checkExistingRequest.useQuery(
    { productId },
    // { enabled: !!userId }
  );

  const { data: questions, isLoading: questionsLoading } = api.approvalForms.getQuestions.useQuery(
    { productId, vendorId },
    { enabled: !existingRequest?.exists }
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: [],
    },
  });

  useEffect(() => {
    if (existingRequest?.exists) {
      toast.info("You have already submitted a request for this product.");
      router.push(`/marketplace/${storeId}/products/${productId}`);
    } else if (questions) {
      form.reset({
        responses: questions.map(q => ({ question: q.question, answer: "" })),
      });
      setIsFormReady(true);
    }
  }, [existingRequest, questions, form, router, storeId, productId]);

  const submitResponsesMutation = api.approvalForms.submitResponses.useMutation({
    onSuccess: () => {
      toast.success("Form submitted successfully");
      router.push(`/marketplace/${storeId}/products/${productId}`);
    },
    onError: (error) => {
      toast.error(`Error submitting form: ${error.message}`);
    },
  });

  const onSubmit = (data: FormValues) => {
    submitResponsesMutation.mutate({
      productId,
      vendorId,
      responses: data.responses,
    });
  };

  if (checkingExistingRequest || questionsLoading || !isFormReady) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Heading
        title="Product Approval Form"
        description="Please fill out this form to request approval for the product"
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questions?.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={`responses.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.question}</FormLabel>
                  <FormControl>
                    {question.type === "short" ? (
                      <Input {...field} placeholder="Your answer" />
                    ) : (
                      <Textarea {...field} placeholder="Your answer" />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-center">
            <Button type="submit" size="lg">Submit Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}