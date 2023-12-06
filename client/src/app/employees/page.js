"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTable from "@/components/employee/order-table";
import useSWR from "swr";
import { getEmployee } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";
import Card from "@/components/dashboard/cards";
import DemoChart from "@/components/Chart/Chart";
import { useParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Overview from "@/components/Overview/Overview";
import Statistic from "@/components/Statistic/Statistic";
import StatisticGoodsPoint from "@/components/StatisticGoodsPoint/StatisticGoodsPoint";
import StatisticTransPoint from "@/components/StatisticTransPoint/StatisticTransPoint";

export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
export default function AdminPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <div id="dashboard">
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
        <Card title={"Tong don hang"} value={10} />
      </div> */}
      {/* <DemoChart /> */}
      <Row >
        <Col xs={12}>
          <Statistic userRole={'leader'} />
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

    </div>
  );
}
