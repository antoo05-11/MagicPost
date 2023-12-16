"use client";
import { getEmployee } from "@/api/data";
import EmployeeForm from "@/components/employee/form/employee-form";
import { useState } from "react";
export default async function Page() {
  return (
    <main>
      <EmployeeForm />
    </main>
  );
}
