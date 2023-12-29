import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { CiCreditCard2 } from "react-icons/ci";
import { BsGenderAmbiguous } from "react-icons/bs";
import { TiLocationArrowOutline } from "react-icons/ti";
import { GrMapLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";

export default function MainInformation(data) {
  const convertGender = (gender) => {
    if (gender) {
      switch (gender.toLowerCase()) {
        case "male":
          return "Nam";
        case "female":
          return "Nữ";
        default:
          return "Không xác định";
      }
    } else {
      return "Không xác định";
    }
  };

  return (
    <div className="formContainer">
      <Row>
        <h3>Thông tin nhân viên</h3>
      </Row>
      <Row className="mt-2">
        <Col md={6}>
          <Form.Group controlId="fullName">
            <Form.Label>Họ và tên</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaRegUserCircle />
              </InputGroup.Text>
              <Form.Control type="text" value={data?.data?.fullName} disabled />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="dob">
            <Form.Label>Ngày sinh</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaRegCalendar />
              </InputGroup.Text>
              <Form.Control
                type="date"
                value={data?.data?.birthDate}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Địa chỉ Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <MdAlternateEmail />
              </InputGroup.Text>
              <Form.Control type="email" value={data?.data?.email} disabled />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <IoMdPhonePortrait />
              </InputGroup.Text>
              <Form.Control
                type="tel"
                value={data?.data?.phoneNumber}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md={6}>
          <Form.Group controlId="identifer">
            <Form.Label>CCCD</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <CiCreditCard2 />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={data?.data?.identifier}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="gender">
            <Form.Label>Giới tính</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <BsGenderAmbiguous />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={convertGender(data?.data?.gender)}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Form.Label className="col-sm-12 col-form-label">Địa chỉ</Form.Label>
        <Col md={4}>
          <Form.Group controlId="commune">
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <TiLocationArrowOutline />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Xã"
                disabled
                value={data?.data?.address?.commune.name}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <GrMapLocation />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Quận"
              disabled
              value={data?.data?.address?.district.name}
            />
          </InputGroup>
        </Col>

        <Col md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <IoLocationOutline />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tỉnh"
              disabled
              value={data?.data?.address?.province.name}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <TbCurrentLocation />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Chi tiết"
              disabled
              value={data?.data?.address?.detail}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}
