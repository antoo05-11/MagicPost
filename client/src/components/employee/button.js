"use client";
import Link from "next/link";
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
      <FiUserPlus size={'2em'} />
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
      <LuPackagePlus size={'2em'} />
      Tạo đơn hàng
    </Button>
  );
}
export function EmployeeDetail({ id }) {
  const route = useRouter();

  return (
    <Button
      className=".bg-transparent"
      onClick={() => {
        route.push(`/employees/list_employee/${id}/edit`);
        // console.log(id);
      }}
    >
      <FaRegEye />
    </Button>
  );
}
export function OrderDetail({ id }) {
  const route = useRouter();

  return (
    <Button
      onClick={() => {
        route.push(`/employees/list_ordered/${id}/edit`);
        // console.log(id);
      }}
    >
      <FaRegEye />
    </Button>
  );
}
