"use client";
import { CreateEmployee } from "@/components/employee/button";
import EmployyeeTable from "@/components/employee/table/employee-table";
import "@/css/employee/customTable.css";

export default function page({
  searchParams: { name, phone, emID, status, address, page },
}) {
  const query = {
    name: name,
    emID: emID,
    phone: phone,
    address: address,
    status: status,
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
