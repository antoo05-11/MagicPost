"use client";
import OrderDetail from "@/components/employee/form/order-detail";

export default function Page({ params }) {
  const id = params.id;
  return (
    <main>
      <OrderDetail id={id} />
    </main>
  );
}
