'use client'
import { Col, Container, Navbar, Row, Stack, Table } from "react-bootstrap";
import style from '@/css/adminPage.module.css';

export default function AdminPage() {
    return (
        <Container fluid className={style.container}>
            <Row className="h-100">
                <Col className={style.rightNav} >
                    <Navbar>
                        <Container>
                            <Navbar.Brand className="text-light">Magic Post</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar className="">
                        <Container>
                            <Navbar.Brand href="#home" className="text-light">Dashboard</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar className="">
                        <Container>
                            <Navbar.Brand href="#home" className="text-light">Order</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar className="">
                        <Container>
                            <Navbar.Brand href="#home" className="text-light">Employee</Navbar.Brand>
                        </Container>
                    </Navbar>

                </Col>
                <Col xs={10}>
                    <Stack direction="horizontal" gap={3} className="mt-3">
                        <div className="p-2">
                            <h3>Dashboard</h3>
                        </div>
                        <div className="p-2 ms-auto">Icon thông báo</div>
                        <div className="vr" />
                        <div className="p-2">Avatar</div>
                    </Stack>
                    <Container fluid>
                        <Row>
                            <h5>Bussines Overview</h5>
                            <Col className={style.statistic}>Thống kê 1</Col>
                            <Col className={style.statistic}>Thống kê 2</Col>
                            <Col className={style.statistic}>Thống kê 3</Col>
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
                </Col>
            </Row>
        </Container>
    );
}