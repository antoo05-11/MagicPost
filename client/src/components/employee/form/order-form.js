"use client";

import "@/css/employee/customForm.css";
import "@/css/employee/customTable.css";
import { useEffect, useState } from "react";
import {
  getDistrictByProvinceID,
  getProvinceInfo,
  getCommuneByDistrictID,
  getAllProvince,
} from "@/api/data";
import { createOrder, estimateFee } from "@/api/action";
import { FaTrash } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";

const order = {
  order: {
    sender: {
      fullname: "",
      phoneNumber: "",
      address: {
        detail: "",
        communeID: "",
        districtID: "",
        provinceID: "",
      },
    },
    receiver: {
      fullname: "",
      phoneNumber: "",
      address: {
        detail: "",
        communeID: "",
        districtID: "",
        provinceID: "",
      },
    },
    failChoice: "",
    specialService: "",
  },
  goodsList: [
    {
      realWeight: "",
      convertedWeight: "",
      goodsType: "",
    },
  ],
};
export default function OrderForm() {
  const provinceData = getAllProvince();

  const [senderProvince, setsenderProvince] = useState();
  const districtDataSender = getDistrictByProvinceID(senderProvince);
  districtDataSender.unshift({
    name: "Chọn Quận/ Huyện",
    districtID: 0,
  });
  const [senderDistrict, setsenderDistrict] = useState();
  const communeDataSender = getCommuneByDistrictID(senderDistrict);
  communeDataSender.unshift({
    name: "Chọn Xã / Phường",
    districtID: 0,
  });
  const [senderCommune, setsenderCommune] = useState();

  const [receiverProvince, setreceiverProvince] = useState();
  const districtDataReceiver = getDistrictByProvinceID(receiverProvince);
  districtDataReceiver.unshift({
    name: "Chọn Quận/ Huyện",
    districtID: 0,
  });
  const [receiverDistrict, setreceiverDistrict] = useState();
  const communeDataReceiver = getCommuneByDistrictID(receiverDistrict);
  communeDataReceiver.unshift({
    name: "Chọn Xã / Phường",
    districtID: 0,
  });
  const [receiverCommune, setreceiverCommune] = useState();

  const [addGoods, setAddGoods] = useState(false);

  const [goodsList, setGoodsList] = useState([
    { id: 1, goodsType: "", realWeight: "", convertedWeight: "" },
  ]);

  const addRow = () => {
    const newRow = {
      id: goodsList.length + 1,
      goodsType: "",
      realWeight: "",
      convertedWeight: "",
    };
    setGoodsList([...goodsList, newRow]);
  };

  const removeRow = (id) => {
    const updatedGoodsList = goodsList.filter((row) => row.id !== id);
    setGoodsList(updatedGoodsList);
  };

  return (
    <>
      <div className="container">
        {/* === Thông tin người gửi  ===*/}
        <div className="formContainer">
          <Row>
            <h3>Thông tin người gửi</h3>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="senderName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  onChange={(e) => {
                    order.order.sender.fullname = e.target.value;
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="senderPhoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => {
                    order.order.sender.phoneNumber = e.target.value;
                  }} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Form.Group controlId="senderAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Row>
                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setsenderProvince(e.target.value);
                      order.order.sender.address.provinceID = e.target.value;
                      setsenderDistrict(0);
                      setsenderCommune(0);
                    }}>
                    <option>Chọn Tỉnh / TP</option>
                    {provinceData.map((province) => (
                      <option key={province.provinceID} value={province.provinceID}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setsenderDistrict(e.target.value);
                      setsenderCommune(0);
                      order.order.sender.address.districtID = e.target.value;
                    }}>
                    {districtDataSender.map((district) => (
                      <option key={district.districtID} value={district.districtID}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setsenderCommune(e.target.value);
                      order.order.sender.address.communeID = e.target.value;
                    }}>
                    {communeDataSender.map((commune) => (
                      <option key={commune.communeID} value={commune.communeID}>
                        {commune.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Chi tiết"
                    onChange={(e) => {
                      order.order.sender.address.detail = e.target.value;
                    }} />
                </Col>
              </Row>
            </Form.Group>
          </Row>
        </div>

        {/* === Thông tin người nhận === */}
        <div className="formContainer">
          <Row>
            <h3>Thông tin người nhận</h3>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="receiverName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  onChange={(e) => {
                    order.order.receiver.fullname = e.target.value;
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="receiverPhoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => {
                    order.order.receiver.phoneNumber = e.target.value;
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-2">
            <Form.Group controlId="receiverAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Row>
                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setreceiverProvince(e.target.value);
                      order.order.receiver.address.provinceID = e.target.value;
                      setreceiverDistrict(0);
                      setreceiverCommune(0);
                    }}>
                    <option sender>Chọn Tỉnh / TP</option>
                    {provinceData.map((province) => (
                      <option key={province.provinceID} value={province.provinceID}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setreceiverDistrict(e.target.value);
                      order.order.receiver.address.districtID = e.target.value;
                      setreceiverCommune(0);
                    }}>
                    {districtDataReceiver.map((district) => (
                      <option key={district.districtID} value={district.districtID}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xs="4">
                  <Form.Select
                    onChange={(e) => {
                      setreceiverCommune(e.target.value);
                      order.order.receiver.address.communeID = e.target.value;
                    }}>
                    {communeDataReceiver.map((commune) => (
                      <option key={commune.communeID} value={commune.communeID}>
                        {commune.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Chi tiết"
                    onChange={(e) => {
                      order.order.receiver.address.detail = e.target.value;
                    }} />
                </Col>
              </Row>
            </Form.Group>
          </Row>
        </div>
        <div className="formContainer">
          <Row>
            <h3>Các thông tin khác</h3>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Trường hợp vận chuyển thất bại</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    order.order.failChoice = e.target.value;
                  }}>
                  <option value={"default"}>Hoàn trả</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Dịch vụ đặc biệt</Form.Label>
                <Form.Control
                  placeholder="Dịch vụ đặc biệt"
                  onChange={(e) => (order.order.specialService = e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="mb-4">
            <Col>
              <div className="formContainer h-100 pb-0">
                <Row>
                  <h3>Cước</h3>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Cước chính</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Cước chính"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Phụ phí</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phụ phí"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Cước GTGT</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Cước GTGT"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Tổng cước</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tổng cước"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Thu khác</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Cước GTGT"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Tổng thu</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tổng thu"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="formContainer h-100">
                <Row>
                  <h3>Thu của người nhận</h3>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>COD</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="COD"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Thu khác</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Thu khác"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>Tổng thu</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tổng thu"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {/* === Thông tin hàng hóa === */}
        <div className="formContainer">
          <Row>
            <Col>
              <h3>Thông tin hàng hóa</h3>
            </Col>
            <Col>
              <div className="col btnContainer">
                <button
                  type="button"
                  className="btn btn-primary btnCreate"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => {
                    setAddGoods(true);
                    addRow();
                  }}
                >
                  Thêm hàng hóa
                </button>
                {/* <button
                  type="button"
                  className="btn btn-primary btnCreate"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={async () => {
                    console.log(await estimateFee(order));
                  }}
                >
                  Ước tính chi phí
                </button> */}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="table-responsive">
              <table className="createOrderTable w-100 mt-2">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Loại hàng hóa</th>
                    <th scope="col">Đính kèm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Khối lượng thực</th>
                    <th scope="col">Khối lượng chuyển đổi</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {goodsList.map((goods, index) => (
                    <tr key={goods.id}>
                      <td scope="col">{index + 1}</td>
                      <td scope="col">
                        <select
                          value={goods.goodsType}
                          onChange={(e) => {
                            const updatedGoodsList = [...goodsList];
                            updatedGoodsList[index].goodsType = e.target.value;
                            setGoodsList(updatedGoodsList);
                          }}
                        >
                          <option value="goods">Hàng hóa</option>
                          <option value="document">Tài liệu</option>
                        </select>
                      </td>
                      <td scope="col">
                        <input
                          type="number"
                          value={goods.realWeight}
                          onChange={(e) => {
                            const updatedGoodsList = [...goodsList];
                            updatedGoodsList[index].realWeight = e.target.value;
                            setGoodsList(updatedGoodsList);
                          }}
                        />
                      </td>
                      <td scope="col">
                        <input
                          type="number"
                          value={goods.convertedWeight}
                          onChange={(e) => {
                            const updatedGoodsList = [...goodsList];
                            updatedGoodsList[index].convertedWeight =
                              e.target.value;
                            setGoodsList(updatedGoodsList);
                          }}
                        />
                      </td>{" "}
                      <td scope="col">
                        <input
                          type="number"
                          value={goods.convertedWeight}
                          onChange={(e) => {
                            const updatedGoodsList = [...goodsList];
                            updatedGoodsList[index].convertedWeight =
                              e.target.value;
                            setGoodsList(updatedGoodsList);
                          }}
                        />
                      </td>
                      <td scope="col">
                        <input
                          type="number"
                          value={goods.convertedWeight}
                          onChange={(e) => {
                            const updatedGoodsList = [...goodsList];
                            updatedGoodsList[index].convertedWeight =
                              e.target.value;
                            setGoodsList(updatedGoodsList);
                          }}
                        />
                      </td>
                      <td scope="col">
                        <button onClick={() => removeRow(goods.id)} className="btn">
                          <FaTrash className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Row>
        </div>
        <div className="btnContainer">
          <button
            type="button"
            className="btn btn-primary btnCreate"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => {
              console.log(order);
            }}
          >
            Tạo đơn hàng
          </button>
          <button type="button" className="btn btn-secondary">
            Xóa
          </button>
        </div>
      </div>
    </>
  );
}

