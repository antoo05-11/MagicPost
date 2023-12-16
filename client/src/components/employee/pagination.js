"use client";
import { generatePagination } from "@/api/utils";
import { usePathname, useSearchParams } from "next/navigation";
import "@/css/components/pagination.css";
import Link from "next/link";
export default function Pagination({ totalPage }) {
  if (!totalPage) totalPage = 1;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPage);
  return (
    <ul className="pagination d-flex justify-content-center ">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {allPages.map((page) => {
        return (
          <li className="page-item">
            {/* <button></button> */}
            <Link
              className={page != currentPage ? "page-link" : "page-link active"}
              href={createPageURL(page)}
            >
              {page}
            </Link>
          </li>
        );
      })}
      <li className="page-item" aria-disabled="false">
        <Link className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </Link>
      </li>
    </ul>
  );
}
