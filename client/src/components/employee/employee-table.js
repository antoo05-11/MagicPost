import Image from "next/image";
import { EmployeeDetail } from "./button";

export default function EmployyeeTable({ data }) {
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Email</th>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {data?.map((data, index) => {
                return (
                  <tr key={data?.employeeID}>
                    <td>{index + 1}</td>
                    <td>{data?.fullName}</td>
                    <td>{data?.phoneNumber}</td>
                    <td>{data?.address.province}</td>
                    <td>{data?.role}</td>
                    <td>{data?.email}</td>
                    <td>
                      <EmployeeDetail id={data?.employeeID} />
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
