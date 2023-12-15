"use client";
import "@/css/employee/table.css";
import { OrderDetail } from "./button";
export default function OrderTable({ data }) {
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="table table-hover mb-0 ">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Địa chỉ gửi</th>
                <th scope="col">Địa chỉ nhận</th> 
                <th scope="col">
                  Trạng thái
                  <select className="state-order">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data?.map((data, index) => {
                return (
                  <tr key={data?.employeeID}>
                    <td>{index + 1}</td>
                    <td>{data?.orderID}</td>
                    <td>{data?.status}</td>
                    <td>{data?.senderID}</td>
                    <td>{data?.receiverID}</td>
                    <td>{data?.creatorID}</td>
                    <td>
                      <OrderDetail id={data?.employeeID} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
