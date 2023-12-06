import { Container, Row, Col, Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Card({ title, children }) {
    return (
        <Container className="bg-light rounded p-4 shadow-lg mb-2 ">
            <Row>
                <Col xs={11}>
                    <h4>{title}</h4>
                </Col>
                <Col xs={1}>
                    <BsThreeDotsVertical />
                </Col>
            </Row>
            <Row>
                {children}
            </Row>
        </Container>
    );
}