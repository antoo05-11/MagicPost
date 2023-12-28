"use client";
import Pagination from "../pagination";
import { getAllGoodPoint, getAllProvince } from "@/api/data";

export default function GoodPointTable() {
  const provinceData = getAllProvince();
  const goodsPointData = getAllGoodPoint();
 
  return (
    <div>
      <div className="mt-2 flow-root table">
        <div className="inline-block min-w-full align-middle d-flex justify-content-center">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
            <table className="goodPointTable">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Trưởng điểm</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Đơn hàng đã nhận</th>
                  <th scope="col">Đơn hàng đã chuyển</th>
                  <th scope="col">Đơn hàng tồn kho</th>
                </tr>
                <tr className="filter">
                  <th scope="col"></th>
                  <th scope="col">
                    <input placeholder="Lọc theo số trưởng điểm" />
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">Chọn tỉnh/ thành phố</option>
                      {provinceData.map((province) => (
                        <option
                          key={province.provinceID}
                          value={province.provinceID}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">Sắp xếp theo</option>
                      <option>Tăng</option>
                      <option>Giảm</option>
                    </select>
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">Sắp xếp theo</option>
                      <option>Tăng</option>
                      <option>Giảm</option>
                    </select>
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">Sắp xếp theo</option>
                      <option>Tăng</option>
                      <option>Giảm</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {/* {goodsPointData.map((data, index) => (
                  <tr key={data.head?.employeeID}>
                    <td>{index + 1}</td>
                    <td>{data.head?.fullName}</td>
                    <td>
                      {data.address.detail}, {data.address.commune.name},{" "}
                      {data.address.district.name},{" "}
                      {data.address.province.name}
                    </td>
                    <td>{data.arrivingOrders}</td>
                    <td>{data.forwardedOrders}</td>
                    <td>{data.onStockOrders}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={1} />
    </div>
  );
}
