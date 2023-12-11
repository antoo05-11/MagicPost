"use client";
import { Button, Container, Row, Col } from "react-bootstrap";
import Script from "next/script";
import Image from 'react-bootstrap/Image';
import Search from "@/components/lookupOrder/search";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import style from "@/css/customer/lookUpOrder.module.css";
import OrderProgress from "@/components/employee/order-progress";

export default function page({ searchParams: { query, page } }) {
  const currentQuery = query || "";
  const currentPage = Number(page);
  return (
    <div className={style.lookUp}>
      <Image src="/tracuubuugui.png" fluid />
      <Container className={style.lookUpContainer}>
        <Row>
          <Col className={style.searchTitle}>
            <HiOutlineDocumentSearch size={'2rem'} />
            <p>Nhập mã bưu gửi (VD: EB125966888VN)</p>
          </Col>
        </Row>
        <Row className={style.demo}>
            <Search />
        </Row>
      </Container>

      <Container>
        <OrderProgress />
      </Container>
    </div>
  );
}
