import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { goodStatus } from '@/api/utils';
import OrderProgress from './order-progress';

/**
 * React component for displaying order tracking information.
 *
 * This component renders order details, including order ID, sender and receiver addresses,
 * weight, and order status. It also includes the OrderProgress component to display the
 * timeline of order processes.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.data - The order tracking data.
 * @returns {JSX.Element} - The rendered React element for the OrderTracking component.
 */
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
            <Row className='d-flex justify-content-between'>
                <Col className='text-center mt-3' xs="12" md="auto">
                    <Row><strong>Số hiệu bưu gửi</strong> </Row>
                    <Row><p className='m-0'>{data.orderID}</p></Row>
                </Col>

                <Col className='text-center  mt-3' xs="6" md="auto">
                    <Row><strong>Địa chỉ gửi</strong> </Row>
                    <Row><p className='m-0'>{data.sender?.provinceName}</p></Row>
                </Col>

                <Col className='text-center  mt-3' xs="6" md="auto">
                    <Row><strong>Địa chỉ nhận</strong> </Row>
                    <Row><p className='m-0'>{data.receiver?.provinceName}</p></Row>
                </Col>

                <Col className='text-center  mt-3' xs="6" md="auto">
                    <Row><strong>Khối lượng</strong> </Row>
                    <Row><p className='m-0'>{data.weight}g</p></Row>
                </Col>

                <Col className='text-center  mt-3' xs="6" md="auto">
                    <Row><strong>Trạng thái</strong> </Row>
                    <Row>
                        <p>
                            <span className={`badge rounded-pill bg-${status.color} p-2`} >
                                {status.now}
                            </span>
                        </p>
                    </Row>
                </Col>

            </Row>
            <Row>
                <Col>
                    <OrderProgress orderProcesses={data} />
                </Col>
            </Row>
        </Container>
    );
}
