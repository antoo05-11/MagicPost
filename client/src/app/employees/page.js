"use client";
import style from "@/css/employeePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTable from "@/components/employee/table";
import useSWR from "swr";
import { getEmployee } from "@/api/data";

const fetcher = (url) => fetch(url).then((res) => res.json());
export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
export default async function AdminPage() {
  const data = await getEmployee();
  console.log(data);
  return <div>{<OrderTable typeTable={orderDetails} data={data} />}</div>;
}
