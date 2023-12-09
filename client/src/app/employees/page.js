"use client";
import { Container, Row, Col } from "react-bootstrap";
import Overview from "@/components/Overview/Overview";
import Statistic from "@/components/Statistic/Statistic";
import StatisticGoodsPoint from "@/components/StatisticGoodsPoint/StatisticGoodsPoint";
import StatisticTransPoint from "@/components/StatisticTransPoint/StatisticTransPoint";
import { motion } from "framer-motion";
export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
export default function AdminPage() {
  return (
    <motion.div layout>
      <motion.h1 layout>Dashboard</motion.h1>
      <Row>
        <Col xs={12}>
          <Statistic userRole={"leader"} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Overview />
        </Col>

        <Col xs={12} md={4}>
          <StatisticGoodsPoint />
        </Col>

        <Col xs={12} md={4}>
          <StatisticTransPoint />
        </Col>
      </Row>
    </motion.div>
  );
}
