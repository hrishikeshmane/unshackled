import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type VendorColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal } from "lucide-react"
import { toast } from "react-hot-toast"
import { api } from "~/trpc/react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

interface CellActionProps {
    data: VendorColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const onCopy = async (id: string) => {
        await navigator.clipboard.writeText(id);
        toast.success('Billboard Id copied to the clipboard.')
    }

    const updateVendorStatus = api.vendor.updateVendorStatus.useMutation({});

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Id
                    </DropdownMenuItem>
                    {data.status !== "pending" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateVendorStatus.mutate({
                      userId: data.userId ?? "",
                      status: "pending",
                    })
                  }
                >
                  Change Status to Pending
                </DropdownMenuItem>
              )}
              {data.status !== "approved" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateVendorStatus.mutate({
                      userId: String(data.userId),
                      status: "approved",
                    })
                  }
                >
                  Change Status to Approved
                </DropdownMenuItem>
              )}
              {data.status !== "denied" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateVendorStatus.mutate({
                      userId: data.userId ?? "",
                      status: "denied",
                    })
                  }
                >
                  Change Status to Denied
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
