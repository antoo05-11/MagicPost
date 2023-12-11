import { getOrder } from "@/api/data";
import { CreateOrder } from "@/components/employee/button";
import Pagination from "@/components/employee/pagination";
import SearchEmployee from "@/components/employee/search";
import OrderTable from "@/components/employee/order-table";
import SearchBox from "@/components/employee/search";
import "@/css/employee/customTable.css"

export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const item_per_page = 6;
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
    <div className="tableContainer">
      {/* <h2>Danh sach don hang</h2> */}
      {/* <div id="create-search"> */}
      {/* <SearchEmployee /> */}
      {/* <CreateOrder /> */}
      {/* </div> */}
      {/* <SearchBox /> */}

      <div className="row">
        <div className="col">
          <h3>Danh sách đơn hàng</h3>
        </div>

        <div className="col btnContainer">
          <CreateOrder />
        </div>
      </div>

      <div className="row">
        <OrderTable data={data}></OrderTable>
        <Pagination totalPage={totalPage} />
      </div>

    </div>

  );
}
