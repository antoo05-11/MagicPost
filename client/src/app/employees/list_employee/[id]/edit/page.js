"use client";
import { getEmployeebyID } from "@/api/data";
import EmployeeForm from "@/components/employee/employee-form";
export default function Page({ params }) {
  const id = params.id;
  return (
    <main>
      <EmployeeForm id={id} />
      
    </main>
  );
}
