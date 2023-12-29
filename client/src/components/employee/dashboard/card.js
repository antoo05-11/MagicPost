import { Row, Col, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@/css/employee/dashboard/card.css";
import { motion, spring } from "framer-motion";

/**
 * React component representing a card with a title, content, and options dropdown.
 *
 * This component allows displaying a card with a given title, content, and an options dropdown menu.
 * The dropdown menu provides interval options (e.g., week, month, year) for the card's content.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed within the card.
 * @param {boolean} props.extend - A boolean flag indicating whether the card is extended or not.
 * @param {Function} props.onChange - A callback function triggered when the interval is changed.
 * @returns {JSX.Element} - The rendered React element for the Card component.
 */
export default function Card({ title, children, extend, onChange }) {
    const handleIntervalClick = (intervalType) => {
        if (onChange) {
            onChange(intervalType);
        }
    };
    return (
        <>
            <div className="disClick" data-isOpen={!extend}></div>
            <motion.div layout transition={spring} className="container cardContainer" data-isExtend={extend}>
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
                                <button className="dropdown-item" onClick={() => handleIntervalClick('week')}>
                                    Tuần
                                </button>
                                <button className="dropdown-item" onClick={() => handleIntervalClick('month')}>
                                    Tháng
                                </button>
                                <button className="dropdown-item" onClick={() => handleIntervalClick('year')}>
                                    Năm
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>{children}</Row>
            </motion.div>
        </>
    );
}
