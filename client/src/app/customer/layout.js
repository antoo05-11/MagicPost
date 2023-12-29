"use client";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/css/customer/lookUp.css";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  const swrOption = [];
  return (
    <div className="lookUp">
      <div className="lookUpHeader">
        <Header />
        <Container>
          <SWRConfig
            value={{
              fetcher: (resource) => fetch(resource).then((res) => res.json()),
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
