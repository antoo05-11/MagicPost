"use client";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function SignUp() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button>Dang nhap</Button>
    </Form>
  );
}

export default SignUp;
