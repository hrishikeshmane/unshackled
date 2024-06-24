"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type TagColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import { api } from "~/trpc/react";

interface CellActionProps {
  data: TagColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const deleteTagMutation = api.tag.deleteTagById.useMutation({
    onSuccess: () => {
      toast.success("Tag deleted successfully");
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Tag Id copied to the clipboard.");
  };

  const onDelete = async () => {
    startTransition(() => {
      deleteTagMutation.mutate({ id: data.id });
      setOpen(false);
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
          <DropdownMenuItem
            onClick={() =>
              router.push(`/admin/${String(params.storeId)}/tags/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
