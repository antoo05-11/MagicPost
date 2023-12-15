import { Container, Row, Col, Table } from "react-bootstrap";

export default function Invoice() {
    return (
        <Container>
            <Row className="text-center">
                <h2>MAGIC POST</h2>
            </Row>

            <Row>
                <Col>

                </Col>

                <Col>
                    <p>Mã đơn hàng</p>
                    <p>Ngày đơn hàng</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Người gửi</h3>
                    <p>Địa chỉ</p>
                    <p>Điện thoại</p>
                    <p>Mã bưu chính</p>
                </Col>

                <Col>
                    <p>Người nhận</p>
                    <p>Địa chỉ</p>
                    <p>Điện thoại</p>
                    <p>Mã bưu chính</p>
                </Col>
            </Row>

            <Row>
                <p>Loại hàng gửi</p>

                <Table>
                    <thead>
                        <th>Nội dung</th>
                        <th>Số lượng</th>
                        <th>Đính kèm</th>
                    </thead>

                    <tbody>

                    </tbody>
                </Table>
            </Row>

            <Row>
                <Col>
                    <p>Dịch vụ đặc biệt/ Cộng thêm</p>
                </Col>
                <Col>
                    <p>Chỉ dẫn của người gửi khi không phát được bưu gửi</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Cước</h3>
                    <p>Cước chính</p>
                    <p>Phụ phí</p>
                    <p>Cước GTGT</p>
                    <p>Tổng cước</p>
                    <p>Tông thu</p>
                </Col>

                <Col>
                    <h3>Khối lượng</h3>
                    <p>Khối lượng thực tế</p>
                    <p>Khối lượng quy đổi</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Thu của người nhận</h3>
                    <p>Col</p>
                    <p>Thu khác</p>
                    <p>Tổng thu</p>
                </Col>

                <Col>
                    <h3>Chữ kí người gửi</h3>
                </Col>
            </Row>
        </Container>
    );
}