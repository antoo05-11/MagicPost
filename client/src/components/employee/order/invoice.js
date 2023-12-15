import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

function OrderID() {
    return (
        <>
            <Col xs="3" className="d-flex justify-content-center">
                <Image src="/demoQR.png" className="w-50" />
            </Col>

            <Col className="text-end d-flex flex-column justify-content-center">
                <p className="fw-bold m-0">Mã đơn hàng: AX310231</p>
                <p className="fw-bold m-0">Ngày đơn hàng: 24/11/2003</p>
            </Col>
        </>
    );
}

function SenderInfo() {
    return (
        <>
            <Col>
                <h5 className="fw-bold">Người gửi</h5>
                <p className="mb-1">Địa chỉ</p>
                <p className="mb-1">Điện thoại</p>
                <p className="mb-1">Mã bưu chính</p>
            </Col>
        </>
    );
}


function ReceiverInfo() {
    return (
        <Col className="text-end">
            <h5 className="fw-bold">Người nhận</h5>
            <p className="mb-1">Địa chỉ</p>
            <p className="mb-1">Điện thoại</p>
            <p className="mb-1">Mã bưu chính</p>
        </Col>
    );
}

function OrderDetail() {
    return (
        <>
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
        </>
    );
}

function Note() {
    return (
        <>
            <h5 className="fw-bold">Chỉ dẫn của người gửi khi không phát được bưu gửi</h5>
            <p>Chuyển lại</p>
        </>
    );
}

function Cost() {
    return (
        <Col>
            <h5 className="fw-bold">Cước</h5>
            <p className="mb-1">Cước chính</p>
            <p className="mb-1">Phụ phí</p>
            <p className="mb-1">Cước GTGT</p>
            <p className="mb-1">Tổng cước</p>
            <p className="mb-1">Tông thu</p>
        </Col>
    );
}

function Quantity() {
    return (
        <>
            <Col className="text-end">
                <h5 className="fw-bold">Khối lượng</h5>
                <p className="mb-1">Khối lượng thực tế</p>
                <p className="mb-1">Khối lượng quy đổi</p>
            </Col>
        </>
    );
}

function COD() {
    return (
        <>
            <Col>
                <h5 className="fw-bold">Thu của người nhận</h5>
                <p className="mb-1">COD</p>
                <p className="mb-1">Thu khác</p>
                <p className="mb-1">Tổng thu</p>
            </Col>
        </>
    );
}

function Signature() {
    return (
        <>
            <Col className="text-end">
                <h5 className="fw-bold">Chữ kí của người gửi</h5>
            </Col>
        </>
    );

}

export default function Invoice() {
    const componentRef = useRef();
    return (
        <>
            <ReactToPrint trigger={() => <button>Print</button>} content={() => componentRef.current} />
            <Container className="bg-white rounded shadow">
                <div ref={componentRef} className="p-5">
                    <Row className="text-center" >
                        <h1 className="fw-bold">MAGIC POST</h1>
                    </Row>

                    <Row className="mt-2">
                        <OrderID />
                    </Row>

                    <Row className="mt-2">
                        <SenderInfo />
                        <ReceiverInfo />
                    </Row>

                    <Row className="mt-2">
                        <OrderDetail />
                    </Row>

                    <Row className="mt-2">
                        <Note />
                    </Row>

                    <Row className="mt-2">
                        <Cost />
                        <Quantity />
                    </Row>

                    <Row className="mt-2">
                        <COD />
                        <Signature />
                    </Row>

                    <Row className="text-center mt-5">
                        <h5>Hotline: 302131</h5>
                    </Row>
                </div>
            </Container>
        </>
    );
}