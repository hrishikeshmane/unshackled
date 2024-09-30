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
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState, useTransition } from "react";

interface CellActionProps {
  data: OrdersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Order Id copied to the clipboard.");
  };

  const markProductFulfilledMutation = api.order.updateOrderItemIsFulfilled.useMutation({
    onSuccess: () => {
      toast.success("Congratulation on completing your order!");
      router.refresh(); 
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const refundOrder = api.payment.refundOrder.useMutation({
    onSuccess: () => {
      toast.success("Refund Initiated, should reflect soon!");
      router.refresh(); 
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const rejectOrder = api.payment.rejectOrder.useMutation({
    onSuccess: () => {
      toast.success("Order has been rejected and refunded!");
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

  const onRefund = async () => {
    startTransition(() => {
      refundOrder.mutate({ orderId: data.orderId });
      setRefundOpen(false);
    });
  };

  const onRejectOrder = async () => {
    startTransition(() => {
      rejectOrder.mutate({ orderId: data.orderId });
      setDenyOpen(false);
    });
  };

  const hideRefund = [
    "Refund Initiated",
    "Refund Successful",
    "Payment Reverted",
    "Reverting Payment",
  ].includes(data.paymentStatus) || data.approval === "denied" || data.isFullfilled === true;

  const hideDeny = hideRefund || data.approval === "denied" || data.isFullfilled === true;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onOrderComplete}
        loading={isPending}
      />
      <AlertModal
        isOpen={refundOpen}
        onClose={() => setRefundOpen(false)}
        onConfirm={onRefund}
        loading={isPending}
      />
      <AlertModal
        isOpen={denyOpen}
        onClose={() => setDenyOpen(false)}
        onConfirm={onRejectOrder}
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
          {!hideRefund && (
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Mark Completed
              </DropdownMenuItem>
            )
          }
          {!hideRefund && (
            <DropdownMenuItem onClick={() => setRefundOpen(true)}>
              Refund Order
            </DropdownMenuItem>
          )}
          {/* {!hideDeny && (
            <DropdownMenuItem onClick={() => setDenyOpen(true)}>
              Deny Order
            </DropdownMenuItem>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};