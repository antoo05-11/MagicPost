import Image from "next/image";
import { EmployeeDetail } from "../button";
import { getEmployee } from "@/api/data";
import Pagination from "../pagination";
import { employeeRole } from "@/api/utils";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
export default function EmployyeeTable({ page, query }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleName = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handlePhone = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("phone", term);
    } else {
      params.delete("phone");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const {
    dataRes: inforEmployees,
    totalPage: totalPage,
    itemPerPage: itemPerPage,
  } = getEmployee(page, query);

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
                  <th scope="col">
                    <input onChange={(e) => handleName(e.target.value)} />
                  </th>
                  <th scope="col">
                    <input />
                  </th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {inforEmployees.map((employee, index) => {
                  return (
                    <tr key={employee?.employeeID}>
                      <td>{index + 1}</td>
                      <td>{employee?.fullName}</td>
                      <td>{employee?.phoneNumber}</td>
                      <td>{employee?.fullName}</td>
                      <td>{employeeRole[employee?.role]?.name}</td>
                      <td>{employee?.email}</td>
                      <td>
                        <EmployeeDetail id={employee?.employeeID} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
