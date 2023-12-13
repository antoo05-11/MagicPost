"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "react-bootstrap";

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

  const handleClick = () => {
    // Perform additional actions or handle the click event here
    // For example, you can trigger the search with the current input value
    const inputValue = document.getElementById("searchInput").value;
    handleSearch(inputValue);
  };

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
