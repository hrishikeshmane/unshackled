import { Input } from "@/components/ui/input";
import { flexRender, type Column, type Table } from "@tanstack/react-table";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import { DataTableFacetedFilter } from "./multi-select-open-filter";
import { SwitchFilter } from "./switchFilter";
import { RangeFilter } from "./range-filter";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";

type Props<TData> = {
  table: Table<TData>;
};

type Options = {
  label: string;
  value: string;
};

export function MarketplaceFilters<TData>({ table }: Props<TData>) {
  const { storeId } = useParams();

  const getTypes = api.types.getTypesByStoreId.useQuery({
    storeId: String(storeId),
  });
  const getTags = api.tag.getTagsByStoreId.useQuery({
    storeId: String(storeId),
  });

  const typeOptions = getTypes.data?.map((type) => ({
    label: type.name,
    value: type.name,
  })) as Options[];

  const tagOptions = getTags.data?.map((tag) => ({
    label: tag.name,
    value: tag.name,
  })) as Options[];

  if (
    getTypes.isLoading ||
    getTags.isLoading ||
    getTypes.isPending ||
    getTags.isPending
  )
    return;
  <div>Loading...</div>;

  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="z-0 grid w-full max-w-full gap-6 p-2">
      <div className="flex justify-between pr-4">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold text-primary">Filters</h1>
          <div className="flex items-center justify-center">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        {isFiltered && (
          <Button
            variant="secondary"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4 text-primary" />
          </Button>
        )}
      </div>
      <nav
        className="grid gap-4 text-sm text-muted-foreground"
        x-chunk="dashboard-04-chunk-0"
      >
        <div className="relative z-0 ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
          <Input
            type="search"
            placeholder="Search products by tagline ..."
            className="bg-white pl-8"
            value={
              (table.getColumn("tagline")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("tagline")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="">
          <div className="flex justify-between">
            {table.getHeaderGroups().map((headerGroup) =>
              // Removed domainRank from the filter
              // headerGroup.headers.map(
              //   (header) =>
              //     (header.id === "price" || header.id === "domainRank") && (
              //       <div key={header.id}>
              //         {header.isPlaceholder
              //           ? null
              //           : flexRender(
              //               header.column.columnDef.header,
              //               header.getContext(),
              //             )}
              //       </div>
              //     ),
              headerGroup.headers.map(
                (header) =>
                  header.id === "price" && (
                    <div key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                  ),
              ),
            )}
          </div>
        </div>
        <div>
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={typeOptions}
          />
        </div>
        <div>
          <DataTableFacetedFilter
            column={table.getColumn("tag")}
            title="Tag"
            options={tagOptions}
          />
        </div>
        {/* <div>
          <>
            {table.getColumn("domainRank") && (
              <RangeFilter
                column={
                  table.getColumn("domainRank") as Column<TData, number>
                }
                title="Domain Ranking"
              />
            )}
          </>
        </div> */}
        <div>
          <SwitchFilter
            column={table.getColumn("isFeatured")}
            title="Featured"
          />
        </div>
      </nav>
    </div>
  );
}

export default MarketplaceFilters;
