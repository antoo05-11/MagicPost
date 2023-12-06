import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "@/components/demoCard/card";
import { HiOutlineChartBar } from "react-icons/hi";

export default function Statistic() {
    return (
        <Card title={"Statistic"}>
            <Col>
                <Row>
                    <Col xs={3}>
                        <HiOutlineChartBar />
                    </Col>

                    <Col>
                        <p>Lợi nhuận</p>
                        <p>245k</p>
                    </Col>
                </Row>
            </Col>
            
            <Col>
                <Row>
                    <Col xs={3}>
                        <HiOutlineChartBar />
                    </Col>

                    <Col>
                        <p>Hàng nhận</p>
                        <p>245k</p>
                    </Col>
                </Row>
            </Col>

            <Col>
                <Row>
                    <Col xs={3}>
                        <HiOutlineChartBar />
                    </Col>

                    <Col>
                        <p>Hàng đang vận chuyển</p>
                        <p>245k</p>
                    </Col>
                </Row>
            </Col>

            <Col>
                <Row>
                    <Col xs={3}>
                        <HiOutlineChartBar />
                    </Col>

                    <Col>
                        <p>Hàng đã gửi</p>
                        <p>245k</p>
                    </Col>
                </Row>
            </Col>
        </Card>
    );
}