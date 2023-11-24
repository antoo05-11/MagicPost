import { Container, Row, Col } from 'react-bootstrap';
import style from "@/css/customer/footer.module.css";
import { FaAngleRight } from "react-icons/fa6";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <Container className={style.container}>
                <Row>
                    <Col xs={6}>
                        <h3>TỔNG CÔNG TY CHUYỂN PHÁT MAGIC POST</h3>
                        <p>Địa chỉ: Số 28 Đỗ Đức Dục - Mễ Trì - Nam Từ Liêm - Hà Nội</p>
                        <p>Hotline: 0858 562 678</p>
                    </Col>

                    <Col>
                        <h3>Về MAGIC POST</h3>
                        <ul className={style.footerMenu}>
                            <li>
                                <Link href="/customer/History">
                                    <FaAngleRight />
                                    Lịch sử hình thành
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/Recruit">
                                    <FaAngleRight />
                                    Tuyển dụng
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <h3>Tra cứu</h3>
                        <ul className={style.footerMenu}>
                            <li>
                                <Link href="/customer/LockupOrders">
                                    <FaAngleRight />
                                    Tra cứu bưu gửi
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/LockupTransaction">
                                    <FaAngleRight />
                                    Tra cứu bưu cục
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/EstimateCost">
                                    <FaAngleRight />
                                    Ước tính chi phí
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col>
                        <h3>Dịch vụ</h3>
                        <ul className={style.footerMenu}>
                            <li>
                                <Link href="/customer/service/doc">
                                    <FaAngleRight />
                                    Vận chuyển tài liệu
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/service/goods">
                                    <FaAngleRight />
                                    Tra cứu hàng hóa
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/service/care">
                                    <FaAngleRight />
                                    Vận chuyển đảm bảo
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}