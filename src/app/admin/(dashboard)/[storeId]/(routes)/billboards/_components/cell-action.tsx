"use Client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertModal } from "~/app/admin/_components/modals/alert-modal";
import { api } from "~/trpc/react";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const deleteBillboardMutation = api.billboard.deleteBillboardById.useMutation(
    {
      onSuccess: () => {
        toast.success("Billboard deleted successfully");
        router.refresh();
        // router.push(`/admin/${String(params.storeId)}/billboards`);
      },
      onError: (err) => {
        toast.error(`Something went wrong: ${err.message}`);
      },
    },
  );

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("Billboard Id copied to the clipboard.");
  };

  const onDelete = async () => {
    startTransition(() => {
      deleteBillboardMutation.mutate({ id: data.id });
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
              router.push(
                `/admin/${String(params.storeId)}/billboards/${data.id}`,
              )
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
