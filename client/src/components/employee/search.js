"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function SearchEmployee() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    // console.log(params);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    // <div className="box-search">
    // <input
    //   className="search-input"
    // onChange={(e) => {
    //   handleSearch(e.target.value);
    // }}
    //   placeholder="Search"
    //   defaultValue={searchParams.get("query")?.toString()}
    // />
    // </div>
    <div className="row input-group">
      <input
        type="text"
        className="form-control col"
        aria-label="Text input with segmented dropdown button"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <select className=" col-2" id="inputGroupSelect02">
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <label className="input-group-text col-1" for="inputGroupSelect02">
        Options
      </label>
    </div>
  );
}
