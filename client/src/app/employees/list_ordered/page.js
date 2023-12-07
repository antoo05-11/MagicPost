import { getOrder } from "@/api/data";
import { CreateOrder } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import OrderTable from "@/components/employee/order-table";
const item_per_page = 6;
import "@/css/employee/list_employee.css";
import SearchBox from "@/components/employee/search";
export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page) || 1;
  const getdata = await getOrder();
  let data = [];
  for (
    var i = (currentPage - 1) * item_per_page;
    i < currentPage * item_per_page;
    i++
  ) {
    data.push(getdata[i]);
  }
  const totalPage = data.length / item_per_page;
  return (
    <div className="content">
      <h2>Danh sach don hang</h2>
      {/* <div id="create-search"> */}
      {/* <SearchEmployee /> */}
      {/* <CreateOrder /> */}
      {/* </div> */}
      <SearchBox />
      <OrderTable data={data}></OrderTable>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
