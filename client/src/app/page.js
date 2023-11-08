// "use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useSWR } from "swr";
import AppHeader from "@/components/header";
// import { useEffect } from "react";

// import Tables from "@/components/tables";

async function getData() {
  const res = await fetch("http://localhost:5050/api/employee/get");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  // console.log(1);
  return (
    <div>
      <AppHeader />
      {/* <Tables>
        </Tables> */}
      <Link href="/customer/LockupOrders" name="#hihi">
        duong dan
      </Link>
      {/* <Hihi i={5} /> */}
      {/* <Hehe i={1} /> */}
    </div>
  );
}
