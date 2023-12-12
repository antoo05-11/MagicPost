import { Button, Container, Row, Col } from "react-bootstrap";
import Search from "@/components/lookupOrder/search";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import OrderProgress from "../employee/order-progress";

export default function LookUpOrder() {
    return (
        <Container className="lookUpContainer">
            <Row>
                <Col>
                    <HiOutlineDocumentSearch size={'2rem'} />
                    <p>Nhập mã bưu gửi (VD: EB125966888VN)</p>
                </Col>
            </Row>

            <Row >
                <Search />
            </Row>
        </Container>
    );
}