import Image from "next/image";
import { EmployeeDetail } from "./button";

export default function EmployyeeTable({ data }) {
  return (
    <div className="mt-6 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Ho va ten</th>
                <th scope="col">So dien thoai</th>
                <th scope="col">Dia chi</th>
                <th scope="col">Vi tri</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => {
                return (
                  <tr key={data?.employeeID}>
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
