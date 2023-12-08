"use client";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
export function CreateEmployee() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push("/employees/list_employee/create");
      }}
    >
      Create
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
    >
      Create
    </Button>
  );
}
export function EmployeeDetail({ id }) {
  const route = useRouter();

  return (
    <Button
      onClick={() => {
        route.push(`/employees/list_employee/${id}/edit`);
        // console.log(id);
      }}
    >
      Detail
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
      Detail
    </Button>
  );
}
