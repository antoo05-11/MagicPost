"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../pagination";
import { getAllProvince, getAllTransactionPoint } from "@/api/data";
import { useDebouncedCallback } from "use-debounce";
import "@/css/employee/customTable.css";

export default function TransactionPointTable({ page, query, limit }) {
    const provinceData = getAllProvince();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleHeadName = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("headName", term);
        } else {
            params.delete("headName");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleName = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("name", term);
        } else {
            params.delete("name");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleAddress = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("provinceID", term);
        } else {
            params.delete("provinceID");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleStartOrdersSort = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("startOrdersSort", term);
            params.delete("endOrdersSort");
        } else {
            params.delete("startOrdersSort");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleEndOrdersSort = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("endOrdersSort", term);
            params.delete("startOrdersSort");
        } else {
            params.delete("endOrdersSort");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const dataRes = getAllTransactionPoint(page || 1, limit || 8, query);
    const transactionPoints = [];
    if (dataRes) {
        for (const transactionPoint of dataRes.transactionPoints) {
            transactionPoints.push(transactionPoint)
        }
    }

    return (
        <div>
            <div className="mt-2 flow-root table">
                <div className="inline-block min-w-full align-middle d-flex justify-content-center">
                    <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
                        <table className="transactionTable">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên điểm</th>
                                    <th scope="col">Trưởng điểm</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Đơn hàng đã nhận</th>
                                    <th scope="col">Đơn hàng đã chuyển</th>

                                </tr>
                                <tr className="filter">
                                    <th scope="col"></th>
                                    <th scope="col">
                                        <input onChange={(e) => handleName(e.target.value)}
                                            placeholder="Lọc theo tên điểm" />
                                    </th>
                                    <th scope="col">
                                        <input onChange={(e) => handleHeadName(e.target.value)}
                                            placeholder="Lọc theo tên trưởng điểm" />
                                    </th>
                                    <th scope="col">
                                        <select onChange={(e) => handleAddress(e.target.value)}>
                                            <option value="">Chọn tỉnh/ thành phố</option>
                                            {provinceData.map((province) => (
                                                <option
                                                    key={province.provinceIDnceID}
                                                    value={province.provinceID}
                                                >
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>

                                    </th>
                                    <th scope="col">
                                        <select onChange={(e) => handleEndOrdersSort(e.target.value)}>
                                            <option value="">Sắp xếp theo</option>
                                            <option value="ASC">Tăng</option>
                                            <option value="DESC">Giảm</option>
                                        </select>
                                    </th>
                                    <th scope="col">
                                        <select onChange={(e) => handleStartOrdersSort(e.target.value)}>
                                            <option value="">Sắp xếp theo</option>
                                            <option value="ASC">Tăng</option>
                                            <option value="DESC">Giảm</option>
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {transactionPoints.map((data, index) => (
                                    <tr key={data.head?.employeeID}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.head?.fullName}</td>
                                        <td>
                                            {data.address.detail}, {data.address.commune.name},
                                            {data.address.district.name},
                                            {data.address.province.name}
                                        </td>
                                        <td>{data.endOrders}</td>
                                        <td>{data.startOrders}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination totalPage={dataRes?.totalPages || 1} />
        </div>
    );
}
