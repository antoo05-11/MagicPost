"use client";
import { CreateOrder } from "@/components/employee/button";
import OrderTable from "@/components/employee/table/order-table";
import { useSession } from "next-auth/react";

export default async function page({
  searchParams: { page, orderID, startAddress, endAddress, status, timeCreate },
}) {
  const query = {
    orderID: orderID,
    startAddress: startAddress,
    endAddress: endAddress,
    status: status,
    timeCreate: timeCreate,
  };
  const currentPage = Number(page) || 1;
  const userRole = useSession()?.data?.user?.role;
  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>Danh sách đơn hàng</h3>
        </div>
        {(userRole === "TRANSACTION_POINT_EMPLOYEE") && (
          <div className="col btnContainer">
            <CreateOrder />
          </div>
        )}
      </div>

      <div className="row">
        <OrderTable page={currentPage} query={query} showFilter={true}></OrderTable>
      </div>
    </div>
  );
}
