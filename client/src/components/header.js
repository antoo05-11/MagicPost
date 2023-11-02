"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AppHeader() {
  const route = new useRouter();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Magic Post</Navbar.Brand>
          <Nav className="me-auto funcs">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/customer/LockupOrders">Tra cuu don hang</Nav.Link>
            <Nav.Link href="/customer/LockupTransaction">
              Tra cuu dia diem giao dich
            </Nav.Link>
          </Nav>
          <Button
            onClick={() => {
              route.push("/signup");
            }}
          >
            Sign Up
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default AppHeader;
