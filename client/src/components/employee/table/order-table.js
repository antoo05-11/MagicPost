"use client";
import "@/css/employee/table.css";
import { OrderDetail } from "../button";
import { getOrder } from "@/api/data";
import Pagination from "../pagination";
import { getAllProvince } from "@/api/data";
import { orderStatus } from "@/api/utils";

export default function OrderTable({ page }) {
  const provinceData = getAllProvince();
  const {
    dataRes: inforOrders,
    totalPages: totalPage,
    itemPerPage: itemPerPage,
  } = getOrder({ page });
  console.log(inforOrders)
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full align-middle d-flex justify-content-center">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="orderTable">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Địa chỉ gửi</th>
                <th scope="col">Địa chỉ nhận</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Trạng thái</th>
                <th scope="col"></th>
              </tr>

              <tr className="filter">
                <th scope="col"></th>
                <th scope="col">
                  <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên" />
                </th>
                <th scope="col">
                  <select>
                    <option>Chọn tỉnh/ thành phố</option>
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
                  <select>
                    <option>Chọn tỉnh/ thành phố</option>
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
                  <div style={{ display: 'flex', gap: '10px', width: "255px" }}>
                    <input type="date" className="w-50" />
                    -
                    <input type="date" className="w-50" />
                  </div>

                </th>
                <th scope="col">
                  <select placeholder="Chọn">
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                  </select>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {inforOrders?.map((data, index) => {
                const statusInfo = orderStatus[data?.goodsStatus] || {};
                const badgeColor = statusInfo.color || "secondary";
                return (
                  <tr key={data?.orderID}>
                    <td>{index + 1}</td>
                    <td>{data?.orderID}</td>
                    <td>{data?.endTransactionProvince}</td>
                    <td>{data?.startTransactionProvince}</td>
                    <td>{data?.createdAt}</td>
                    <td>
                      <span className={`badge rounded-pill bg-${badgeColor} p-2`}>
                        {statusInfo.now}
                      </span>
                    </td>
                    <td className="d-flex justify-content-center">
                      <OrderDetail id={data?.orderID} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
