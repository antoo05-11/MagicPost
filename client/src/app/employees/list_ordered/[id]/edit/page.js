// "use client";
import Form from "@/components/employee/employee-form";
import OrderForm from "@/components/employee/order-form";
import OrderProgress from "@/components/employee/table/order-progress";
export default function Page({ params }) {
  const id = params.id;
  console.log(id);
  //   console.log(12312);
  return (
    <main>
      <OrderForm />
      <OrderProgress />
    </main>
  );
}
