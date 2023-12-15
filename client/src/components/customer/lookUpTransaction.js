import {
  getDistrictByProvinceID,
  getProvinceInfo,
  getCommuneByDistrictID,
  getTransactionPoint,
  getAllProvince,
} from "@/api/data";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import TransactionList from "./transactionList";

export default function LookUpTransaction() {
  const provinceData = getAllProvince();

  const [selectedProvince, setSelectedProvince] = useState();

  const districtData = getDistrictByProvinceID(selectedProvince);
  districtData.unshift({
    name: "Chọn Quận/ Huyện",
    districtID: 0,
  });
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const communeData = getCommuneByDistrictID(selectedDistrict);
  communeData.unshift({
    name: "Chọn Xã/ Phường",
    communeID: 0,
  });

  const [selectedCommune, setSelectedCommune] = useState("");

  const [showTransactionList, setShowTransactionList] = useState(false);

  const data = getDistrictByProvinceID(0);
  return (
    <div>
      <Container className="lookUpContainer">
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Form.Select
                        aria-label="Chọn Tỉnh/ TP"
                        className="selectContainer"
                        onChange={(e) => {
                          setSelectedProvince(e.target.value);
                          setSelectedDistrict(0);
                          setSelectedCommune(0);
                        }}
                        required
                      >
                        <option value={0}>Chọn Tỉnh/ TP</option>
                        {provinceData.map((province) => (
                          <option
                            key={province.provinceID}
                            value={province.provinceID}
                          >
                            {province.name}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Select
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          setSelectedCommune(0);
                        }}
                        required
                        className="selectContainer"
                      >
                        {districtData?.map((district) => (
                          <option
                            key={district.districtID}
                            value={district.districtID}
                          >
                            {district.name}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Select
                        aria-label="Chọn Xã/ Phường"
                        className="selectContainer"
                        onChange={(e) => {
                          setSelectedCommune(e.target.value);
                        }}
                        required
                      >
                        {communeData.map((commune) => (
                          <option
                            key={commune.communeID}
                            value={commune.communeID}
                          >
                            {commune.name}
                          </option>
                        ))}
                      </Form.Select>

                      <Button
                        className="submitButton"
                        onClick={() => {
                          setShowTransactionList(true);
                        }}
                      >
                        TRA CỨU
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col className="mapContainer">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1VCEMjR_Ldo68vk5FiAWGf_7oV5r9PE8&ehbc=2E312F"
              width="640"
              height="350"
              className="map"
            ></iframe>
          </Col>
        </Row>
      </Container>
      {showTransactionList && (
        <TransactionList
          provinceID={selectedProvince}
          districtID={selectedDistrict}
          communeID={selectedCommune}
        />
      )}
    </div>
  );
}
