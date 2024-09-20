"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string().nullable(),
      question: z.string().min(1, "Question is required"),
      type: z.enum(["short", "long"]),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestApprovalForm({ productId, vendorId }: { productId: string, vendorId: string }) {
  const { data: existingQuestions, isLoading } = api.approvalForms.getQuestions.useQuery(
    { productId, vendorId }
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: existingQuestions || [], // Set initial value to an empty array if no data yet
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  useEffect(() => {
    if (existingQuestions) {
      form.reset({ questions: existingQuestions });
    }
  }, [existingQuestions, form]);

  const createOrUpdateQuestionMutation = api.approvalForms.createOrUpdateQuestion.useMutation({
    onSuccess: () => {
      toast.success("Form saved successfully");
    },
    onError: (error) => {
      toast.error(`Error saving form: ${error.message}`);
    },
  });

  const deleteQuestionMutation = api.approvalForms.deleteQuestion.useMutation({
    onSuccess: () => {
      toast.success("Question deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting question: ${error.message}`);
    },
  });

  const onSubmit = (data: FormValues) => {
    data.questions.forEach((question) => {
      createOrUpdateQuestionMutation.mutate({
        id: question.id,
        productId,
        vendorId,
        question: question.question,
        type: question.type,
      });
    });
  };

  const handleDelete = (index: number) => {
    const id = form.getValues(`questions.${index}.id`);
    if (id) {
      deleteQuestionMutation.mutate({ id });
    }
    remove(index);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Heading
        title="Approval Form"
        description="Manage approval form questions for this product"
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <FormField
                control={form.control}
                name={`questions.${index}.question`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter question" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`questions.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="long">Long Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="text-center items-center">
            <Button
                type="button"
                variant="outline"
                onClick={() => append({ id: null, question: "", type: "short" })}
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Question
            </Button>
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="lg">Save Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
