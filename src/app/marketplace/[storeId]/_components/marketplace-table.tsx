"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ServiceCard from "./service-card";
import MarketplaceFilters from "./filters";
import { DataTablePagination } from "./data-table-pagination";
import { type ModifiedProduct } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MarketplaceTable<TData extends ModifiedProduct, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const featuredProducts = table
    .getRowModel()
    .rows.filter((row) => row.original.isFeatured);
  const otherProducts = table
    .getRowModel()
    .rows.filter((row) => !row.original.isFeatured);

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[300px_1fr]">
        <div className="hidden md:block lg:sticky lg:top-[6.5rem]">
          <MarketplaceFilters table={table} />
        </div>
        <div className="ml-2 grid gap-4">
          {featuredProducts.length > 0 && (
            <>
              <div className="mb-0 ml-2">
                <h2 className="text-2xl font-bold text-primary ">Featured</h2>
                <p className="text-muted-foreground">Featured Services from Unshackled.</p>
              </div>
              {featuredProducts.map((row) => {
                const obj = row.original as ModifiedProduct;
                return <ServiceCard key={obj.id} serviceRecord={obj} />;
              })}
            </>
          )}
          {otherProducts.length > 0 && (
            <>
              <div className="mb-0 ml-2">
                <h2 className="text-2xl font-bold text-primary ">
                  Other Services
                </h2>
                <p className="text-muted-foreground">All other Services.</p>
              </div>
              {otherProducts.map((row) => {
                const obj = row.original as ModifiedProduct;
                return <ServiceCard key={obj.id} serviceRecord={obj} />;
              })}
            </>
          )}
          {table.getRowModel().rows.length === 0 && (
            <div className="py-4 text-center">
              <h2 className="mb-2 text-lg font-bold">No Items Found</h2>
              <p className="text-gray-500">
                We could not find any services matching your criteria.
              </p>
            </div>
          )}
          <div className="flex items-center justify-center">
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketplaceTable;
