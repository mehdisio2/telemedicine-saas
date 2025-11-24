"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchFilter({ value, onChange, placeholder = "Search..." }: SearchFilterProps) {
  return (
    <section className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4 px-4" aria-label="Search appointments">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-4 py-2 w-full"
            aria-label="Search appointments by patient name or type"
          />
        </div>
      </div>
    </section>
  )
}
