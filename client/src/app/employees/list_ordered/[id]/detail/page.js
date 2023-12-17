"use client";
// import Form from "@/components/employee/employee-form";
import OrderProgress from "@/components/customer/order-progress";
import Link from "next/link";
import OrderDetail from "@/components/employee/form/order-detail";
export default function Page({ params }) {
  const id = params.id;
  return (
    <main>
      <OrderDetail id={id} />
    </main>
  );
}
