"use client"
import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Statistic from "@/components/employee/dashboard/Statistic";
import Overview from "@/components/employee/dashboard/Overview";
import StatisticGoodsPoint from "@/components/employee/dashboard/StatisticGoodsPoint";
import StatisticTransPoint from "@/components/employee/dashboard/StatisticTransPoint";
import TotalGood from "@/components/employee/dashboard/TotalGood";
import EmployyeeTable from "@/components/employee/table/employee-table";
import OrderTable from "@/components/employee/table/order-table";

const roleComponents = {
  MANAGER: [
    <Col xs={12} md={4}><Overview /></Col>,
    <Col xs={12} md={4}><StatisticGoodsPoint /></Col>,
    <Col xs={12} md={4}><StatisticTransPoint /></Col>,
    <Col xs={12}><EmployyeeTable /></Col>,
  ],
  TRANSACTION_POINT_HEAD: [
    <Col xs={12} md={4}><Overview /></Col>,
    <Col xs={12} md={4}><TotalGood /></Col>,
    <Col xs={12} md={4}><StatisticTransPoint /></Col>,
    <Col xs={12}><EmployyeeTable /></Col>,
  ],
  GOODS_POINT_HEAD: [
    <Col xs={12} md={4}><Overview /></Col>,
    <Col xs={12} md={4}><TotalGood /></Col>,
    <Col xs={12} md={4}><StatisticGoodsPoint /></Col>,
    <Col xs={12}><EmployyeeTable /></Col>,
  ],
  GOODS_POINT_EMPLOYEE: [
    <Col xs={12} md={6}><TotalGood /></Col>,
    <Col xs={12} md={6}><StatisticGoodsPoint /></Col>,
    <Col xs={12}><OrderTable /></Col>,
  ],
  TRANSACTION_POINT_EMPLOYEE: [
    <Col xs={12} md={6}><TotalGood /></Col>,
    <Col xs={12} md={6}><StatisticGoodsPoint /></Col>,
    <Col xs={12}><OrderTable /></Col>,
  ],
};

export default function AdminPage() {
  const { data } = useSession();
  const role = data?.user?.role;
  const userRole = role || "MANAGER";

  return (
    <motion.div layout>
      <Row>
        <Col xs={12}>
          <Statistic userRole={userRole} />
        </Col>
      </Row>

      <Row>
        {roleComponents[userRole]?.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </Row>
    </motion.div>
  );
}
