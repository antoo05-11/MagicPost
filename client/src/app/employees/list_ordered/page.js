import { getOrder } from "@/api/data";
import { CreateOrder } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import OrderTable from "@/components/employee/order-table";
const item_per_page = 6;
import "@/css/employee/list_employee.css";
export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page) || 1;
  const data = await getOrder();
  const totalPage = data.length / item_per_page;
  return (
    <>
      <h2>Danh sach don hang</h2>
      <div id="create-search">
        <SearchEmployee />
        <CreateOrder />
      </div>
      <OrderTable data={data}></OrderTable>
      <Pagination totalPage={totalPage} />
    </>
  );
}
