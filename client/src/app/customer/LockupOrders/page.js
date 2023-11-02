"use client";
import SearchForm from "@/components/searchform";
import Tables from "@/components/tables";
import { Button } from "react-bootstrap";
import "@/css/page.css";
// import Table from "@/components/tables";
export default function () {
  return (
    <div>
      <SearchForm tracuu={"Tra cuu don hang"} />
      <Tables i={1}></Tables>
    </div>
  );
}
