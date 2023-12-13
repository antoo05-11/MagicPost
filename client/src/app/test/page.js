"use client";
import { Container, Row, Col } from "react-bootstrap";
import Overview from "@/components/employee/dashboard/Overview";
import Statistic from "@/components/employee/dashboard/Statistic";
import StatisticGoodsPoint from "@/components/employee/dashboard/StatisticGoodsPoint";
import StatisticTransPoint from "@/components/employee/dashboard/StatisticTransPoint";
import { motion } from "framer-motion";
import EmployyeeTable from "@/components/employee/employee-table";
import { ChartSkeleton } from "@/components/skeleton";
import { getEmployeebyID } from "@/api/data";
export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
export default function AdminPage() {
  const data = getEmployeebyID();
  return (
    // <motion.div layout>
    //   {/* <motion.h1 layout>Dashboard</motion.h1> */}
    //   <Row>
    //     <Col xs={12}>
    //       <Statistic userRole={"leader"} />
    //     </Col>
    //   </Row>

    //   <Row>
    //     <Col xs={12} md={4}>
    //       <Overview />
    //     </Col>

    //     <Col xs={12} md={4}>
    //       <StatisticGoodsPoint />
    //     </Col>

    //     <Col xs={12} md={4}>
    //       <ChartSkeleton />
    //     </Col>

    //     <Col xs={12}>
    //       <EmployyeeTable />
    //     </Col>
    //   </Row>
    // </motion.div>
    <div class="card" aria-hidden="true">
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a
          class="btn btn-primary disabled placeholder col-6"
          aria-disabled="true"
        ></a>
      </div>
    </div>
  );
}
