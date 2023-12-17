"use client"
import Pagination from "../pagination";
import { getAllProvince, getAllTransactionPoint } from "@/api/data";

export default function TransactionPointTable() {
  const provinceData = getAllProvince();
  const transactionPointData = getAllTransactionPoint();

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
                    <input placeholder="Lọc theo tên điểm" />
                  </th>
                  <th scope="col">
                    <input placeholder="Lọc theo số trưởng điểm" />
                  </th>
                  <th scope="col">
                    <select>
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
              <tbody class="table-group-divider">
              {transactionPointData.map((data, index) => (
                  <tr key={data.head?.employeeID}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.head?.fullName}</td>
                    <td>
                      {data.address.detail}, {data.address.commune.name},
                      {data.address.district.name},
                      {data.address.province.name}
                    </td>
                    <td>{data.startOrders}</td>
                    <td>{data.endOrders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={1} />
    </div>
  );
}
