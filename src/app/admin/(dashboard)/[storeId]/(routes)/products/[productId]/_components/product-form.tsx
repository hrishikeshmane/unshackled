"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, RocketIcon, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import {
  type TagTable,
  type TypeTable,
  type ProductWithRelations,
} from "~/types/globals";
import { api } from "~/trpc/react";
import ImageUpload from "~/app/admin/_components/image-upload";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Question = {
  type: "short" | "long";
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  productId: string;
  vendorId: string;
  question: string;
};

const pricingPlanSchema = z.object({
  label: z.string().min(1, "Label is required"),
  description: z.string().min(1, "Label is required"),
  price: z.string().min(1, "Label is required"),
});

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().min(1),
  // price: z.string().min(1),
  // estTurnAroundTime: z.string().min(1),
  // commission: z.string().min(1),
  price: z.coerce.number().min(0.01),
  estTurnAroundTime: z.coerce.number().min(1),
  commission: z.coerce.number().min(0),
  commissionType: z.enum(["percentage", "flat"]),
  stripeId: z.string(),
  imageUrl: z.string().min(1),
  // domainRank: z.string().min(1),
  // domainRank: z.coerce.number().int().min(1),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  isApproved: z.enum(["approved", "pending", "denied"]),
  requiresVendorApproval: z.boolean().default(false),
  isExtRequiredFormApprovalLink: z.boolean().default(false),
  ExtRequiredFormApprovalLink: z.string(),
  hasDownPayment: z.boolean().default(false),
  pricingPlans: z.array(pricingPlanSchema),
  hasPricingPlans: z.boolean().default(false),
  downPayment: z.coerce.number().min(0),
  orderCommunicationEmail: z.string(),
  additionalOrderEmailText: z.string(),
  hasAdditionalLink: z.boolean(),
  additionalLinkLabel: z.string(),
  additionalLinkUrl: z.string(),
  tagId: z.string().min(1),
  typeId: z.string().min(1),
  questions: z.array(
    z.object({
      id: z.string().nullable(),
      question: z.string().min(1, "Question is required"),
      type: z.enum(["short", "long"]),
    })
  ),
  // images: z.object({ url: z.string() }).array(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: ProductWithRelations | null | undefined;
  tags: TagTable[];
  types: TypeTable[];
  questions: Question[] | [];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  tags,
  types,
  questions,
}) => {
  const [isPending, startTransition] = useTransition();

  const { userId, isLoaded, isSignedIn } = useAuth();

  const title = initialData?.id ? "Edit Service" : "Create Service";
  const description = initialData?.id ? "Edit a Service" : "Add a new Service";
  const toastMessage = initialData?.id
    ? "Service updated."
    : "Service created.";
  const action = initialData?.id ? "Save changes" : "Create";

  const createOrUpdateProductMutation =
    api.product.createOrUpdateProduct.useMutation({
      onSuccess: () => {
        toast.success(`${toastMessage} successfully`);
        router.push(`/admin/${String(params.storeId)}/products`);
      },
      onError: (err) => {
        toast.error(`Something went wrong: ${err.message}`);
      },
    });

  const deleteProductMutation = api.product.deleteProductById.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      router.push(`/admin/${String(params.storeId)}/products`);
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  // const modifiedInitialData = initialData
  //   ? {
  //       ...initialData,
  //       price: Number(initialData.price) || 0,
  //       estTurnAroundTime: Number(initialData.estTurnAroundTime) || 0,
  //       domainRank: Number(initialData.domainRank) || 0,
  //       commission: Number(initialData.commission) || 0,
  //     }
  //   : {
  //       name: "",
  //       description: "",
  //       tagline: "",
  //       price: 0,
  //       commission: 0,
  //       commissionType: "percentage",
  //       estTurnAroundTime: 0,
  //       stripeId: "",
  //       imageUrl: "",
  //       domainRank: 0,
  //       isFeatured: false,
  //       isArchived: false,
  //       isApproved: "pending",
  //       tagId: "",
  //       typeId: "",
  //     };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    // defaultValues: modifiedInitialData,
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseInt(initialData.price) || 0,
          estTurnAroundTime: Number(initialData.estTurnAroundTime) || 0,
          // domainRank: Number(initialData.domainRank) || 0,
          commission: Number(initialData.commission) || 0,
          downPayment: Number(initialData.downPayment) || 0,
          questions: questions,
        }
      : {
          name: "",
          description: "",
          tagline: "",
          price: 0,
          commission: 0,
          commissionType: "percentage",
          estTurnAroundTime: 0,
          stripeId: "",
          imageUrl: "",
          // domainRank: 0,
          isFeatured: false,
          isArchived: false,
          isApproved: "pending",
          tagId: "",
          typeId: "",
          requiresVendorApproval: false,
          isExtRequiredFormApprovalLink: false,
          ExtRequiredFormApprovalLink: "",
          hasDownPayment: false,
          pricingPlans: [],
          hasPricingPlans: false,
          downPayment: 0,
          orderCommunicationEmail: "",
          additionalOrderEmailText: "",
          hasAdditionalLink: false,
          additionalLinkLabel: "",
          additionalLinkUrl: "",
          questions: questions,
          // images: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const { fields: pricingPlanFields, append: appendPricingPlan, remove: removePricingPlan } = useFieldArray({
    control: form.control,
    name: "pricingPlans",
  });

  const requiresVendorApprovalState = form.watch("requiresVendorApproval")

  const createOrUpdateQuestionMutation = api.approvalForms.createOrUpdateQuestion.useMutation({
    onSuccess: () => {
      toast.success("Questions saved successfully");
    },
    onError: (error) => {
      toast.error(`Error saving questions: ${error.message}`);
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

  const handleDelete = (index: number) => {
    const id = form.getValues(`questions.${index}.id`);
    if (id) {
      deleteQuestionMutation.mutate({ id });
    }
    remove(index);
  };

  const onSubmit = (data: ProductFormValues) => {
    // console.log("FORM valiation errors>>", form.formState.errors);
    // console.log("PRODUCT DATA>>", data);
    // console.log("IS Pending>>", isPending);
    // console.log("QUESTIONS >> ", data.questions);

    // console.log("FORM CHANGED >> ", form.formState.isDirty)

    startTransition(() => {
      createOrUpdateProductMutation.mutate({
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        price: String(data.price),
        commission: String(data.commission),
        commissionType: data.commissionType,
        stripeId: "xxx",
        imageUrl: data.imageUrl,
        estTurnAroundTime: String(data.estTurnAroundTime),
        // domainRank: String(data.domainRank),
        domainRank: "0",
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        isApproved: data.isApproved,
        requiresVendorApproval: data.requiresVendorApproval,
        isExtRequiredFormApprovalLink: data.isExtRequiredFormApprovalLink,
        ExtRequiredFormApprovalLink: data.ExtRequiredFormApprovalLink,
        hasDownPayment: data.hasDownPayment,
        downPayment: String(data.downPayment),
        pricingPlans: data.pricingPlans,
        hasPricingPlans: data.hasPricingPlans,
        orderCommunicationEmail: data.orderCommunicationEmail,
        additionalOrderEmailText: data.additionalOrderEmailText,
        hasAdditionalLink: data.hasAdditionalLink,
        additionalLinkLabel: data.additionalLinkLabel,
        additionalLinkUrl: data.additionalLinkUrl,
        tagId: data.tagId,
        typeId: data.typeId,
        creatorId: initialData?.creatorId
          ? initialData.creatorId
          : String(userId),
        id: initialData?.id,
        storeId: String(params.storeId),
        questions: data.questions,
      });
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteProductMutation.mutate({ id: String(params.productId) });
    });
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData?.id && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isPending}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Alert variant={"primary"}>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Approval Checklist!</AlertTitle>
        <AlertDescription>
          <>
          <p className="mb-4">Before each approval, please ensure you follow these important rules:</p>
          <ul className="list-disc list-inside space-y-1">
            <li className="text-gray-700">
              Thoroughly read through every field and promptly edit or take action as required.
            </li>
            <li className="text-gray-700">
              Verify that all links and supporting text provided by the vendor are appropriate and do not violate any guidelines.
            </li>
            <li className="text-gray-700">
              For commission agreements: if the service offers downpayment options, it is mandatory to apply a flat fee commission, regardless of the vendor arrangement.
              <br />
              <span className="italic text-gray-600">Example: If you have a percentage arrangement with the vendor but they opt for a downpayment, ensure you convert it to a flat fee beforehand.</span>
            </li>
          </ul>
          </>
        </AlertDescription>
      </Alert>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Image (Logo)<span className="ml-1 text-red-500">*</span></FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              {/* <div className="flex gap-8"></div> */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name<span className="ml-1 text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Service Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline<span className="ml-1 text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Service Tagline"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description<span className="ml-1 text-red-500">*</span></FormLabel>
                    <FormControl>
                      {/* <Textarea
                        disabled={isPending}
                        placeholder="Service description"
                        {...field}
                      /> */}
                        <ReactQuill
                          readOnly={isPending}
                          placeholder="Service description"
                          value={field.value} // Use the field value from react-hook-form
                          onChange={field.onChange} // Use the onChange to update the field value
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type<span className="ml-1 text-red-500">*</span></FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag<span className="ml-1 text-red-500">*</span></FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Tag"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estTurnAroundTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Est. TurnAround Time (In days)<span className="ml-1 text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="EstTurnAround Time (days)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Pricing</h3>
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-8">
            {/* <FormField
              control={form.control}
              name="domainRank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Rank</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="Domain Ranking"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (In USD)<span className="ml-1 text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="Service Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commissionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Type<span className="ml-1 text-red-500">*</span></FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Commission Type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Figure (Percent/Flat Fee(USD))<span className="ml-1 text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="Commission"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            {/* <FormField
              control={form.control}
              name="requiresVendorApproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Requires Vendor Approval</FormLabel>
                    <FormDescription>
                      The product will require vendor approval before placing an order.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="hasDownPayment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Down Payment Plan</FormLabel>
                    <FormDescription>
                      Indicates if this Service has down payment plan.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Down Payment Amount (In USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="DownPayment Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Pricing Plans</h3>
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="hasPricingPlans"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show Pricing Plans?</FormLabel>
                    <FormDescription>
                      If you opt to have multiple pricing plans, please enter the minimum plan amount in price field as a placeholder.
                      Also, in future you decide to opt out of multiple pricing plans, enter fixed rate in the price field.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            </div>
          <div className="space-y-4">
            {pricingPlanFields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-2">
                <FormField
                  control={form.control}
                  name={`pricingPlans.${index}.label`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter plan label" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingPlans.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter plan description" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingPlans.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter price" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removePricingPlan(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="text-center items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => appendPricingPlan({ label: "", description: "", price: "" })}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Pricing Plan
              </Button>
            </div>
          </div>

          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Communication</h3>
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="hasAdditionalLink"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Additional Link?</FormLabel>
                    <FormDescription>
                      Select if you want additional link/button included.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalLinkLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Link label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Calendly Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalLinkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Link Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="https://calendly.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="orderCommunicationEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Communication Email</FormLabel>
                  <FormDescription>
                      Additional Email where you want order details and communications to happen.
                    </FormDescription>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="hello@yourservices.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalOrderEmailText"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Message for the buyer</FormLabel>
                  <FormDescription>
                      Additional message to be added at end of order confirmation email for customer.
                    </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Text to be added at the end of order email."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Requires Vendor Approval</h3>
            <>
              <ul>
                <li>If Vendor approval is required for the customer, and you can approve requests based on the form responses provided.</li>
                <li>If you prefer to use your own form, Unshackled will supply you with a payment link for customers, which you can send directly after approval.</li>
                <li>Alternatively, if you choose to utilize Unshackled's built-in forms, you will be able to manage customer requests directly from the dashboard, and we will handle all communications.</li>
              </ul>
            </>
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="requiresVendorApproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Requires Vendor Approval?</FormLabel>
                    <FormDescription>
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {/* {
              initialData && 
              <div className="inline-flex items-center gap-2">
                <h2 className="text-lg m-0 p-0">Form &rarr;</h2>
                <Link href={`/admin/${initialData.storeId}/products/${initialData.id}/approvalForms/`} className="text-lg">
                  <p className="m-0 p-0">Create/Edit Form</p>
                </Link>
              </div>
            } */}
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="isExtRequiredFormApprovalLink"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Custom Approval Form?</FormLabel>
                    <FormDescription>
                      Select if you have your own custom approval form and want to use that.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ExtRequiredFormApprovalLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Approval form link URL.</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="https://www.yoursite/customForm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-xl">Approval Form Questions:</FormLabel>
            <FormDescription>
              Add questions you would like to get information from a customer for approval, this will generate a form.
            </FormDescription>
          </div>
          <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <FormField
                control={form.control}
                name={`questions.${index}.question`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!requiresVendorApprovalState} placeholder="Enter question" />
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
                    <Select onValueChange={field.onChange} disabled={!requiresVendorApprovalState} defaultValue={field.value}>
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
                disabled={!requiresVendorApprovalState}
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
                disabled={!requiresVendorApprovalState}
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Question
            </Button>
          </div>
          </div>
          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Admin</h3>
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      The service will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      The service will appear nowhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isApproved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approval<span className="ml-1 text-red-500">*</span></FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Approval Status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button onClick={() =>debug()}>DEBUG</Button> */}
          <Button disabled={isPending || !form.formState.isDirty} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
