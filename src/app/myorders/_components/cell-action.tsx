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
import { api } from "~/trpc/react";
import { useState } from "react";

interface CellActionProps {
  data: OrdersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [alertOpen, setAlertOpen] = useState(false); 
  const [isPending, setIsPending] = useState(false); 

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Order Id copied to the clipboard.");
  };

  const retryPayment = api.payment.retryPayment.useMutation({
    onSuccess: (response) => {
      toast.success("Payment retry initiated!");
      setAlertOpen(false);
      setIsPending(false);
      window.location.href = response.sessionUrl;
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
      setIsPending(false);
    },
  });

  const onRetryPayment = async () => {
    setIsPending(true); 
    retryPayment.mutate({ orderId: data.orderId });
  };

  const showRetryPayment = data.paymentStatus === "Payment Failed" && data.approval === "accepted";

  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={onRetryPayment}
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
          {showRetryPayment && (
            <DropdownMenuItem onClick={() => setAlertOpen(true)}>
              Retry Payment
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};