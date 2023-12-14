import { getProvinceInfo } from '@/api/data';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default function EstimateCost() {
    const provinceData = getProvinceInfo();
    return (
        <Container className="lookUpContainer">
            <Form>
                <Row >
                    <Col>
                        <p>Gửi từ (*)</p>
                        <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                            <option>Chọn Tỉnh/ TP</option>
                            {provinceData.map((province) => (
                                <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                                    {province.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <p>Gửi đến (*)</p>
                        <Form.Select aria-label="Chọn Tỉnh/ TP" required>
                            <option>Chọn Tỉnh/ TP</option>
                            {provinceData.map((province) => (
                                <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                                    {province.name}
                                </option>
                            ))}
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