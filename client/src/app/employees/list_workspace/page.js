import GoodPointTable from "@/components/employee/table/goodPoint-table";
import "@/css/employee/customTable.css";

export default async function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const item_per_page = 6;
  const currentPage = Number(page) || 1;

  return (
    <div className="tableContainer">
      <div className="row ">
        <div className="col">
          <h3>Danh sách điểm tập kết</h3>
        </div>
      </div>
      <div className="row">
        <GoodPointTable />
      </div>
    </div>
  );
}
