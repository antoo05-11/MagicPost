"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTable from "@/components/employee/order-table";
import useSWR from "swr";
import { getEmployee } from "@/api/data";
import Card from "@/components/dashboard/cards";
import DemoChart from "@/components/Chart/Chart";
import { useParams, usePathname } from "next/navigation";

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
      <DemoChart />
    </div>
  );
}
