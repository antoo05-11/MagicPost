import { getTransactionPoint } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function TransactionList({ provinceID, districtID, communeID }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            async function fetchData() {
                let result;
                if (provinceID && provinceID !== '0') {
                    result = await getTransactionPoint(provinceID);
                }
                if (districtID && districtID !== '0') {
                    result = await getTransactionPoint(provinceID, districtID);
                }
                if (communeID && communeID !== '0') {
                    result = await getTransactionPoint(provinceID, districtID, communeID);
                }
                setData(result || []);
            }

            fetchData();
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    }, [provinceID, districtID, communeID]);

    const postOfficeCount = data.length;

    return (
        <Container className="lookUpContainer" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Row>
                <Col>
                    <h3>Số lượng bưu cục: {postOfficeCount}</h3>
                </Col>
            </Row>
            {data.slice(0, 3).map((item, index) => (
                <Row key={index} className="border-bottom mt-2">
                    <Row>
                        <h3>Transaction Details</h3>
                    </Row>
                    <Row>
                        <Col>
                            <p>Địa chỉ: {item.address.detail}</p>
                            <p>Commune: {item.address.commune.name}</p>
                            <p>District: {item.address.district.name}</p>
                            <p>Province: {item.address.province.name}</p>
                        </Col>
                    </Row>
                </Row>
            ))}
        </Container>
    );
}
