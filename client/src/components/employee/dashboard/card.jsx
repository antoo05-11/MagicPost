import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@/css/employee/dashboard/card.css";
import { motion, spring } from "framer-motion";
export default function Card({ title, children, extend}) {
    return (
        <motion.div layout transition={spring} className="container cardContainer" data-isExtend={extend}>
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
        </motion.div>
    );
}
