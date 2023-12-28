import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@/css/employee/dashboard/card.css";
import { motion, spring } from "framer-motion";
export default function Card({ title, children, extend, setType }) {
    const handleIntervalClick = (intervalType) => {
        // Pass the selected type to the parent component
        setType(intervalType);
    };
    return (
        <div layout transition={spring} className="container cardContainer" data-isExtend={extend}>
            <Row>
                <Col xs={11}>
                    <h4>{title}</h4>
                </Col>
                <Col xs={1} className="btnStatistic dropdown-center">
                    <div class="dropdown">
                        <button class="btn btn-transparent" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <BsThreeDotsVertical />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => handleIntervalClick('Tuần')}>
                                Tuần
                            </button>
                            <button className="dropdown-item" onClick={() => handleIntervalClick('Tháng')}>
                                Tháng
                            </button>
                            <button className="dropdown-item" onClick={() => handleIntervalClick('Năm')}>
                                Năm
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>{children}</Row>
        </div>
    );
}
