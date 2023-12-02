"use client";
import Image from "next/image";
import { UpdateInvoice } from "./button";
export default function OrderTable({ data }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ma don hang</th>
                <th scope="col">Nguoi gui</th>
                <th scope="col">Nguoi nhan</th>
                <th scope="col">Dia chi nguoi nhan</th>
                <th scope="col">Trang thai</th>
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
