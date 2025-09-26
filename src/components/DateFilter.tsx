import React from "react";
import { Input } from "./ui/input";
import { Settings2 } from "lucide-react";
import { Button } from "./ui/button";
import { Filter } from "./Filter";

interface DateFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function DateFilter({
  searchTerm,
  setSearchTerm,
}: DateFilterProps) {
  return (
    <main className="flex items-center space-x-2">
      <div className="relative ">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-4 pr-10 w-64 outline-none appearance-none border-border"
        />
        <Filter>
          <Button
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-10 p-0 bg-text-clicked hover:bg-text-clicked2 rounded-s-none"
          >
            <Settings2 className="h-4 w-4 text-white" />
          </Button>
        </Filter>
      </div>
    </main>
  );
}
