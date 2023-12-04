"use client";
import { generatePagination } from "@/api/utils";
import { usePathname, useSearchParams } from "next/navigation";
import "@/css/components/pagination.css";
export default function Pagination({ totalPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const currentPage = Number(searchParams.get("page"));
  // const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPage + 1);
  console.log(allPages);
  return (
    <ul className="pagination position-absolute top-100 start-50 translate-middle">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {allPages.map((page) => {
        return (
          <li className="page-item">
            {/* <button></button> */}
            <a
              className={page != currentPage ? "page-link" : "page-link active"}
              href={createPageURL(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  );
}
