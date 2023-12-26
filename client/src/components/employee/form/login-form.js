"use client";
import { LuLock } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
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
      username: "23000054",
      password: "password",
      redirect: true,
      callbackUrl: "/employees",
    });
  };
  return (
    <Container fluid className={style.container}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={12} lg={6} xl={5} className={style.image}>
          <Image
            src="/login.png"
            fluid
            alt="Sample image"
            className="w-100 h-100"
          />
        </Col>
        <Col md={12} lg={6} xl={4} offset-xl-1>
          <Form>
            <Row className="text-center text-light">
              <h3>ĐĂNG NHẬP</h3>
            </Row>
            <Row>
              <Form.Group className="mb-3">
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

            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="form2Example3"
                  label="Ghi nhớ"
                  className="text-light"
                />
              </Col>

              <Col className="d-flex justify-content-end">
                <Link href="/" className="text-light">
                  Quay lại trang chủ
                </Link>
              </Col>
            </Row>

            <Row className="m-1">
              <Button
                variant="primary"
                size="lg"
                className="login-btn"
                onClick={onSubMit}
              >
                Đăng nhập
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
