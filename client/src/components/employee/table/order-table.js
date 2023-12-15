"use client";
import "@/css/employee/table.css";
import { OrderDetail } from "../button";
export default function OrderTable({ data }) {
  console.log("check data", data);
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="table table-hover mb-0 ">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Dia chi gui</th>
                <th scope="col">Dia chi nhan</th>
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
                  <tr key={data?.orderID}>
                    <td>{index + 1}</td>
                    <td>{data?.orderID}</td>
                    <td>{data?.endTransactionProvince}</td>
                    <td>{data?.startTransactionProvince}</td>
                    <td>{data?.goodsStatus}</td>
                    <td>
                      <OrderDetail id={data?.orderID} />
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
