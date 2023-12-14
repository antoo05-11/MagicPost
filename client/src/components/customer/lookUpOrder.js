import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import OrderTracking from './trackingOrder';
import { getOrderTracking } from '@/api/data';

export default function LookUpOrder() {
    // AEX451934145VN
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [orderID, setOrderID] = useState(searchParams.get('query') || '');

    const [data, setData] = useState();
    const [error, setError] = useState(false);

    const handleSearch = useDebouncedCallback((term) => {

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
        setOrderID(term);
    });

    const handleClick = () => {
        // const dat = getOrderTracking(orderID);
        fetch(`https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`,
            {
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then((dataRes) => {
                        setData(dataRes.order);
                        setError(false);
                    });

                } else {
                    setData(null);
                    setError(true);
                }
            });
        // console.log(data);
    };

    return (
        <>
            <Container className="lookUpContainer">
                <Row>
                    <Col>
                        <HiOutlineDocumentSearch size={'2rem'} />
                        <p>Nhập mã bưu gửi (VD: EB125966888VN)</p>
                    </Col>
                </Row>

                <Row>
                    <Container>
                        <Form>
                            <Row>
                                <Col xs="9">
                                    <Form.Control
                                        className="rounded border"
                                        onChange={(e) => {
                                            handleSearch(e.target.value);
                                        }}
                                        defaultValue={orderID}
                                        required
                                    />
                                </Col>

                                <Col>
                                    <Button className="w-100" onClick={handleClick} >
                                        Tra cứu
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                {error && <p className='text-danger  m-0'>Không tìm thấy bưu gửi</p>}
                            </Row>
                        </Form>
                    </Container>
                </Row>

            </Container>

            {data && <OrderTracking data={data} />}
        </>
    );
}
