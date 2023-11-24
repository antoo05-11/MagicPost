"use client";
import Image from 'react-bootstrap/Image';
import style from "@/css/customer/estimateCost.module.css"
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
export default function EstimateCost() {
    return (
        <div className={style.estimateCost}>
            <Image src='/uoctinhchiphi.png' fluid />
            <Container className={style.estimateCostContainer}>
                <Form>
                    <Row className={style.estimateCostItem}>
                        <Col>
                            <p>Gửi từ (*)</p>
                            <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                                <option>Chọn Tỉnh/ TP</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <p>Gửi đến (*)</p>
                            <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                                <option>Chọn Tỉnh/ TP</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className={style.estimateCostItem}>
                        <Col>
                            <p>Khối lượng (gram)</p>
                            <Form.Control type="number" required/>
                        </Col>

                    </Row>
                    <Row className={style.estimateCostItem}>
                        <Col>
                            <Button className={style.submitButton}>Tra cứu</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}