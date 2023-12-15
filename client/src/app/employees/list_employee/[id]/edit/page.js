"use client";
import { getEmployeebyID } from "@/api/data";
import EmployeeForm from "@/components/employee/form/employee-form";
export default function Page({ params }) {
  const id = params.id;
  return (
    <main>
      <EmployeeForm id={id} />
    </main>
  );
}
