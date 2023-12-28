import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import "@/css/employee/invoice.css";

export default function Invoice(data) {
  const orderData = data;
  console.log(orderData);
  const componentRef = useRef();
  return (
    <div id="invoice">
      <Container className="bg-white rounded shadow">
        <div ref={componentRef} className="p-5">
          <Row className="text-center">
            <h1 className="fw-bold">MAGIC POST</h1>
          </Row>

          <Row className="mt-2">
            <Col xs="3" className="d-flex justify-content-center">
              <Image src="/demoQR.png" className="w-50" />
            </Col>

            <Col className="text-end d-flex flex-column justify-content-center">
              {/* <p className="fw-bold m-0">Mã đơn hàng: {orderData?.order?.orderID}</p> */}
              {/* <p className="fw-bold m-0">Ngày đơn hàng: {orderData?.order?.createdAt}</p> */}
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Người gửi</h5>
              <p className="mb-1">Địa chỉ</p>
              <p className="mb-1">Điện thoại</p>
              <p className="mb-1">Mã bưu chính</p>
            </Col>
            <Col className="text-end">
              <h5 className="fw-bold">Người nhận</h5>
              <p className="mb-1">Địa chỉ</p>
              <p className="mb-1">Điện thoại</p>
              <p className="mb-1">Mã bưu chính</p>
            </Col>
          </Row>

          <Row className="mt-2">
            <h5 className="fw-bold">Loại hàng gửi</h5>
            <p>Hàng hóa</p>
            <Table striped bordered>
              <thead>
                <tr>
                  <th class="text-center">Nội dung</th>
                  <th class="text-center">Số lượng</th>
                  <th class="text-center">Trị giá</th>
                  <th class="text-center">Giấy tờ đính kèm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">Tổng</td>
                  <td class="text-center">0</td>
                  <td class="text-center">0</td>
                  <td class="text-center">0</td>
                </tr>
              </tbody>
            </Table>
          </Row>

          <Row className="mt-2">
            <h5 className="fw-bold">
              Chỉ dẫn của người gửi khi không phát được bưu gửi
            </h5>
            <p>Chuyển lại</p>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Cước</h5>
              <p className="mb-1">Cước chính</p>
              <p className="mb-1">Phụ phí</p>
              <p className="mb-1">Cước GTGT</p>
              <p className="mb-1">Tổng cước</p>
              <p className="mb-1">Tông thu</p>
            </Col>
            <Col className="text-end">
              <h5 className="fw-bold">Khối lượng</h5>
              <p className="mb-1">Khối lượng thực tế</p>
              <p className="mb-1">Khối lượng quy đổi</p>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Thu của người nhận</h5>
              <p className="mb-1">COD</p>
              <p className="mb-1">Thu khác</p>
              <p className="mb-1">Tổng thu</p>
            </Col>
            <Col className="text-end">
              <h5 className="fw-bold">Chữ kí của người gửi</h5>
            </Col>
          </Row>

          <Row className="text-center mt-5">
            <h5>Hotline: 302131</h5>
          </Row>
        </div>
      </Container>
      <ReactToPrint
        trigger={() => <button>In hóa đơn</button>}
        content={() => componentRef.current}
      />
      <ReactToPrint
        trigger={() => <button>Tro lai</button>}
        content={() => componentRef.current}
      />
    </div>
  );
}
