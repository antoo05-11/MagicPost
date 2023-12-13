"use client";

import LookUpBanner from "@/components/customer/lookUpBanner";
import LookUpTransaction from "@/components/customer/lookUpTransaction";
import TransactionList from "@/components/customer/transactionList";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

export default function Transaction() {
  return (
    <div>
      <LookUpBanner title={"TRA CỨU BƯU CỤC"} />
      <LookUpTransaction />
      <TransactionList />
    </div>
  );
}
