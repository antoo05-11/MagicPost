"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });
import { Container } from "react-bootstrap";
import SideBar from "@/components/employee/sidebar/sidebar";
import "@/css/components/sidebar.css";
import { useParams, usePathname } from "next/navigation";
const roleFunc = {
  list_employee: {
    url: "/employees/list_employee",
    name: "Danh sach nhan vien",
  },
  list_order: {
    url: "employees/list_employee",
    name: "Danh sach don hang",
  },
};
const role = {
  staff: [roleFunc["list_employee"], roleFunc["list_order"]],
};
export default function RootLayout({ children }) {
  const params = useParams();
  // console.log(params);
  return (
    <>
      <SideBar role={role.staff} />
      <div id="main">{children}</div>
      {/* <div className="main"></div> */}
      <script type="text/javascript" src="/static/script.js"></script>
    </>
  );
}
