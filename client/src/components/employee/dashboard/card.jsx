import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@/css/employee/dashboard/card.css";

export default function Card({ title, children }) {
    return (
        <Container className="cardContainer">
            <Row>
                <Col xs={11}>
                    <h4>{title}</h4>
                </Col>
                <Col xs={1} className="btnStatistic dropdown-center">
                    <div class="dropdown">
                        <button class="btn btn-transparent" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <BsThreeDotsVertical />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button class="dropdown-item">Tuần</button>
                            <button class="dropdown-item">Tháng</button>
                            <button class="dropdown-item">Năm</button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>{children}</Row>
        </Container>
    );
}
