"use Client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type TypeColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useRouter, useParams } from "next/navigation"
import { useState, useTransition } from "react"
import { AlertModal } from "~/app/admin/_components/modals/alert-modal"
import { api } from "~/trpc/react"

interface CellActionProps {
    data: TypeColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const deleteTypeMutation = api.types.deleteTypeById.useMutation({
        onSuccess: () => {
            toast.success("Type deleted successfully");
            router.refresh();
            // router.push(`/admin/${String(params.storeId)}/billboards`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    })

    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    const onCopy = async (id: string) => {
        await navigator.clipboard.writeText(id);
        toast.success('Type Id copied to the clipboard.')
    }

    const onDelete = async () => {
            startTransition(() => {
                deleteTypeMutation.mutate({ id: data.id });
                setOpen(false);
            })
    }

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={isPending}/>
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
                    <DropdownMenuItem onClick={() => router.push(`/admin/${String(params.storeId)}/types/${data.id}`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={() => setOpen(true)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}