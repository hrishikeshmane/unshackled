"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Textarea } from "~/components/ui/textarea";

interface ModalProps {
  children?: React.ReactNode;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  isLive: z.boolean(),
});

export const CreateStoreModal: React.FC<ModalProps> = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  // const [isOpen, setIsOpen] = useState(true);

  const addStoreMutation = api.store.create.useMutation({
    onSuccess: (data) => {
      toast.success("Store created successfully");
      // storeModal.onClose();
      window.location.assign(`/admin/${data?.storeId}`);
    },
    onError: (err) => {
      toast.error(`Something went Wrong ${err.message}`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isLive: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      addStoreMutation.mutate(values);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Store</DialogTitle>
          <DialogDescription>
            Add a new store to manage products and categories
          </DialogDescription>
          <div>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="E-commerce"
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
                              placeholder="E-commerce store"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full items-center justify-end space-x-2 pt-6">
                      <Button disabled={isPending} variant="outline">
                        Cancel
                      </Button>
                      <Button disabled={isPending} type="submit">
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
