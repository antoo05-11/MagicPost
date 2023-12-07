"use client";
import "@/css/employee/table.css";
import { UpdateInvoice } from "./button";
export default function OrderTable({ data }) {
  return (
    <div className="mt-6 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="head-table">
                  Ma don hang
                </th>
                <th scope="col" className="head-table">
                  Nguoi gui
                </th>
                <th scope="col" className="head-table">
                  Nguoi nhan
                </th>
                <th scope="col" className="head-table">
                  Dia chi nguoi nhan
                </th>
                <th scope="col" className="head-table">
                  Trang thai
                  <select className="state-order">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => {
                return (
                  <tr key={data?.employeeID}>
                    <td>{data?.orderID}</td>
                    <td>{data?.status}</td>
                    <td>{data?.senderID}</td>
                    <td>{data?.receiverID}</td>
                    <td>{data?.creatorID}</td>
                    <td>
                      <UpdateInvoice id={data?.employeeID} />
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
