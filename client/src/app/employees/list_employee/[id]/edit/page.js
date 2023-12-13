// "use client";
import EmployeeForm from "@/components/employee/employee-form";
export default function Page({ params }) {
  const id = params.id;
  // console.log(id);
  //   console.log(12312);
  return (
    <main>
      <EmployeeForm id={id} />
    </main>
  );
}
