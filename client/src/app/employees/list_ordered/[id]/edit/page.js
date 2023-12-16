// "use client";
// import Form from "@/components/employee/employee-form";
import OrderForm from "@/components/employee/form/order-form";
import OrderProgress from "@/components/employee/table/order-progress";
import Link from "next/link";
export default function Page({ params }) {
  const id = params.id;
  console.log(id);
  return (
    <main>
      <OrderForm />
      <OrderProgress />
      <Link href="/test">Test in hóa đơn </Link>
    </main>
  );
}
