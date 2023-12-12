import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default function LookUpTransaction() {
    return (
        <Container>
            <Row>
                <Col>
                    <Container>
                        <Row>
                            <Col className="lookUpContainer">
                                <Form>
                                    <Row>
                                        <Form.Select
                                            aria-label="Chọn Tỉnh/ TP"
                                            className="selectContainer"
                                            required
                                        >
                                            <option>Chọn Tỉnh/ TP</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>

                                        <Form.Select
                                            aria-label="Chọn Quận/ Huyện"
                                            className="selectContainer"
                                            required
                                        >
                                            <option>Chọn Quận/ Huyện</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>

                                        <Form.Select
                                            aria-label="Chọn Xã/ Phường"
                                            className="selectContainer"
                                            required
                                        >
                                            <option>Chọn Xã/ Phường</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>

                                        <Button className="submitButton">TRA CỨU</Button>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>

                <Col className="mapContainer">
                    <iframe
                        src="https://www.google.com/maps/d/u/0/embed?mid=1VCEMjR_Ldo68vk5FiAWGf_7oV5r9PE8&ehbc=2E312F"
                        width="640"
                        height="480"
                        className="map"
                    ></iframe>
                </Col>
            </Row>

        </Container>

    );
}