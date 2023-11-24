"use client";
import Image from "react-bootstrap/Image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useSWR } from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Container, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiMoneyDuotone } from "react-icons/pi";
import { FaRegFile } from "react-icons/fa";
import { GoRocket } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";
import { CiMedicalCase } from "react-icons/ci";
import style from "@/css/customer/home-page.module.css";

export default function HomePage() {
  return (
    <div>
      <Header />

      {/* === Section 1: Banner === */}
      <Container fluid className={style.banner}>
        <Image src="banner.png" fluid />
      </Container>

      {/* === Section 2: Lookup === */}
      <Container fluid className={style.lookup}>
        <Row className={style.lookupContainer}>
          <Col xs={12} md={6}>
            <Form>
              <Form.Label className="px-2">
                <MdMyLocation size={"1em"} />
                Tra cứu bưu gửi
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  id="inputCode"
                  name="code"
                  formMethod="get"
                  placeholder="Nhập mã bưu gửi"
                  className="rounded-pill"
                />
                <Button className="rounded-pill mx-2">🔍</Button>
              </InputGroup>
            </Form>
          </Col>
          <Col xs={6} md={2} className={style.lookupItem}>
            <Link href={"/customer/LockupOrders"}>
              <LiaMapMarkedAltSolid size={'4em'} />
              <p>Tìm kiếm bưu cục</p>
            </Link>

          </Col>
          <Col xs={6} md={2} className={style.lookupItem}>
            <Link href={"/customer/EstimateCost"}>
              <PiMoneyDuotone size={'4em'} />
              <p>Ước tính phí</p>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* === Section 3: Service === */}
      <Container className={style.service}>
        <Row className={style.serviceTitle}>
          <h2>Dịch vụ nổi bật</h2>
        </Row>

        <Row className={style.serviceContainer}>
          <Col xs={6} md={3}>
            <div className={style.serviceItem}>
              <h4>MAGICPOST DOC</h4>
              <FaRegFile size={"5em"} />
              <p>
                EMS Tài liệu là dịch vụ nhận gửi, vận chuyển và phát các loại
                thư, tài liệu trong nước theo chỉ tiêu thời gian tiêu chuẩn được
                Tổng công ty EMS công bố.
              </p>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className={style.serviceItem}>
              <h4>MAGICPOST FAST</h4>
              <GoRocket size={"5em"} />
              <p>
                EMS Hỏa tốc là là dịch vụ chất lượng cao có chỉ tiêu thời gian
                toàn trình rút ngắn so với dịch vụ EMS Tài liệu/Hàng hóa nhanh,
                trong đó bưu gửi được ưu tiên chuyển phát đến người nhận trong
                khung thời gian cam kết theo tuyến hành trình cụ thể.
              </p>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className={style.serviceItem}>
              <h4>MAGICPOST GIFT</h4>
              <IoGiftOutline size={"5em"} />
              <p>
                EMS Hỏa tốc là là dịch vụ chất lượng cao có chỉ tiêu thời gian
                toàn trình rút ngắn so với dịch vụ EMS Tài liệu/Hàng hóa nhanh,
                trong đó bưu gửi được ưu tiên chuyển phát đến người nhận trong
                khung thời gian cam kết theo tuyến hành trình cụ thể.
              </p>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className={style.serviceItem}>
              <h4>MAGICPOST CARE</h4>
              <CiMedicalCase size={"5em"} />
              <p>
                EMS Hỏa tốc là là dịch vụ chất lượng cao có chỉ tiêu thời gian
                toàn trình rút ngắn so với dịch vụ EMS Tài liệu/Hàng hóa nhanh,
                trong đó bưu gửi được ưu tiên chuyển phát đến người nhận trong
                khung thời gian cam kết theo tuyến hành trình cụ thể.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* === Section 4: About us === */}
      <Container className={style.aboutUs} fluid>
        <Row>
          <Col xs={5} className={style.aboutUsTitle}>
            <h2>Về chúng tôi</h2>
            <p>
              J&T Express là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và Internet. Chúng tôi sở hữu mạng lưới rộng
              khắp nhằm hỗ trợ các hoạt động giao nhận hàng hóa nhanh chóng
              không chỉ ở nội thành mà còn ở ngoại thành và các vùng xa của các
              tỉnh thành trong cả nước Việt Nam.
            </p>
          </Col>
          <Col xs={6} className={style.aboutUsWrapperItem}>
            <Row>
              <Col>
                <Image src="/63tinh-thanh.png" />
                <h5>63 TỈNH THÀNH</h5>
                <p>Phủ sóng khắp 63 tỉnh thành</p>
              </Col>
              <Col>
                <Image src="/1000xe.png" />
                <h5>ĐA DẠNG PHƯƠNG TIỆN</h5>
                <p>Đa dạng phương tiện vận chuyển hàng hóa</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src="/1900bu-cuc.png" />
                <h5>NHÂN SỰ CHUYÊN NGHIỆP</h5>
                <p>Nhân sự được đào tạo bài bản & chuyên nghiệp</p>
              </Col>
              <Col>
                <Image src="/25000nhan-vien.png" />
                <h5>BƯU CỤC RỘNG KHẮP</h5>
                <p>Mạng lưới bưu cục rộng khắp hoạt động trên toàn quốc</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
