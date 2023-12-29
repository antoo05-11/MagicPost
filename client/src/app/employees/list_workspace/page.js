import GoodPointTable from "@/components/employee/table/goodPoint-table";

export default async function page({ searchParams: { headName, provinceID, page, limit, arrivingQuantitySort, onStockQuantitySort, forwardedQuantitySort } }) {
    const query = {
        headName: headName,
        provinceID: provinceID,
        arrivingQuantitySort: arrivingQuantitySort,
        onStockQuantitySort: onStockQuantitySort,
        forwardedQuantitySort: forwardedQuantitySort
    };
    return (
        <div className="tableContainer">
            <div className="row ">
                <div className="col">
                    <h3>Danh sách điểm tập kết</h3>
                </div>
            </div>
            <div className="row">
                <GoodPointTable page={parseInt(page)} query={query} limit={parseInt(limit)} />
            </div>
        </div>
    );
}
