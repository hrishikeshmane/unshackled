"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export type ModifiedProduct = {
  id: string;
  name: string;
  store: string;
  tag: string;
    type: string;
  tagline: string;
  logo: string;
  price: number;
  domainRank: number;
  isFeatured: boolean;
  createdAt: Date;
  estTurnAroundTime: number;
};

export const columns: ColumnDef<ModifiedProduct>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "tagline",
    header: "Tagline",
  },
  {
    accessorKey: "logo",
    header: "Logo",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4 text-primary" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4 text-primary" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4 text-primary" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "domainRank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Domain Rank
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4 text-primary" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4 text-primary" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4 text-primary" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "estTurnAroundTime",
    header: "Estimated Turnaround Time",
  },
];
