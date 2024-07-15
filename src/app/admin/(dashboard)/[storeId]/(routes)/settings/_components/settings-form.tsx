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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import { type StoreTable } from "~/types/globals";
import { api } from "~/trpc/react";
import { desc } from "drizzle-orm";
import { Textarea } from "~/components/ui/textarea";

interface SettingsFromProps {
  initialData: StoreTable;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFromProps> = ({ initialData }) => {
  const [isPending, startTransition] = useTransition();

  const addStoreMutation = api.store.deleteStorebyId.useMutation({
    onSuccess: () => {
      toast.success("Store deleted successfully");
      router.push("/admin");
    },
    onError: (err) => {
      toast.error(`Something went Wrong ${err.message}`);
    },
  });

  const updateStoreMutation = api.store.updateStore.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Store updated successfully");
    },
    onError: (err) => {
      toast.error(`Something went Wrong ${err.message}`);
    },
  });

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description!,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    startTransition(() => {
      updateStoreMutation.mutate({
        id: initialData.id,
        name: data.name,
        description: data.description,
      });
    });
  };

  const onDelete = () => {
    startTransition(() => {
      addStoreMutation.mutate({ id: initialData.id });
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store preferences" />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          disabled={isPending}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
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
                      placeholder="Store name"
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
                      placeholder="Store description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
