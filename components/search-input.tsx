"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  function handleSearchByName(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`?${params.toString()}`);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    handleSearchByName(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={(event) => setSearchTerm(event.target.value)}
        defaultValue={searchParams.get("search"?.toString()) || ""}
      />
    </div>
  );
}
