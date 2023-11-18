"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaTruckFast } from "react-icons/fa6";
import style from '@/css/customer/header.module.css';

export default function Header() {
  const route = new useRouter();

  return (
    <header >
      <Navbar expand="lg" fixed="top" className={style.headerContainer}>
        <Container>
          <Navbar.Brand onClick={() => { route.push("/"); }}>
            <FaTruckFast size={'3rem'} />
            MAGIC POST
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { route.push("/"); }}>Trang chủ</Nav.Link>
              <NavDropdown title="Tra cứu" id="basic-nav-dropdown" >
                <NavDropdown.Item onClick={() => { route.push("/customer/LockupOrders"); }}>Tra cứu bưu gửi</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { route.push("/customer/LockupTransaction"); }}>Tra cứu bưu cục</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { route.push("/customer/LockupTransaction1"); }}>Ước tính chi phí</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Dịch vụ" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { route.push("/customer/service/doc"); }}>Vận chuyển tài liệu</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { route.push("/customer/service/goods"); }}>Vận chuyển hàng hóa</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { route.push("/customer/service/care"); }}>Vận chuyển đảm bảo</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Button onClick={() => { route.push("/login"); }}>
              Đăng nhập
            </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}


