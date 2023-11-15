"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "@/components/SideBar/SideBar";
import { Container } from "react-bootstrap";
import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({ children }) {
  return (
    <div className={"d-flex vh-100 bg-light"}>
      <SideBar />
      <Container>
        <NavBar />
        {children}
      </Container>
    </div>
  );
}
