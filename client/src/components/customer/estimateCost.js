import { getAllProvince } from '@/api/data';
import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap';

const estimateCost = {
    startProvinceID: "",
    endProvinceID: "",
    weight: ""
};

export default function EstimateCost() {
    const provinceData = getAllProvince();

    return (
        <>
            <Container className="lookUpContainer">
                <Form>
                    <Row>
                        <Col xs="12" md="6">
                            <Form.Group>
                                <Form.Label>Gửi từ (*)</Form.Label>
                                <Form.Select aria-label="Chọn Tỉnh/ TP" required
                                    onChange={(e) => {
                                        estimateCost.startProvinceID = e.target.value;
                                    }}>
                                    <option>Chọn Tỉnh/ TP</option>
                                    {provinceData.map((province) => (
                                        <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID} >
                                            {province.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs="12" md="6">
                            <Form.Group>
                                <Form.Label>Gửi đến (*)</Form.Label>
                                <Form.Select aria-label="Chọn Tỉnh/ TP" required
                                    onChange={(e) => {
                                        estimateCost.endProvinceID = e.target.value;
                                    }}>
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
                                <Form.Control type="number" required
                                    onChange={(e) => {
                                        estimateCost.weight = e.target.value;
                                    }} />
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

            <Container className="lookUpContainer">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Dịch vụ</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tiêu chuẩn</td>
                            <td>23,000</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
}