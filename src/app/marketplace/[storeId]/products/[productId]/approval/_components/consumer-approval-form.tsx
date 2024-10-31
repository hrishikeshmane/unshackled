"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "~/trpc/react"
import { useEffect, useState } from "react"
import { Heading } from "~/app/admin/_components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Checkbox } from "~/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  confirmCheck: z.boolean().default(false),
  responses: z.array(
    z.object({
      question: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
})

type FormValues = z.infer<typeof formSchema>

export default function ConsumerApprovalForm({
  isExtRequiredFormApprovalLink,
  ExtRequiredFormApprovalLink,
  productId,
  vendorId,
  storeId,
}: {
  isExtRequiredFormApprovalLink: boolean
  ExtRequiredFormApprovalLink: string
  productId: string
  vendorId: string
  storeId: string
}) {
  const [isFormReady, setIsFormReady] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  const { data: existingRequest, isLoading: checkingExistingRequest } = api.approvalForms.checkExistingRequest.useQuery(
    { productId },
    { enabled: !!userId }
  )

  const { data: questions, isLoading: questionsLoading } = api.approvalForms.getQuestions.useQuery(
    { productId, vendorId },
    { enabled: !existingRequest?.exists }
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: [],
    },
  })

  useEffect(() => {
    if (existingRequest?.exists) {
      toast.info("You have already submitted a request for this product.")
      router.push(`/marketplace/${storeId}/products/${productId}`)
    } else if (questions) {
      form.reset({
        responses: questions.map(q => ({ question: q.question, answer: "" })),
      })
      setIsFormReady(true)
    }
  }, [existingRequest, questions, form, router, storeId, productId])

  const submitResponsesMutation = api.approvalForms.submitResponses.useMutation({
    onSuccess: () => {
      toast.success("Form submitted successfully")
      router.push(`/marketplace/${storeId}/products/${productId}`)
    },
    onError: (error) => {
      toast.error(`Error submitting form: ${error.message}`)
    },
  })

  const onSubmit = (data: FormValues) => {
    submitResponsesMutation.mutate({
      productId,
      vendorId,
      responses: data.responses,
    })
  }

  if (checkingExistingRequest || questionsLoading || !isFormReady) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      <Heading
        title="Service Approval Form"
        description="Please fill out this form to request approval for the service."
      />
      <Separator />
      
      {isExtRequiredFormApprovalLink && (
        <Alert className="bg-amber-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This form requires a two-step submission process:
            <ol className="ml-4 mt-2 list-decimal">
              <li>First, complete and submit the vendor&apos;s form below</li>
              <li>Then, verify your information and submit this approval form</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-lg border bg-card p-6">
            {questions?.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={`responses.${index}.answer`}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-base font-semibold">{question.question}</FormLabel>
                    <FormControl>
                      {question.type === "short" ? (
                        <Input {...field} placeholder="Your answer" className="max-w-xl" />
                      ) : (
                        <Textarea {...field} placeholder="Your answer" className="max-w-xl" />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {isExtRequiredFormApprovalLink && (
            <div className="rounded-lg border bg-card">
              <div className="border-b p-4">
                <h3 className="font-semibold">Vendor Form</h3>
                <p className="text-sm text-muted-foreground">Please complete this form before final submission</p>
              </div>
              <iframe
                src={ExtRequiredFormApprovalLink}
                width="100%"
                height="600px"
                style={{ border: 'none' }}
                title="Vendor Form"
              />
            </div>
          )}

          <div className="mx-auto max-w-xl space-y-6">
            <FormField
              control={form.control}
              name="confirmCheck"
              render={({ field }) => (
                <FormItem className="rounded-lg border bg-card p-4">
                  <div className="flex items-start space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="text-base">Information Verification</FormLabel>
                      <FormDescription>
                        {isExtRequiredFormApprovalLink
                          ? "I confirm that I have completed both forms and all information provided is accurate."
                          : "I confirm that all information provided is accurate and complete."}
                      </FormDescription>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="min-w-[200px]"
                disabled={!form.watch("confirmCheck")}
              >
                Submit Application
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}