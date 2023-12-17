"use client";
import Invoice from "@/components/employee/order/invoice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SWRConfig } from "swr";
export default function Layout({ children, params }) {
  return <section>{children}</section>;
}
