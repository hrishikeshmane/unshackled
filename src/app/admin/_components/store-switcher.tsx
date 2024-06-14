"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "~/lib/utils";
import { type StoreTable } from "~/types/globals";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "~/components/ui/command";
import { CreateStoreModal } from "./modals/create-store-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: StoreTable[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(true);
        router.push(`/admin/${store.value}`)
    }


    return (
        <Popover onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" role="combobox" aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between", className)}>
                    <StoreIcon className="w-4 h-4 mr-2" />
                        {currentStore?.label}
                    <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store, index) =>(
                                <CommandItem key={index} onSelect={() => onStoreSelect(store)} className="text-sm">
                                    <StoreIcon className="w-4 h-4 mr-2" />
                                    {store.label}
                                    <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            {/* <CommandItem >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create Store
                            </CommandItem> */}
                            <CreateStoreModal>
                                {/* <CommandItem> */}
                                    <Button variant="ghost" className="w-full">
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Create Store
                                    </Button>
                                {/* </CommandItem> */}
                            </CreateStoreModal>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}