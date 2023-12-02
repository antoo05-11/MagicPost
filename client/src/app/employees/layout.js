"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });
import { Breadcrumb, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "@/components/employee/sidebar/sidebar";
import "@/css/employee/employee-page.css";
import { useParams, usePathname } from "next/navigation";
const roleFunc = {
  list_employee: {
    url: "/employees/list_employee",
    name: "Danh sach nhan vien",
  },
  list_order: {
    url: "/employees/list_ordered",
    name: "Danh sach don hang",
  },
};
const role = {
  staff: [roleFunc["list_employee"], roleFunc["list_order"]],
};
export default function EmployeesLayout({ children }) {
  // const pathname = usePathname();
  // const array = pathname.split("/");
  return (
    <>
      <SideBar role={role.staff} />
      <button
        className="button"
        id="button-open"
        style={{ display: "none" }}
        onMouseOver={() => {
          document.getElementById("mySidebar").style.height = "90%";
          document.getElementById("mySidebar").style.top = "5%";
          document.getElementById("mySidebar").style.width = "15%";
        }}
        onClick={() => {
          document.getElementById("mySidebar").style.height = "100%";
          document.getElementById("mySidebar").style.top = "0%";
          document.getElementById("main").style.width = "85%";
          document.getElementById("main").style.marginLeft = "15%";
          document.getElementById("mySidebar").style.width = "15%";
          document.getElementById("button-open").style.display = "none";
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-list" />
      </button>
      <div id="main">
        {/* <Breadcrumb>
          {array.map((list) => {
            return <Breadcrumb.Item>{list}</Breadcrumb.Item>;
          })}
        </Breadcrumb> */}
        <section id="noidung">
          <Container>{children}</Container>
        </section>
      </div>
      <script src="/static/script.js"></script>
    </>
  );
}
