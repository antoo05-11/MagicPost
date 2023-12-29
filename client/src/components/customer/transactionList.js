import { getTransactionPoint } from "@/api/data";
import { Container, Row, Col } from "react-bootstrap";

/**
 * React component for displaying a list of transaction points based on location filters.
 *
 * This component fetches transaction point data based on the provided province, district, and commune IDs.
 * It then renders a list of transaction points, including their names and addresses.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.provinceID - The ID of the selected province.
 * @param {number} props.districtID - The ID of the selected district.
 * @param {number} props.communeID - The ID of the selected commune.
 * @returns {JSX.Element} - The rendered React element for the TransactionList component.
 */
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
          </Row>
        </Row>
      ))}
    </Container>
  );
}
