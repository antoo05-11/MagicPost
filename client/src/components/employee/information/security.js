import { changePassword } from "@/api/action";
import { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Security() {
  const [password, setpass] = useState();
  return (
    <div className="formContainer">
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
              //   console.log("hihi");
              const success = await changePassword({
                newPass: password,
              });
              console.log(success);
            }}
          >
            Xác nhận
          </Button>
        </div>
      </Form>
    </div>
  );
}
