"use Client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type OrdersColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal } from "lucide-react"
import { toast } from "react-hot-toast"

interface CellActionProps {
    data: OrdersColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    
    
    const onCopy = async (id: string) => {
        await navigator.clipboard.writeText(id);
        toast.success('Billboard Id copied to the clipboard.')
    }


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
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}