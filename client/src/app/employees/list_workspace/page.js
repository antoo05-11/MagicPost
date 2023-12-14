import GoodPointTable from "@/components/employee/goodPoint-table";

export default function page() {
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
