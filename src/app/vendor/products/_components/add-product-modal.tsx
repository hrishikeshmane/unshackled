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
import { Button } from "~/components/ui/button";
import { useTransition } from "react";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface ModalProps {
  children?: React.ReactNode;
}

const formSchema = z.object({
  store: z.string().min(1),
});

export const AddStoreModal: React.FC<ModalProps> = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  // const [isOpen, setIsOpen] = useState(true);

  const getStores = api.store.getStores.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      window.location.assign(`/vendor/products/${values.store}/product/new`);
    });
  };

  if (getStores.isPending) {
    return <div>Loading...</div>;
  }

  if (getStores.error) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Store</DialogTitle>
          <DialogDescription>
            Select store in which you would like to create your new product.
          </DialogDescription>
          <div>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="store"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store</FormLabel>
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
                              {getStores &&
                                getStores.data.map((type) => (
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
