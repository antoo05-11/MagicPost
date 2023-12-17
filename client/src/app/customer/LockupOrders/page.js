"use client";
import OrderProgress from "@/components/customer/order-progress";
import LookUpBanner from "@/components/customer/lookUpBanner";
import LookUpOrder from "@/components/customer/lookUpOrder";
import { useState } from "react";

export default function Order({ searchParams: { query } }) {
  const currentQuery = query || "";
  const [searched, isSearch] = useState(false);

  return (
    <div>
      <LookUpBanner title={"TRA CỨU BƯU GỬI"} />
      <LookUpOrder />
      {/* <OrderProgress /> */}
    </div>
  );
}
