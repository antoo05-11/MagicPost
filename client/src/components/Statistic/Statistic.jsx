import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "@/components/demoCard/card";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";

export default function Statistic({ userRole }) {
    return (
        <Card title={"Tổng quan"}>
            {userRole === 'leader' && (
                <>
                    {/* Leader Statistics */}
                    <Col>
                        <Row>
                            <Col xs={3} className="bg-warning d-flex justify-content-center align-items-center rounded">
                                <FaRegMoneyBillAlt size={'2em'} />
                            </Col>

                            <Col>
                                <p>Lợi nhuận</p>
                                <p>245.000.000.000 VND</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="bg-warning d-flex justify-content-center align-items-center rounded">
                                <FiPackage size={'2em'} />
                            </Col>

                            <Col>
                                <p>Tổng hàng hóa</p>
                                <p>73820</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="bg-warning d-flex justify-content-center align-items-center rounded">
                                <TbTruckDelivery size={'2em'} />
                            </Col>

                            <Col>
                                <p>Số điểm giao dịch</p>
                                <p>1200</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} className="bg-warning d-flex justify-content-center align-items-center rounded">
                                <LuPackageOpen size={'2em'} />
                            </Col>

                            <Col>
                                <p>Số điểm tập kết</p>
                                <p>300</p>
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
