import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "@/components/employee/dashboard/card";
import "@/css/employee/dashboard/statistic.css";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";
import { motion } from "framer-motion";
import { fetchGeneralStatistic } from "@/api/data";
const StatisticItem = ({ icon, title, value, color }) => (
    <Col xs={12} md={6} lg={3} className="mt-2">
        <Row>
            <Col xs={3} className={`itemContainer ${color}`}>
                {icon}
            </Col>
            <Col>
                <Row className="title">
                    <p>{title}</p>
                </Row>
                <Row className="statisticNumber">
                    <h5>{value}</h5>
                </Row>
            </Col>
        </Row>
    </Col>
);

export default function Statistic({ userRole }) {
    const data = fetchGeneralStatistic();

    const commonStats = [
        <StatisticItem
            icon={<FaRegMoneyBillAlt />}
            title="Lợi nhuận"
            value={data?.totalProfit?.toLocaleString('en-US') || '0'}
            color="profit"
        />,
        <StatisticItem
            icon={<FiPackage />}
            title="Tổng hàng hóa"
            value={data?.goodsQuantity?.toLocaleString('en-US') || '0'}
            color="totalPackage"
        />,
    ];


    return (
        <motion.div>
            <Card title="Tổng quan">
                <div className="d-flex justify-content-between flex-wrap">
                    {userRole === "MANAGER" && (
                        <>
                            {commonStats}
                            <StatisticItem
                                icon={<TbTruckDelivery />}
                                title="Số điểm giao dịch"
                                value={data?.transactionPointsQuantity || 0}
                                color="transPoint"
                            />
                            <StatisticItem
                                icon={<LuPackageOpen />}
                                title="Số điểm tập kết"
                                value={data?.goodsPointsQuantity || 0}
                                color="goodPoint"
                            />
                        </>
                    )}

                    {(userRole === "TRANSACTION_POINT_HEAD" ||
                        userRole === "GOODS_POINT_HEAD") && (
                            <>
                                {commonStats}
                                <StatisticItem
                                    icon={<TbTruckDelivery />}
                                    title="Đang vận chuyển"
                                    value="500"
                                    color="transPoint"
                                />
                                <StatisticItem
                                    icon={<LuPackageOpen />}
                                    title="Đã vận chuyển"
                                    value="500"
                                    color="goodPoint"
                                />
                            </>
                        )}

                    {(userRole === "GOODS_POINT_EMPLOYEE" ||
                        userRole === "TRANSACTION_POINT_EMPLOYEE") && (
                            <>
                                <StatisticItem
                                    icon={<FiPackage />}
                                    title="Tổng hàng hóa"
                                    value="70000"
                                    color="totalPackage"
                                />
                                <StatisticItem
                                    icon={<TbTruckDelivery />}
                                    title="Đang vận chuyển"
                                    value="500"
                                    color="transPoint"
                                />
                                <StatisticItem
                                    icon={<LuPackageOpen />}
                                    title="Đã vận chuyển"
                                    value="500"
                                    color="goodPoint"
                                />
                            </>
                        )}
                </div>
            </Card>
        </motion.div>
    );
}
