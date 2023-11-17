"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function SearchEmployee() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    console.log(params);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });
  return (
    <div className="box-search">
      <input
        className="search-input"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
