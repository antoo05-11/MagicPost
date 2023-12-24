import { getAllProvince } from '@/api/data';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default function EstimateCost() {
    const provinceData = getAllProvince();
    return (
        <Container className="lookUpContainer">
            <Form>
                <Row>
                    <Col xs="12" md="6">
                        <Form.Group>
                            <Form.Label>Gửi từ (*)</Form.Label>
                            <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                                <option>Chọn Tỉnh/ TP</option>
                                {provinceData.map((province) => (
                                    <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                                        {province.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs="12" md="6">
                        <Form.Group>
                            <Form.Label>Gửi đến (*)</Form.Label>
                            <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                                <option>Chọn Tỉnh/ TP</option>
                                {provinceData.map((province) => (
                                    <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                                        {province.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Khối lượng</Form.Label>
                            <Form.Control type="number" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className='submitButton'>Tra cứu</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}