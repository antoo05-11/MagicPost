"use client";
import { LuLock } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import style from "@/css/login.module.css";

export default function LoginForm() {
  const [username, setusername] = useState();
  const [pass, setpass] = useState();

  const onSubMit = async () => {
    const result = await signIn("credentials", {
      username: "23000014",
      password: "password",
      redirect: true,
      callbackUrl: "/employees",
    });
  };
  return (
    <Container fluid className={style.container}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={9} lg={6} xl={5}>
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            fluid
            alt="Sample image"
          />
        </Col>
        <Col md={6} lg={6} xl={4} offset-xl-1>
          <Form>
            <Row className="text-center text-light">
              <h3>ĐĂNG NHẬP</h3>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                {/* <Form.Label htmlFor="form3Example3">Tài khoản</Form.Label>
                <Form.Control
                  type="email"
                  id="form3Example3"
                  placeholder="Enter a valid email address"
                  onChange={(e) => setusername(e.target.value)}
                  className={style.inputField}
                /> */}
                <Form.Label htmlFor="form3Example3" className="text-light">
                  Tài khoản
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <FaRegUser />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Tài khoản"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                {/* <Form.Label htmlFor="form3Example4">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  id="form3Example4"
                  placeholder="Enter password"
                  onChange={(e) => setpass(e.target.value)}
                /> */}
                <Form.Label htmlFor="form3Example4" className="text-light">
                  Mật khẩu
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <LuLock />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Mật khẩu"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setpass(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-0">
                <Form.Check
                  type="checkbox"
                  id="form2Example3"
                  label="Ghi nhớ"
                  className="text-light"
                />
              </div>
              <a href="#!" className="text-body">
                Quên mật khẩu
              </a>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2 w-100">
              <Button
                variant="primary"
                size="lg"
                className="login-btn"
                onClick={onSubMit}
              >
                Đăng nhập
              </Button>

              <Button variant="primary" size="lg" className="login-btn">
                Đăng nhập
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
