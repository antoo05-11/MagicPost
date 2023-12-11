import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "@/components/employee/dashboard/card";
import "@/css/employee/dashboard/statistic.css"

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";

export default function Statistic({ userRole }) {
    return (
        <Card title={"Tổng quan"}>
            {userRole === 'leader' && (
                <>
                    <Col>
                        <Row>
                            <Col xs={3} className="itemContainer profit">
                                <FaRegMoneyBillAlt size={'2em'} />
                            </Col>

                            <Col>
                                <Row className="title">
                                    <p>Lợi nhuận</p>
                                </Row>
                                <Row className="statisticNumber">
                                    <h5>2.400.000.000 VND</h5>
                                </Row>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="itemContainer totalPackage">
                                <FiPackage size={'2em'} />
                            </Col>

                            <Col>
                                <Row className="title">
                                    <p>Tổng hàng hóa</p>
                                </Row>
                                <Row className="statisticNumber">
                                    <h5>70000</h5>
                                </Row>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="itemContainer transPoint">
                                <TbTruckDelivery size={'2em'} />
                            </Col>

                            <Col>
                                <Row className="title">
                                    <p>Số điểm giao dịch</p>
                                </Row>
                                <Row className="statisticNumber">
                                    <h5>500</h5>
                                </Row>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="itemContainer goodPoint">
                                <LuPackageOpen size={'2em'} />
                            </Col>

                            <Col>
                                <Row className="title">
                                    <p>Số điểm tập kết</p>
                                </Row>
                                <Row className="statisticNumber">
                                    <h5>300</h5>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </>
            )}

            {userRole === 'employee' && (
                <>
                    {/* Employee Statistics */}
                    <Col>
                        <Row>
                            {/* ... (Employee-specific statistics) */}
                            <p>Helo</p>
                        </Row>
                    </Col>
                </>
            )}
        </Card>
    );
}
