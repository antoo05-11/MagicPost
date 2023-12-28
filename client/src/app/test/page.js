"use client";
import useSWR, { SWRConfig } from "swr";

import { Form } from "react-bootstrap";
import { useState } from "react";
export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
import { mutate } from "swr";
import Loading from "@/components/loading";
export default function AdminPage() {
  return <Loading />;
}
