import { getTransactionPoint } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";

console.log(getTransactionPoint(1))

export default function TransactionList() {
    const data = getTransactionPoint()

    return (
        <Container className="lookUpContainer container">
            <Row className="border-bottom mt-2">
                <Row>
                    <h3>Tên</h3>
                </Row>
                <Row>
                    <Col>
                        <p>Địa chỉ</p>
                    </Col>
                    <Col>
                        <p>SDT</p>
                    </Col>
                </Row>
            </Row>
            <Row className="border-bottom mt-2">
                <h5>NAME</h5>
                <p>Địa chỉ</p>
                <p>Tỉnh</p>
            </Row>
            <Row className="border-bottom mt-2">
                <h5>NAME</h5>
                <p>Địa chỉ</p>
                <p>Tỉnh</p>
            </Row>
        </Container>
    );
}