"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@clerk/nextjs";
import { RocketIcon } from "@radix-ui/react-icons";
import { Checkbox } from "~/components/ui/checkbox";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().min(1),
  // price: z.string().min(1),
  // estTurnAroundTime: z.string().min(1),
  price: z.coerce.number().min(0.01),
  estTurnAroundTime: z.coerce.number().min(1),
  stripeId: z.string(),
  imageUrl: z.string().min(1),
  // domainRank: z.string().min(1),
  // domainRank: z.coerce.number().int().min(1),
  tagId: z.string().min(1),
  typeId: z.string().min(1),
  requiresVendorApproval: z.boolean().default(false),
  hasDownPayment: z.boolean().default(false),
  downPayment: z.coerce.number().min(0.01),
  orderCommunicationEmail: z.string(),
  additionalOrderEmailText: z.string(),
  hasAdditionalLink: z.boolean(),
  additionalLinkLabel: z.string(),
  additionalLinkUrl: z.string(),
  // images: z.object({ url: z.string() }).array(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: ProductWithRelations | null | undefined;
  tags: TagTable[];
  types: TypeTable[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  tags,
  types,
}) => {
  const [isPending, startTransition] = useTransition();

  const { userId, isLoaded, isSignedIn } = useAuth();

  const title = initialData?.id ? "Edit Product" : "Create Product";
  const description = initialData?.id ? "Edit a Product" : "Add a new Product";
  const toastMessage = initialData?.id
    ? "Product updated."
    : "Product created.";
  const action = initialData?.id ? "Save changes" : "Create";

  const createOrUpdateProductMutation =
    api.product.createOrUpdateProduct.useMutation({
      onSuccess: () => {
        toast.success(`${toastMessage} successfully`);
        router.push(`/vendor/products`);
      },
      onError: (err) => {
        toast.error(`Something went wrong: ${err.message}`);
      },
    });

  const deleteProductMutation = api.product.deleteProductById.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      router.push(`/vendor/products`);
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const modifiedInitialData = initialData
    ? {
        ...initialData,
        price: Number(initialData.price) || 0,
        estTurnAroundTime: Number(initialData.estTurnAroundTime) || 0,
        // domainRank: Number(initialData.domainRank) || 0,
        downPayment: Number(initialData.downPayment) || 0,
      }
    : {
        name: "",
        description: "",
        tagline: "",
        price: 0,
        estTurnAroundTime: 0,
        stripeId: "",
        imageUrl: "",
        // domainRank: 0,
        tagId: "",
        typeId: "",
        requiresVendorApproval: false,
        hasDownPayment: false,
        downPayment: 0,
        orderCommunicationEmail: "",
        additionalOrderEmailText: "",
        hasAdditionalLink: false,
        additionalLinkLabel: "",
        additionalLinkUrl: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: modifiedInitialData,
    // defaultValues: initialData ?? {
    //   name: "",
    //   description: "",
    //   tagline: "",
    //   price: "",
    //   estTurnAroundTime: "",
    //   stripeId: "",
    //   imageUrl: "",
    //   domainRank: "",
    //   tagId: "",
    //   typeId: "",
    // },
  });

  const onSubmit = (data: ProductFormValues) => {
    // console.log("FORM valiation errors>>", form.formState.errors);
    // console.log("PRODUCT DATA>>", data);
    // console.log("IS Pending>>", isPending);

    startTransition(() => {
      createOrUpdateProductMutation.mutate({
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        price: String(data.price),
        commission: initialData?.commission
          ? String(initialData?.commission ?? 0)
          : "20",
        commissionType: initialData?.commissionType
          ? initialData?.commissionType
          : "percentage",
        stripeId: "xxx",
        imageUrl: data.imageUrl,
        estTurnAroundTime: String(data.estTurnAroundTime),
        // domainRank: String(data.domainRank),
        domainRank: "0",
        isFeatured: false,
        isArchived: false,
        isApproved: "pending",
        requiresVendorApproval: data.requiresVendorApproval,
        hasDownPayment: data.hasDownPayment,
        downPayment: String(data.downPayment),
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
      {/* <div className="sticky top-16 flex h-12 w-screen items-center justify-center bg-primary text-primary-foreground">
        Your listings are subject to approval. New/Edited Listings will not be
        visible until approved.
      </div> */}
      <Alert variant={"primary"}>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          <>
            New/Edited listings will not be visible until approved. Listings are
            subject to a commission around 20% of the listing price. Final
            commission will be decided when approved.
          </>
        </AlertDescription>
      </Alert>
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
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image (Logo)</FormLabel>
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Product Name"
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
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Product Tagline"
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estTurnAroundTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Est. TurnAround Time</FormLabel>
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="Product Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
                  <FormLabel>Tag</FormLabel>
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
                    <FormLabel>DownPayment Plan</FormLabel>
                    <FormDescription>
                      Indicates if this product has down payment plan.
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
                  <FormLabel>DownPayment Amount</FormLabel>
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
            <FormField
              control={form.control}
              name="orderCommunicationEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Communication Email</FormLabel>
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
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
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
                    <Textarea
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
          <div className="my-4">
            <h3 className="p-1 text-2xl font-bold">Requires Vendor Approval</h3>
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
                    <FormLabel>Requires Vendor Approval</FormLabel>
                    <FormDescription>
                      This product will require vendor approval first for the customer.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {
              initialData && 
              <div className="inline-flex items-center gap-2">
                <h2 className="text-lg m-0 p-0">Form &rarr;</h2>
                <Link href={`/vendor/${initialData.storeId}/product/${initialData.id}/approvalForms/`} className="text-lg">
                  <p className="m-0 p-0">Create/Edit Form</p>
                </Link>
              </div>
            }
          </div>
          {/* <Button onClick={() =>debug()}>DEBUG</Button> */}
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
