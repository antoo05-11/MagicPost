"use client";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { LuPackagePlus } from "react-icons/lu";

export function CreateEmployee() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push("/employees/list_employee/create");
      }}
      className="btnCreate"
    >
      <FiUserPlus size={"2em"} />
      Tạo nhân viên
    </Button>
  );
}
export function CreateOrder() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push("/employees/list_ordered/create");
      }}
      className="btnCreate"
    >
      <LuPackagePlus size={"2em"} />
      Tạo đơn hàng
    </Button>
  );
}
export function EmployeeDetail({ id }) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(`/employees/list_employee/${id}/detail`);
      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}
export function OrderDetail({ id, page }) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(`/employees/list_ordered/${id}/detail?page=${page}`);

      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}
