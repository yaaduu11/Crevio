"use client"

import * as React from "react"

import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

type Status = {
  value: string
  label: string
}

interface ComboboxProps {
    statuses : Status[]
}

export function ComboboxPopover({statuses}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses[0]
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-white text-md text-muted-foreground">Most Popular Plan</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start border-white text-white">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 text-white bg-black border border-white" side="right" align="start">
            <Command className="text-white bg-black">
                {/* <CommandInput placeholder="Change status..." className="text-white bg-black border-white" /> */}
                <CommandList>
                <CommandEmpty className="text-white">No results found.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((status) => (
                    <CommandItem
                        key={status.value}
                        value={status.value}
                        className="text-white hover:bg-gray-800"
                        onSelect={(value) => {
                        setSelectedStatus(
                            statuses.find((priority) => priority.value === value) || null
                        );
                        setOpen(false);
                        }}
                    >
                        {status.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
