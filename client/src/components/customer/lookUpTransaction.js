import { getDistrictByProvinceID, getProvinceInfo, getCommuneByDistrictID, getTransactionPoint } from "@/api/data";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import TransactionList from "./transactionList";


export default function LookUpTransaction() {
    const provinceData = getProvinceInfo();

    const [selectedProvince, setSelectedProvince] = useState('');
    const [districtData, setDistrictData] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [communeData, setCommuneData] = useState([]);

    const [selectedCommune, setSelectedCommune] = useState('')

    const [showTransactionList, setShowTransactionList] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (selectedProvince && selectedProvince != 0) {
                    const districts = await getDistrictByProvinceID(selectedProvince);
                    setDistrictData(districts);

                    setSelectedDistrict("0");
                    setSelectedCommune("0");
                }

                if (selectedDistrict && selectedDistrict !== "0") {
                    const communes = await getCommuneByDistrictID(selectedDistrict);
                    setCommuneData(communes);
                } else {
                    setCommuneData([])
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [selectedProvince, selectedDistrict]);

    console.log(selectedDistrict)

    const handleSearchButtonClick = () => {
        try {
            setShowTransactionList(true);
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    return (
        <div>
            <Container className="lookUpContainer">
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col >
                                    <Form>
                                        <Row>
                                            <Form.Select
                                                aria-label="Chọn Tỉnh/ TP"
                                                className="selectContainer"
                                                onChange={
                                                    (e) => {
                                                        setSelectedProvince(e.target.options[e.target.selectedIndex].getAttribute('data-key'));
                                                    }}
                                                required
                                            >
                                                <option>Chọn Tỉnh/ TP</option>
                                                {provinceData.map((province) => (
                                                    <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </Form.Select>

                                            <Form.Select
                                                onChange={
                                                    (e) => {
                                                        setSelectedDistrict(e.target.options[e.target.selectedIndex].getAttribute('data-key'));
                                                    }}
                                                required
                                                className="selectContainer"
                                            >
                                                <option>Chọn Quận/ Huyện</option>
                                                {districtData.map((district) => (
                                                    <option key={district.districtID} data-key={district.districtID} value={district.districtID}>
                                                        {district.name}
                                                    </option>
                                                ))}

                                            </Form.Select>

                                            <Form.Select
                                                aria-label="Chọn Xã/ Phường"
                                                className="selectContainer"
                                                onChange={
                                                    (e) => {
                                                        setSelectedCommune(e.target.options[e.target.selectedIndex].getAttribute('data-key'));
                                                    }}
                                                required
                                            >
                                                <option>Chọn Xã/ Phường</option>
                                                {communeData.map((commune) => (
                                                    <option key={commune.communeID} data-key={commune.communeID} value={commune.communeID}>
                                                        {commune.name}
                                                    </option>
                                                ))}
                                            </Form.Select>

                                            <Button className="submitButton" onClick={handleSearchButtonClick}>TRA CỨU</Button>
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