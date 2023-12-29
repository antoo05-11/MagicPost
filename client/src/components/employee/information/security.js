"use client";
import { changePassword } from "@/api/action";
import { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Security() {
  const [password, setpass] = useState();
  const [haveCode, setHaveCode] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState();
  const [thanhcong, setSuccess] = useState(false);
  return (
    <div className="formContainer">
      {haveCode || (
        <Form>
          <Row>
            <h3>Thay đổi mật khẩu</h3>
          </Row>

          <Row className="mt-2">
            <Col md={6}>
              <Form.Group controlId="newPassword">
                <Form.Label>Mật khẩu mới</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <MdOutlinePassword />
                  </InputGroup.Text>
                  <Form.Control type="password" placeholder="Mật khẩu mới" />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <RiLockPasswordLine />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    onChange={(e) => setpass(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3 btnContainer">
            <Button
              type="button"
              className="btn btnCreate"
              onClick={async () => {
                const success = await changePassword({
                  newPass: password,
                });
                setHaveCode(true);
              }}
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      )}
      {haveCode && (
        <div>
          {thanhcong || (
            <Form>
              <Row>
                <h3>Thay đổi mật khẩu</h3>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group controlId="newPassword">
                    <Form.Label>Nhập mã được gửi về email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        <MdOutlinePassword />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Mã xác thực"
                        onChange={(e) => {
                          setVerifiedCode(e);
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <div className="mt-3 btnContainer">
                    <Button
                      type="button"
                      className="btn btnCreate"
                      onClick={async () => {
                        setSuccess(true);
                        const success = await changePassword({
                          newPass: password,
                          verifiedCode: verifiedCode,
                        });
                      }}
                    >
                      Xác nhận
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
          {thanhcong && (
            <Form>
              <Row>
                <h3>Thay đổi mật khẩu</h3>
              </Row>
              <Row>
                <h4>Đổi mật khẩu thành công</h4>
              </Row>
            </Form>
          )}
        </div>
      )}
    </div>
  );
}
