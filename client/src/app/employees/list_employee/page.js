import { getEmployee } from "@/api/data";
import { CreateEmployee } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import EmployyeeTable from "@/components/employee/employee-table";

const list_employee = ["name", "phone", "address", "role", "email"];
const item_per_page = 6;
export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page) || 1;
  const data = await getEmployee();
  const totalPage = data.length / item_per_page;
  return (
    // <>
    //   <h2 id="tittlee">Danh sach nhan vien</h2>
    //   <div id="create-search">
    //     <SearchEmployee />
    //     <CreateEmployee />
    //   </div>
    //   <EmployyeeTable data={data}></EmployyeeTable>
    //   <Pagination totalPage={totalPage} />
    // </>
    <div className="container bg-white shadow-lg rounded pt-3">
      <div className="row border-bottom">
        <h3>Danh sách nhân viên</h3>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-success me-3">Export</button>
        <CreateEmployee />
      </div>

      <div className="row">
        <EmployyeeTable data={data}></EmployyeeTable>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}
