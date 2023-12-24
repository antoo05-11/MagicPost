import { getTransactionPoint } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function TransactionList({ provinceID, districtID, communeID }) {
  const data = getTransactionPoint(provinceID, districtID, communeID);
  console.log(data);
  return (
    <Container
      className="lookUpContainer"
      style={{ maxHeight: "300px", overflowY: "auto" }}>
      <Row>
        <Col><h3>Số lượng bưu cục: {data.length}</h3></Col>
      </Row>
      {data.map((item, index) => (
        <Row key={index} className="border-bottom mt-2">
          <Row>
            <h3>Tên: {item?.name}</h3>
          </Row>
          <Row>
           
              <p>Địa chỉ: {item?.address}</p>
              <p>Commune: {item?.address?.commune?.name}</p>
              <p>District: {item?.address?.district?.name}</p>
              <p>Province: {item?.address?.province?.name}</p>
            
          </Row>
        </Row>
      ))}
    </Container>
  );
}
