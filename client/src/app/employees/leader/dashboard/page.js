"use client";
import { Col, Container, Navbar, Row, Stack, Table } from "react-bootstrap";
import Tables from "@/components/tables";
import Card from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart"

export default function LeaderDashboard() {
    return (
        <Container>
            <Row>
                <Container fluid>
                    <Row className="pt-3">
                        <Card />
                    </Row>
                    <Row className="pt-3">
                        <Col xs={8}>
                            <Row>
                                <Chart/>
                            </Row>
                            <Row className="pt-3">
                            </Row>
                        </Col>
                        <Col>
                            <h5>Biểu đồ tròn ở đây</h5>
                        </Col>
                    </Row>


                </Container>
            </Row>
        </Container>
    );
}