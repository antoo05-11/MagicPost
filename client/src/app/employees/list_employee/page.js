"use client";
import { getEmployee } from "@/api/data";
import { CreateEmployee } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import EmployyeeTable from "@/components/employee/table/employee-table";
import "@/css/employee/customTable.css";

export default function page({
  searchParams: { name, role, phone, email, address, page },
}) {
  const query = {
    name: name,
    phone: phone,
    role: role,
    address: address,
    email: email,
  };
  const currentPage = Number(page) || 1;
  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>Danh sách nhân viên</h3>
        </div>
        <div className="col btnContainer">
          <CreateEmployee />
        </div>
      </div>

      <div className="row">
        <EmployyeeTable page={currentPage} query={query}></EmployyeeTable>
      </div>
    </div>
  );
}
