import { Container, Row, Col } from 'react-bootstrap';
import style from "@/css/customer/footer.module.css";
import { FaAngleRight } from "react-icons/fa6";

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
                                <FaAngleRight />
                                Lịch sử hình thành
                            </li>
                            <li>
                                <FaAngleRight />
                                Tuyển dụng
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <h3>Tra cứu</h3>
                        <ul className={style.footerMenu}>
                            <li>
                                <FaAngleRight />
                                Tra cứu bưu gửi
                            </li>
                            <li>
                                <FaAngleRight />
                                Tra cứu bưu cục
                            </li>
                            <li>
                                <FaAngleRight />
                                Ước tính phí
                            </li>
                        </ul>
                    </Col>

                    <Col>
                        <h3>Dịch vụ</h3>
                        <ul className={style.footerMenu}>
                            <li>
                                <FaAngleRight />
                                Vận chuyển tài liệu
                            </li>
                            <li>
                                <FaAngleRight />
                                Vận chuyển hàng hóa
                            </li>
                            <li>
                                <FaAngleRight />
                                Vận chuyển đảm bảo
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}