"use client";
import { Button, Container } from "react-bootstrap";
import Script from "next/script";

import "/home/doduy/Web/MagicPost/client/src/css/page.css";
import Search from "@/components/lookupOrder/search";
// import Table from "@/components/tables";
export default function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page);
  return (
    <>
      <Container>
        <Search />
      </Container>
      {/* <Script src="/home/doduy/Web/MagicPost/client/src/app/customer/LockupOrders/script.js" /> */}
    </>
  );
}
