"use Client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type OrdersColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import { useRouter, useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useState, useTransition } from "react";

interface CellActionProps {
  data: OrdersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Order Id copied to the clipboard.");
  };


  const markProductFulfilledMutation = api.product.deleteProductById.useMutation({
    onSuccess: () => {
      toast.success("Congratulation on completing your order!");
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const onOrderComplete = async () => {
    startTransition(() => {
      markProductFulfilledMutation.mutate({ id: data.id });
      setOpen(false);
    });
  };

  return (
    <>
       <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onOrderComplete}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
