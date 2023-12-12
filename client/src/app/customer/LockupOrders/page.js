"use client";
import OrderProgress from "@/components/employee/order-progress";
import LookUpBanner from "@/components/customer/lookUpBanner";
import LookUpOrder from "@/components/customer/lookUpOrder";

export default function Order({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page);
  return (
    <div>
      <LookUpBanner title={"TRA CỨU BƯU GỬI"} />
      <LookUpOrder />
      <OrderProgress />
    </div>
  );
}
