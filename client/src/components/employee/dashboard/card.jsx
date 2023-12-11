import { Container, Row, Col, Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@/css/employee/dashboard/card.css"

export default function Card({ title, children }) {
    return (
        <Container className="cardContainer">
            <Row>
                <Col xs={11}>
                    <h4>{title}</h4>
                </Col>
                <Col xs={1} className="btnStatistic">
                    <BsThreeDotsVertical />
                </Col>
            </Row>
            <Row>
                {children}
            </Row>
        </Container>
    );
}