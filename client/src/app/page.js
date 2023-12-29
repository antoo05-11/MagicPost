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
import { FaRegBuilding } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { RiTruckLine } from "react-icons/ri";
import { RiUserHeartLine } from "react-icons/ri";
import style from "@/css/customer/homePage.module.css";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [orderID, setOrderID] = useState('');
  const handleSearch = () => {
    if (orderID.trim() !== '') {
      router.push(`/customer/LockupOrders?query=${orderID}`);
    }
  };

  return (
    <div className={style.homePageContainer}>
      <div className={style.banner}>
        <Header />

        <Container>
          <Row className={style.bannerItemContainer}>
            <Col md={5} xl={6} xxl={5} className="text-md-start text-center py-8">
              <h3 className="fw-normal">Nhà cung cấp tin cậy cho </h3>
              <h3 className="fw-bolder">Dịch vụ chuyển phát nhanh</h3>
              <h1 className="fw-bolder">MAGIC POST</h1>
              <p>Cùng bạn đến mọi miền tổ quốc</p>
            </Col>
            <Col md={7} xl={6} xxl={7} className="text-center">
              <Image src="/hero.png" className="pt-6 pt-md-0 w-100"></Image>
            </Col>
          </Row>
        </Container>
      </div>

      {/* === Section 2: Lookup === */}
      <Container className={style.lookup}>
        <Container>
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
                    onChange={(e) => setOrderID(e.target.value)}
                  />
                  <Button className="rounded-pill mx-2" onClick={handleSearch}>🔍</Button>
                </InputGroup>
              </Form>
            </Col>
            <Col xs={6} md={2} className={`${style.lookupItem} text-center mt-3 mt-md-0`}>
              <Link href={"/customer/LockupTransaction"}>
                <LiaMapMarkedAltSolid size={'4em'} />
                <p>Tìm kiếm bưu cục</p>
              </Link>
            </Col>
            <Col xs={6} md={2} className={`${style.lookupItem} text-center mt-3 mt-md-0`}>
              <Link href={"/customer/EstimateCost"}>
                <PiMoneyDuotone size={'4em'} />
                <p>Ước tính phí</p>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* === Section 3: Service === */}
      <Container className={style.service}>
        <Row className={style.serviceTitle}>
          <h5>DỊCH VỤ</h5>
          <h2>Dịch vụ nổi bật</h2>
        </Row>

        <Row className={style.serviceContainer}>
          <Col xs={6} lg={3} className="mb-3">
            <div className={style.serviceItem}>
              <h4>MAGICPOST DOC</h4>
              <FaRegFile size={"5em"} />
              <p>
                MagicPost Tài Liệu là dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài liệu trong nước theo
                chỉ tiêu thời gian tiêu chuẩn được công bố bởi Magic Post.
              </p>
            </div>
          </Col>
          <Col xs={6} lg={3} className="mb-3">
            <div className={style.serviceItem}>
              <h4>MAGICPOST FAST</h4>
              <GoRocket size={"5em"} />
              <p>
                MagicPost Hỏa Tốc là dịch vụ chất lượng cao với chỉ tiêu thời gian toàn trình rút ngắn
                so với dịch vụ Magic Post Chuyển Phát Nhanh, trong đó bưu gửi được ưu tiên chuyển phát
                đến người nhận trong khung thời gian cam kết theo tuyến hành trình cụ thể.
              </p>
            </div>
          </Col>
          <Col xs={6} lg={3} className="mb-3">
            <div className={style.serviceItem}>
              <h4>MAGICPOST GIFT</h4>
              <IoGiftOutline size={"5em"} />
              <p>
                MagicPost Gift - dịch vụ đặc biệt của Magic Post, chuyên gửi quà tặng nhanh chóng và an toàn.
                Gửi quà cho người thân, bạn bè hay đối tác kinh doanh trở nên dễ dàng và ý nghĩa với dịch vụ này.
              </p>
            </div>
          </Col>
          <Col xs={6} lg={3} className="mb-3">
            <div className={style.serviceItem}>
              <h4>MAGICPOST CARE</h4>
              <CiMedicalCase size={"5em"} />
              <p>
                MagicPost Care là dịch vụ hàng hóa chăm sóc cao cấp của Magic Post, mang đến sự an toàn và chăm sóc tối đa cho các bưu phẩm. Với chất lượng vận chuyển hàng đầu, MagicPost Care cam kết đảm bảo mọi gói hàng được gửi đi và đến nơi một cách an toàn và đúng hẹn.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* === Section 4: About us === */}
      <Container className={style.aboutUs} >
        <Row className={style.aboutUsTitle}>
          <h5>VỀ CHÚNG TÔI</h5>
          <h2>Dịch vụ chuyển phát nhanh chuyên nghiệp</h2>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Image src="/22.png" className="pt-6 pt-md-0 w-100"></Image>
          </Col>
          <Col className={style.aboutUsWrapperItem} xs={12} md={6}>

            <Row className={style.aboutUsItem}>
              <Col xs={2} >
                <FaRegBuilding size={"5em"} />
              </Col>
              <Col xs={10}>
                <h5>BƯU CỤC RỘNG KHẮP</h5>
                <p>Mạng lưới bưu cục rộng khắp hoạt động trên toàn quốc</p>
              </Col>
            </Row>

            <Row className={style.aboutUsItem}>
              <Col xs={2} >
                <RiUserHeartLine size={"5em"} />
              </Col>
              <Col xs={10}>
                <h5>KHÁCH HÀNG TIN DÙNG</h5>
                <p>Số lượng khách hàng đông đảo trải dài khắp 63 tỉnh thành</p>
              </Col>
            </Row>

            <Row className={style.aboutUsItem} >
              <Col xs={2}>
                <BsPeople size={"5em"} />
              </Col>
              <Col xs={10}>
                <h5>NHÂN SỰ CHUYÊN NGHIỆP</h5>
                <p>Nhân sự được đào tạo bài bản & chuyên nghiệp</p>
              </Col>
            </Row>

            <Row className={style.aboutUsItem}>
              <Col xs={2}>
                <RiTruckLine size={"5em"} />
              </Col>
              <Col xs={10}>
                <h5>ĐA DẠNG PHƯƠNG TIỆN</h5>
                <p>Đa dạng phương tiện vận chuyển hàng hóa</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
