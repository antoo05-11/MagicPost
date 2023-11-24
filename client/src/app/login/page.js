"use client";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "@/css/login.css";
// import "@/css/login.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useContext, Context, createContext } from "react";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  function handleForm() {
    if (typeof window !== "undefined") {
      localStorage.setItem("Token", true);
    }
  }
  return (
    <div className="login-container col-4">
      <div className="title">Login</div>
      <Form
        action={() => {
          handleForm();
        }}
      >
        <Form.Group className="mb-3 account" controlId="formGroupEmail">
          <Form.Label>Email or User name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={account}
            onChange={(event) => {
              setAccount(event.target.value);
            }}
            className="taikhoan"
          />
        </Form.Group>
        <Form.Group className="mb-3 pass" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="matkhau"
          />
        </Form.Group>
        <button type="sumbit">Dang nhap</button>
      </Form>
      <button
        onClick={() => {
          handleForm();
        }}
      >
        Back
      </button>
    </div>
  );
}

export default Login;
