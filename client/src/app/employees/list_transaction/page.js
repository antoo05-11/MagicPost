import TransactionPointTable from "@/components/employee/table/transactionPoint-table";
import "@/css/employee/customTable.css";

export default async function page({ searchParams: { headName, provinceID,name, page, limit, startOrdersSort, endOrdersSort } }) {
    const query = {
        headName: headName,
        provinceID: provinceID,
        startOrdersSort: startOrdersSort,
        endOrdersSort: endOrdersSort,
        name: name
    };

    return (
        <div className="tableContainer">
            <div className="row ">
                <div className="col">
                    <h3>Danh sách điểm giao dịch</h3>
                </div>
            </div>
            <div className="row">
                <TransactionPointTable page={parseInt(page)} query={query} limit={parseInt(limit)} />
            </div>
        </div>
    );
}
