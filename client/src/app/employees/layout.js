"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });
import { Container } from "react-bootstrap";
import SideBar from "@/components/employee/sidebar/sidebar";
import "@/css/components/sidebar.css";

export default function RootLayout({ children }) {
  return (
    <>
      <SideBar />
      <div id="main">{children}</div>
      {/* <div className="main"></div> */}
      <script type="text/javascript" src="/static/script.js"></script>
    </>
  );
}
