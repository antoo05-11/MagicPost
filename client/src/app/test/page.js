"use client";
import React, { useState } from "react";
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

import Card from "@/components/employee/dashboard/card";
import Invoice from "@/components/employee/order/invoice";
export default function AdminPage() {
  const children = {};
  const [extend, isExtend] = useState(true);
  return (
    <div>
      {/* <motion.div>
        <Card title={"HiHi"} extend={extend}>
          <button onClick={() => isExtend(!extend)}>Mo rong</button>
        </Card>
      </motion.div> */}
      <Invoice />
    </div>
  );
}
