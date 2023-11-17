import { getEmployee } from "@/api/data";
import { CreateEmployee } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import OrderTable from "@/components/employee/table";
import Search from "@/components/lookupOrder/search";

const list_employee = ["name", "phone", "address", "role", "email"];
import "@/css/list_employee.css";
// export default async function page({ searchParams: { query, page } }) {
//   const data = await getEmployee();

//   return (
//     <div>
//       <p>Danh sach nhan vien</p>
//       <SearchEmployee />
//       <OrderTable typeTable={list_employee} data={data}></OrderTable>
//       {/* <Pagination /> */}
//     </div>
//   );
// }
export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page);
  const data = await getEmployee();
  return (
    <>
      <p>Danh sach nhan vien</p>
      <div id="create-search">
        <SearchEmployee />
        <CreateEmployee />
      </div>
      <OrderTable typeTable={list_employee} data={data}></OrderTable>
    </>
  );
}
