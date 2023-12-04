"use client";
import SearchForm from "@/components/searchform";
// import Tables from "@/components/tables";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import style from "@/css/customer/lookUpTransaction.module.css";
// import Table from "@/components/tables";
export default function () {
  return (
    <div className={style.lookUp}>
      <Image src="/tracuubuucuc.png" fluid />
      <Container className={style.lookUpContainer}>
        <Row>
          <Col>
            <Form>
              <Row className={style.menuContainer}>
                <Form.Select
                  aria-label="Chọn Tỉnh/ TP"
                  className={style.selectContainer}
                  required
                >
                  <option>Chọn Tỉnh/ TP</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Form.Select
                  aria-label="Chọn Quận/ Huyện"
                  className={style.selectContainer}
                  required
                >
                  <option>Chọn Quận/ Huyện</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Form.Select
                  aria-label="Chọn Xã/ Phường"
                  className={style.selectContainer}
                  required
                >
                  <option>Chọn Xã/ Phường</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Button className={style.submitButton}>TRA CỨU</Button>
              </Row>
            </Form>
            <Row>Hiển thị thông tin ở đây, display: none;</Row>
          </Col>

          <Col>
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1VCEMjR_Ldo68vk5FiAWGf_7oV5r9PE8&ehbc=2E312F"
              width="640"
              height="480"
            ></iframe>
          </Col>
        </Row>
      </Container>
      {/* <SearchForm tracuu={"Tra cuu diem giao dich"} />
      <Tables i={1}></Tables> */}
    </div>
  );
}
