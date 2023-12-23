import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import OrderProgress from './order-progress';
import { goodStatus } from '@/api/utils';

export default function OrderTracking({ data }) {
    console.log(data);
    if (!data) {
        return null;
    }

    const formatDate = (dateTimeString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    };

    const status = goodStatus[data.status] || {};

    return (
        <Container className="lookUpContainer">
            <Row>
                <Col className='text-center'>
                    <Row><strong>Số hiệu bưu gửi</strong> </Row>
                    <Row><p className='m-0'>{data.orderID}</p></Row>
                </Col>

                <Col className='text-center'>
                    <Row><strong>Địa chỉ gửi</strong> </Row>
                    <Row><p className='m-0'>{data.sender?.provinceName}</p></Row>
                </Col>

                <Col className='text-center'>
                    <Row><strong>Địa chỉ nhận</strong> </Row>
                    <Row><p className='m-0'>{data.receiver?.provinceName}</p></Row>
                </Col>

                <Col className='text-center'>
                    <Row><strong>Khối lượng</strong> </Row>
                    <Row><p className='m-0'>{data.weight}</p></Row>
                </Col>

                <Col className='text-center'>
                    <Row><strong>Trạng thái</strong> </Row>
                    <Row><p className='m-0'>
                        <span
                            className={`badge rounded-pill bg-${status.color} p-2`}
                        >
                            {status.now}</span>
                    </p></Row>
                </Col>

            </Row>

            <Row>
                <Col>
                    {/* <Table hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Vị trí hiện tại</th>
                                    <th>Điểm tiếp theo</th>
                                    <th>Ngày</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {data.processes?.map((process, index) => (
                                    <tr key={index}>
                                        <td>{process?.processID}</td>
                                        <td>{process?.currentRoutingPoint?.address?.detail}</td>
                                        <td>{process?.nextRoutingPoint?.address?.detail}</td>
                                        <td>{formatDate(process?.arrivedTime)}</td>
                                        <td>{convertStatus(process?.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> */}
                    <OrderProgress orderProcesses={data} />
                </Col>
            </Row>
        </Container>
    );
}
