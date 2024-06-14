import * as React from "react"
import { type Column } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"

interface SwitchFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
}

export function SwitchFilter<TData, TValue>({
  column,
  title,
}: SwitchFilterProps<TData, TValue>) {
  const [value, setValue] = React.useState<boolean>(false)

  const handleChange = (newValue: boolean) => {
    setValue(newValue)
    column?.setFilterValue(newValue)
  }

  React.useEffect(() => {
    if (!value) {
      column?.setFilterValue(undefined)
    }
  }, [value, column])

  return (
    <div className="w-full">
      {/* {title && <h3 className="mb-2 font-semibold text-lg">{title}</h3>} */}
      <div className="flex items-end justify-between gap-2 px-4">
        <p className="font-semibold text-lg">{title}</p>
        <Switch checked={value} onCheckedChange={handleChange} />
      </div>
    </div>
  )
}
