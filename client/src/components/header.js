'use client'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppHeader() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Magic Post</Navbar.Brand>
          <Nav className="me-auto funcs">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Tra cuu don hang</Nav.Link>
            <Nav.Link href="#pricing">Tra cuu dia diem giao dich</Nav.Link>
          </Nav>
          <Button>Sign Up</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default AppHeader;