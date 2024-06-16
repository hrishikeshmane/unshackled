import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type UserColumn } from "./columns"
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
    data: UserColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const onCopy = async (id: string) => {
        await navigator.clipboard.writeText(id);
        toast.success('Billboard Id copied to the clipboard.')
    }

    const updateRoleMutation = api.user.changeUserRole.useMutation({});

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
                    {data.role !== "admin" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: data.id ?? "",
                      role: "admin",
                    })
                  }
                >
                  Change Role to Admin
                </DropdownMenuItem>
              )}
              {/* {data.role !== "vendor" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: String(data.id),
                      role: "vendor",
                    })
                  }
                >
                  Change Role to Vendor
                </DropdownMenuItem>
              )} */}
              {data.role !== "customer" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: data.id ?? "",
                      role: "customer",
                    })
                  }
                >
                  Change Role to Customer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
