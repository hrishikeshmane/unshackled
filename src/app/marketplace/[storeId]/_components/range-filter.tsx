import React, { useState } from "react";
import { type Column, getFacetedUniqueValues } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RangeSlider } from "@/components/ui/range-slider";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type FacetedUniqueValue<TValue> = Map<TValue, number>;

interface RangeFilterProps<TData, TValue extends number> {
  column: Column<TData, TValue>;
  title: string;
}

export function RangeFilter<TData, TValue extends number>({
  column,
  title,
}: RangeFilterProps<TData, TValue>) {
  const [minValue, setMinValue] = useState<TValue | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<TValue | undefined>(undefined);

  const handleMinChange = (value: number | undefined) => {
    if (typeof value === "number") {
      setMinValue(value as TValue);
      column.setFilterValue((old: [TValue, TValue] | undefined) => [
        value as TValue,
        old?.[1] ?? maxValue ?? Infinity,
      ]);
    } else {
      setMinValue(undefined);
      column.setFilterValue((old: [TValue, TValue] | undefined) => [
        0 as TValue,
        old?.[1] ?? maxValue ?? Infinity,
      ]);
    }
  };

  const handleMaxChange = (value: number | undefined) => {
    if (typeof value === "number") {
      setMaxValue(value as TValue);
      column.setFilterValue((old: [TValue, TValue] | undefined) => [
        old?.[0] ?? minValue ?? -Infinity,
        value as TValue,
      ]);
    } else {
      setMaxValue(undefined);
      column.setFilterValue((old: [TValue, TValue] | undefined) => [
        old?.[0] ?? minValue ?? -Infinity,
        Infinity as TValue,
      ]);
    }
  };

  const columnValues = Array.from(
    column.getFacetedUniqueValues() as FacetedUniqueValue<TValue>,
  ).map(([value]) => value);
  const minColumnValue = Math.min(...columnValues);
  const maxColumnValue = Math.max(...columnValues);

  return (
    <div className="w-full">
      <h3 className="flex gap-2 mb-2 text-lg font-semibold">
        {title}
        {/* <HoverCard>
        <HoverCardTrigger><Info size={12} className='text-primary' /></HoverCardTrigger>
        <HoverCardContent>
            Blah blah .....
        </HoverCardContent>
        </HoverCard> */}
        </h3>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={minValue ?? ""}
          onChange={(e) =>
            handleMinChange(
              e.target.value ? (Number(e.target.value) as TValue) : undefined,
            )
          }
          placeholder={`Min (${minColumnValue})`}
          className="w-32"
        />
        <Input
          type="number"
          value={maxValue ?? ""}
          onChange={(e) =>
            handleMaxChange(
              e.target.value ? (Number(e.target.value) as TValue) : undefined,
            )
          }
          placeholder={`Max (${maxColumnValue})`}
          className="w-32"
        />
      </div>
      {/* <Slider
        min={minColumnValue}
        max={maxColumnValue}
        value={[minValue ?? minColumnValue, maxValue ?? maxColumnValue]}
        onValueChange={([min, max]) => {
          handleMinChange(min);
          handleMaxChange(max);
        }}
        step={1}
        className="mt-2"
      /> */}
      <div className="mt-4">
        <RangeSlider
            min={minColumnValue - 10}
            max={maxColumnValue + 10}
            value={[minValue ?? minColumnValue, maxValue ?? maxColumnValue]}
            onValueChange={([min, max]) => {
            handleMinChange(min);
            handleMaxChange(max);
            }}
        />
      </div>
    </div>
  );
}
