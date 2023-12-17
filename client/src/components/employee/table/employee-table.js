import Image from "next/image";
import { EmployeeDetail } from "../button";
import { getEmployee } from "@/api/data";
import Pagination from "../pagination";
import { employeeRole, employeeStatus } from "@/api/utils";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getAllProvince } from "@/api/data";
export default function EmployyeeTable({ page, query }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const provinceData = getAllProvince();

  const handleName = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleEmID = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("emID", term);
    } else {
      params.delete("emID");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleAddress = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("address", term);
    } else {
      params.delete("address");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleRole = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("role", term);
    } else {
      params.delete("role");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleStatus = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("status", term);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const {
    dataRes: inforEmployees,
    totalPage: totalPage,
    itemPerPage: itemPerPage,
  } = getEmployee(page || 1, query);
  console.log(inforEmployees);
  return (
    <div>
      <div className="mt-2 flow-root table">
        <div className="inline-block min-w-full align-middle d-flex justify-content-center">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive ">
            <table className="employeeTable">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Mã nhân viên</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">#</th>
                </tr>
                <tr className="filter">
                  <th scope="col"></th>
                  <th scope="col">
                    <input
                      onChange={(e) => handleEmID(e.target.value)}
                      placeholder="Lọc theo mã nhân viên"
                    />
                  </th>
                  <th scope="col">
                    <input
                      onChange={(e) => handleName(e.target.value)}
                      placeholder="Lọc theo tên"
                    />
                  </th>
                  <th scope="col">
                    <select onChange={(e) => handleAddress(e.target.value)}>
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
                    <select onChange={(e) => handleRole(e.target.value)}>
                      <option value="">Chọn vai trò</option>
                      {Object.keys(employeeRole).map((roleKey) => (
                        <option key={roleKey} value={roleKey}>
                          {employeeRole[roleKey].name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">Chọn trạng thái</option>
                      {Object.keys(employeeRole).map((roleKey) => (
                        <option key={roleKey} value={roleKey}>
                          {employeeRole[roleKey].name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {inforEmployees.map((employee, index) => {
                  return (
                    <tr key={employee?.employeeID}>
                      <td>{index + 1}</td>
                      <td>{employee?.phoneNumber}</td>
                      <td>{employee?.fullName}</td>
                      <td>{employee?.address?.province?.name}</td>
                      <td>{employeeRole[employee?.role]?.name}</td>
                      <td>{employeeStatus[employee?.status]}</td>
                      <td className="d-flex justify-content-center">
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
