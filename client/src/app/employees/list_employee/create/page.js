"use client";
import { getEmployee } from "@/api/data";
import EmployeeForm from "@/components/employee/form/employee-form";
import { useState } from "react";
export default async function Page() {
  return (
    <main>
      <EmployeeForm />
      <div className="mt-3 btnContainer">
        <button
          // onClick={() => {
          //   employee.address.districtID = selectedDistrict;
          //   employee.address.communeID = selectedCommune;
          //   employee.address.provinceID = selectedProvince;
          //   console.log(createEmployee(employee));
          // }}
          // type="button"
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button type="button" className="btn btn-secondary">
          Xóa
        </button>
      </div>
    </main>
  );
}
