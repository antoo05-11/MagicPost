import Image from "next/image";
import { EmployeeDetail } from "./button";
import { getEmployee } from "@/api/data";
import Pagination from "./pagination";
import { employeeRole } from "@/api/utils";
export default function EmployyeeTable({ page }) {
  const {
    dataRes: inforEmployees,
    totalPage: totalPage,
    itemPerPage: itemPerPage,
  } = getEmployee({ page });
  return (
    <div>
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
                {inforEmployees.map((employee) => {
                  return (
                    <tr key={employee?.employeeID}>
                      <td>{1}</td>
                      <td>{employee?.fullName}</td>
                      <td>{employee?.phoneNumber}</td>
                      <td>{employee?.fullName}</td>
                      <td>{employeeRole[employee?.role]}</td>
                      <td>{employee?.email}</td>
                      <td>
                        <EmployeeDetail id={employee?.employeeID} />
                      </td>
                    </tr>
                    // <div>{employee?.employeeID}</div>
                  );
                })}
                {/* {data?.map((data, index) => {
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
              })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
