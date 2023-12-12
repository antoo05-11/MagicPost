import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default function EstimateCost() {
    return (
        <Container className="lookUpContainer">
            <Form>
                <Row >
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

                <Row >
                    <Col>
                        <p>Khối lượng (gram)</p>
                        <Form.Control type="number" required />
                    </Col>

                </Row>
                <Row >
                        
                        <Button className='submitButton'>Tra cứu</Button>
                  
                </Row>
            </Form>
        </Container>
    );
}