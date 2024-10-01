"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ApprovalsColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState, useTransition } from "react";
import Link from "next/link";

interface CellActionProps {
  data: ApprovalsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [approveOpen, setApproveOpen] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Approval request ID copied to the clipboard.");
  };

  // Mutation for approving a request
  const approveRequestMutation = api.approvalForms.approveRequest.useMutation({
    onSuccess: () => {
      toast.success("Request has been approved.");
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  // Mutation for denying a request
  const denyRequestMutation = api.approvalForms.denyRequest.useMutation({
    onSuccess: () => {
      toast.success("Request has been denied and removed.");
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const onApproveRequest = async () => {
    startTransition(() => {
      approveRequestMutation.mutate({ id: data.id });
      setApproveOpen(false);
    });
  };

  const onDenyRequest = async () => {
    startTransition(() => {
      denyRequestMutation.mutate({ id: data.id });
      setDenyOpen(false);
    });
  };

  return (
    <>
      <AlertModal
        isOpen={approveOpen}
        onClose={() => setApproveOpen(false)}
        onConfirm={onApproveRequest}
        loading={isPending}
      />
      <AlertModal
        isOpen={denyOpen}
        onClose={() => setDenyOpen(false)}
        onConfirm={onDenyRequest}
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
            Copy ID
          </DropdownMenuItem>
          {
            data.status === "pending" &&
            <DropdownMenuItem onClick={() => setApproveOpen(true)}>
              Approve Request
            </DropdownMenuItem>
          }
          { data.status === "pending" && 
            <DropdownMenuItem onClick={() => setDenyOpen(true)}>
              Deny Request
            </DropdownMenuItem>
          }
          <DropdownMenuItem>
          <Link href={`/vendor/approvals/${data.productId}/${data.customerId}`}>
            View Form Responses
          </Link>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
