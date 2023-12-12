"use client";

import { Inter } from "next/font/google";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/customer/lookUp.css";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className="lookUp">
      <div className="lookUpHeader">
        <Header />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>

  );
}
