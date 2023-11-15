"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useSWR } from "swr";
import AppHeader from "/home/doduy/Web/MagicPost/client/src/components/header.js";

// import { useEffect } from "react";

// import Tables from "@/components/tables";

export default async function Home() {
  return (
    <div>
      <AppHeader></AppHeader>
      <Link href="/customer/LockupOrders" name="#hihi">
        duong dan
      </Link>
    </div>
  );
}
