"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="d-flex justify-content-between">
      <form className="w-100 h-100 align-items-center">
        <input
          className="w-75 h-100 rounded border"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          required />
        <Button className="w-30 h-100 ms-3">Tra cứu</Button>
      </form>
    </div>
  );
}
