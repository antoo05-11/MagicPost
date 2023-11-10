"use client";
import { Col, Container, Navbar, Row, Stack, Table } from "react-bootstrap";
import Tables from "@/components/tables";

export default function LeaderDashboard() {
    return (
        <Container>
            <Row>
                <Container fluid>
                    <Row>
                        <h5>Bussines Overview</h5>
                        <Col>Thống kê 1</Col>
                        <Col>Thống kê 2</Col>
                        <Col>Thống kê 3</Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>New Order</h5>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan={2}>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <h5>Top customer</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan={2}>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <h4>Chart</h4>
                        <p>Thêm biểu đồ ở đây nhé</p>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
}