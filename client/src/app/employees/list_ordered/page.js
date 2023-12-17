"use client";
import { getOrder } from "@/api/data";
import { CreateOrder } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import OrderTable from "@/components/employee/table/order-table";
import SearchBox from "@/components/employee/search";
import "@/css/employee/customTable.css";
import OrderProgress from "@/components/employee/table/order-progress";
import { useSession } from "next-auth/react";

export default async function page({ searchParams: { page } }) {
  const currentPage = Number(page) || 1;
  const userRole = useSession()?.data?.user?.role;
  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>Danh sách đơn hàng</h3>
        </div>
        {userRole === "TRANSACTION_POINT_EMPLOYEE" && (
          <div className="col btnContainer">
            <CreateOrder />
          </div>
        )}
      </div>

      <div className="row">
        <OrderTable page={currentPage}></OrderTable>
      </div>
    </div>
  );
}
