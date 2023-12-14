"use client";

import { Inter } from "next/font/google";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/customer/lookUp.css";
import { SWRConfig } from "swr";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const swrOption = [];
  return (
    <div className="lookUp">
      <div className="lookUpHeader">
        <Header />
        <Container>
          <SWRConfig
            value={{
              refreshInterval: 3000,
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            {children}
          </SWRConfig>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
