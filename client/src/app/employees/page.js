"use client";
import { Col, Container, Navbar, Row, Stack, Table } from "react-bootstrap";
import style from "@/css/adminPage.module.css";
import Tables from "@/components/tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AdminPage() {
  return (
    // <div>
    <Container className={style.container}>
      <Row className="h-100">
        <Col>
          <Stack direction="horizontal" gap={3} className="mt-3">
            <div className="p-2">
              <h3>Dashboard</h3>
            </div>
            <div className="p-2 ms-auto">
              <FontAwesomeIcon icon="fa-solid fa-bell fa-2xl" />
              <span className="badge bg-primary rounded-pill">14</span>
            </div>
            <div className="vr" />
            <div className="p-2">
              <FontAwesomeIcon
                icon="fa-solid fa-user-tie"
                className={style.user}
              />
            </div>
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
        <Tables></Tables>
        <Tables></Tables>
        <Tables></Tables>
        <Tables></Tables>
      </Row>
    </Container>
    // hihi
    // </div>
  );
}
