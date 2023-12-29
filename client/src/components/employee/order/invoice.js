import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import "@/css/employee/invoice.css";

let orderData;

export default function Invoice({ data }) {
  if (data) {
    orderData = data;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
    return formattedDate;
  };
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
              <p className="fw-bold m-0">Mã đơn hàng: {orderData?.data?.order?.orderID}</p>
              <p className="fw-bold m-0">Ngày đơn hàng: {formatDate(orderData?.data?.order?.createdAt)}</p>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Người gửi: {orderData?.data?.order?.sender?.fullName}</h5>
              <p className="mb-1">Địa chỉ: {orderData?.data?.order?.sender?.address}</p>
              <p className="mb-1">Điện thoại: {orderData?.data?.order?.sender?.phoneNumber}</p>
            </Col>
            <Col className="text-end">
              <h5 className="fw-bold">Người nhận: {orderData?.data?.order?.receiver?.fullName}</h5>
              <p className="mb-1">Địa chỉ: {orderData?.data?.order?.receiver?.address}</p>
              <p className="mb-1">Điện thoại: {orderData?.data?.order?.receiver?.phoneNumber}</p>
            </Col>
          </Row>

          <Row className="mt-2">
            <h5 className="fw-bold">Loại hàng gửi</h5>
            <p>
              {orderData?.data?.goodsList[0]?.goodsType === "goods" ? "Hàng hóa" : "Giấy tờ"}
            </p>
            <Table striped bordered>
              <thead>
                <tr>
                  <th class="text-center">Nội dung</th>
                  <th class="text-center">Số lượng</th>
                  <th class="text-center">Giấy tờ đính kèm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">Tổng</td>
                  <td class="text-center">{orderData?.data?.goodsList.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td class="text-center">{orderData?.data?.goodsList[0]?.attached}</td>
                </tr>
              </tbody>
            </Table>
          </Row>

          <Row className="mt-2">
            <h5 className="fw-bold">
              Chỉ dẫn của người gửi khi không phát được bưu gửi
            </h5>
            <p>
              {orderData?.data?.order?.failChoice === "return" ? "Hoàn trả" : "Khác"}
            </p>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Cước</h5>
              <p className="mb-1">Cước chính: {orderData?.data?.order?.mainPostage}</p>
              <p className="mb-1">Phụ phí: {orderData?.data?.order?.addedPostage}</p>
              <p className="mb-1">Cước GTGT: {orderData?.data?.order?.VATFee}</p>
              <p className="mb-1">Tổng cước: {orderData?.data?.order?.mainPostage + orderData?.data?.order?.addedPostage + orderData?.data?.order?.VATFee}</p>
              <p className="mb-1">Tổng thu: {orderData?.data?.order?.mainPostage + orderData?.data?.order?.addedPostage + orderData?.data?.order?.VATFee}</p>
            </Col>
            <Col className="text-end">
              <h5 className="fw-bold">Khối lượng </h5>
              <p className="mb-1">Khối lượng thực tế: {orderData?.data?.goodsList.reduce((total, item) => total + item.realWeight, 0)}</p>
              <p className="mb-1">Khối lượng quy đổi: {orderData?.data?.goodsList.reduce((total, item) => total + item.convertedWeight, 0)}</p>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5 className="fw-bold">Thu của người nhận</h5>
              <p className="mb-1">COD: {orderData?.data?.order?.receiverCOD}</p>
              <p className="mb-1">Thu khác: {orderData?.data?.order?.receiverOtherFee}</p>
              <p className="mb-1">Tổng thu: {orderData?.data?.order?.receiverCOD + orderData?.data?.order?.receiverOtherFee}</p>
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
      <div className="d-flex justify-content-center m-3">
        <ReactToPrint
          trigger={() => <button className="btn btn-primary rounded-pill">In hóa đơn</button>}
          content={() => componentRef.current}
        />
        <button onClick={() => window.history.back()} className="btn btn-secondary ms-2 rounded-pill">Quay lại</button>
      </div>
    </div>
  );
}
