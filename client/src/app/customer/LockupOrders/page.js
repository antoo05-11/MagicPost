"use client";
import SearchForm from "/home/doduy/Web/MagicPost/client/src/components/searchform.js";
import Tables from "/home/doduy/Web/MagicPost/client/src/components/tables";
import { Button } from "react-bootstrap";
import "/home/doduy/Web/MagicPost/client/src/css/page.css";
// import Table from "@/components/tables";
export default function () {
  return (
    <div>
      <SearchForm tracuu={"Tra cuu don hang"} />
      <Tables i={1}></Tables>
    </div>
  );
}
