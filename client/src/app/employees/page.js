"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTable from "@/components/employee/order-table";
import useSWR from "swr";
import { getEmployee } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";
import Card from "@/components/dashboard/cards";
import DemoChart from "@/components/Chart/Chart";
import { useParams, usePathname } from "next/navigation";
import Overview from "@/components/Overview/Overview";
import Statistic from "@/components/Statistic/Statistic";
import AreaStatistic from "@/components/AreaStatistic/AreaStatistic";

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
          <Statistic />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Overview />
        </Col>

        <Col xs={12} md={4}>
          <AreaStatistic />
        </Col>

        <Col xs={12} md={4}>
          <AreaStatistic />
        </Col>

        
      </Row>

    </div>
  );
}
