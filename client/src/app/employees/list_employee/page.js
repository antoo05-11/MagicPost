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
    <>
      <p id="tittlee">Danh sach nhan vien</p>
      <div id="create-search">
        <SearchEmployee />
        <CreateEmployee />
      </div>
      <EmployyeeTable data={data}></EmployyeeTable>
      <Pagination totalPage={totalPage} />
    </>
  );
}
