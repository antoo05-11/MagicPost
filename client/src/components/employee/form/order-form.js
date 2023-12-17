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

  // const feeEstimate = getFeeEstimate();

  return (
    <div className="container">
      <form>
        {/* Thong tin nguoi gui */}
        <div className="formContainer">
          <div className="row">
            <h3>Thông tin người gửi</h3>
          </div>
          {/* Thong tin co ban */}
          <div className="row mt-2">
            <div className="col">
              <label htmlFor="senderName">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="senderName"
                placeholder="Họ và tên"
                onChange={(e) => {
                  order.order.sender.fullname = e.target.value;
                }}
              />
            </div>

            <div className="col">
              <label htmlFor="senderPhoneNumber">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="senderPhoneNumber"
                placeholder="Số điện thoại"
                onChange={(e) => {
                  order.order.sender.phoneNumber = e.target.value;
                }}
              />
            </div>
          </div>
          {/* Dia chi */}
          <div className="row mt-2">
            <label htmlFor="province" className="col-sm-12 col-form-label">
              Địa chỉ
            </label>
            <div className="col-md-4">
              <select
                className="form-select"
                aria-label="Default select example"
                id="province"
                onChange={(e) => {
                  setsenderProvince(e.target.value);
                  order.order.sender.address.provinceID = e.target.value;
                  setsenderDistrict(0);
                  setsenderCommune(0);
                }}
              >
                <option sender>Chọn Tỉnh / TP</option>
                {provinceData.map((province) => (
                  <option
                    key={province.provinceIDnceID}
                    value={province.provinceID}
                  >
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setsenderDistrict(e.target.value);
                  setsenderCommune(0);
                  order.order.sender.address.districtID = e.target.value;
                }}
              >
                {districtDataSender.map((district) => (
                  <option
                    key={district.districtIDictID}
                    value={district.districtID}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setsenderCommune(e.target.value);
                  order.order.sender.address.communeID = e.target.value;
                }}
              >
                {communeDataSender.map((commune) => (
                  <option
                    key={commune.communeIDuneID}
                    value={commune.communeID}
                  >
                    {commune.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Dia chi chi tiet */}
          <div className="row mt-2">
            <div className="col">
              <input
                className="form-control"
                id="addressDetail"
                placeholder="Chi tiết"
              />
            </div>
          </div>
        </div>
        {/* Thong tin nguoi nhan */}
        <div className="formContainer">
          <div className="row">
            <h3>Thông tin người nhận</h3>
          </div>
          {/* Thong tin co ban */}

          <div className="row mt-2">
            <div className="col">
              <label htmlFor="receiverName">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="receiverName"
                placeholder="Họ và tên"
                onChange={(e) => {
                  order.order.receiver.fullname = e.target.value;
                }}
              />
            </div>

            <div className="col">
              <label htmlFor="receiverPhoneNumber">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="receiverPhoneNumber"
                placeholder="Số điện thoại"
                onChange={(e) => {
                  order.order.receiver.phoneNumber = e.target.value;
                }}
              />
            </div>
          </div>
          {/* Dia chi */}

          <div className="row mt-2">
            <div className="row mt-2">
              <label htmlFor="province" className="col-sm-12 col-form-label">
                Địa chỉ
              </label>
              <div className="col-md-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="province"
                  onChange={(e) => {
                    setreceiverProvince(e.target.value);
                    order.order.receiver.address.provinceID = e.target.value;
                    setreceiverDistrict(0);
                    setreceiverCommune(0);
                  }}
                >
                  <option sender>Chọn Tỉnh / TP</option>
                  {provinceData.map((province) => (
                    <option
                      key={province.provinceID}
                      value={province.provinceID}
                    >
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setreceiverDistrict(e.target.value);
                    order.order.receiver.address.districtID = e.target.value;
                    setreceiverCommune(0);
                  }}
                >
                  {districtDataReceiver.map((district) => (
                    <option
                      key={district.districtID}
                      value={district.districtID}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setreceiverCommune(e.target.value);
                    order.order.receiver.address.communeID = e.target.value;
                  }}
                >
                  {communeDataReceiver.map((commune) => (
                    <option key={commune.communeID} value={commune.communeID}>
                      {commune.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Dia chi chi tiet */}

          <div className="row mt-2">
            <div className="col">
              <input
                className="form-control"
                id="addressDetail"
                placeholder="Chi tiết"
                onChange={(e) => {
                  order.order.receiver.address.detail = e.target.value;
                }}
              />
            </div>
          </div>
        </div>

        <div className="formContainer">
          <div className="row">
            <h3>Các thông tin khác</h3>
          </div>
          <div className="row">
            <div className="col">
              <label>Trường hợp vận chuyển thất bại</label>
              <select
                className="form-select"
                onChange={(e) => {
                  order.order.failChoice = e.target.value;
                }}
              >
                <option value={"default"}>Hoàn trả</option>
              </select>
            </div>
            <div className="col">
              <label>Dịch vụ đặc biệt</label>
              <input
                placeholder="Dịch vụ đặc biệt"
                className="form-control"
                onChange={(e) => (order.order.specialService = e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </form>{" "}
      {/* Thong tin hang hoa */}
      <div className="formContainer">
        <div className="row">
          <div className="col">
            <h3>Thông tin hàng hóa</h3>
          </div>

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
            <button
              type="button"
              className="btn btn-primary btnCreate"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={async () => {
                console.log(await estimateFee(order));
              }}
            >
              Ước tính chi phí
            </button>
          </div>
        </div>

        <div className="row p-2 table-responsive">
          <table className="createOrderTable">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Loại hàng hóa</th>
                <th scope="col">Nội dung</th>
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
          Tao don hang
        </button>
        <button type="button" className="btn btn-secondary">
          Xóa
        </button>
      </div>
    </div>
  );
}

// function createGoods() {
//   return ()
// }
