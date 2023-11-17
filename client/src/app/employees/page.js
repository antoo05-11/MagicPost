"use client";
import style from "@/css/employeePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTable from "@/components/employee/table";
import useSWR from "swr";
import { getEmployee } from "@/api/data";
import Card from "@/components/dashboard/cards";

export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
export default function AdminPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div id="dashboard">
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
      </div>
    </div>
  );
}
