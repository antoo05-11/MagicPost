"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

// import Tables from "@/components/tables";
export default function Home() {
  // const h = new Hehe();
  return (
    <div>
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
