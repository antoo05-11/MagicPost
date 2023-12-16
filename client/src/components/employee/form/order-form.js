"use client";

import "@/css/employee/customForm.css";
import { useEffect, useState } from "react";
import {
  getDistrictByProvinceID,
  getProvinceInfo,
  getCommuneByDistrictID,
  getAllProvince,
} from "@/api/data";
import { createOrder } from "@/api/action";

const order = {
  order: {
    sender: {
      fullname: "Hoang Thuy Linh",
      phoneNumber: "0123556789",
      address: {
        detail: "39S, Street A",
        communeID: "121",
        districtID: "9",
        provinceID: "1",
      },
    },
    receiver: {
      fullname: "Nguyen Huu Minh",
      phoneNumber: "0123456789",
      address: {
        detail: "43, Street A",
        communeID: "121",
        districtID: "9",
        provinceID: "1",
      },
    },
    failChoice: "return",
    mainPostage: "1000",
    addedPostage: "1000",
    VATFee: "1000",
    otherFee: "1000",
    receiverCOD: "1000",
    receiverOtherFee: "1000",
    specialService: "",
  },
  goodsList: [{ realWeight: "100", convertedWeight: "25", goodsType: "goods" }],
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
                }}
              >
                Them hang hoa
              </button>
            </div>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-2 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Loại hàng hóa</th>
                  <th scope="col">Đính kèm</th>
                  <th scope="col">Giá trị</th>
                  <th scope="col">Sửa, xóa = 1 nút</th>
                </tr>
              </thead>
              <tbody id="goodsTableBody">
                {addGoods && (
                  <tr>
                    <td scope="col">1 </td>
                    <td scope="col">
                      <input />
                    </td>
                    <td scope="col">
                      <input />
                    </td>
                    <td scope="col">
                      <input />
                    </td>
                    <td scope="col">
                      <input />
                    </td>
                    <td scope="col">
                      <button>xoa sua tum lum</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <div className="btnContainer">
        <button
          type="button"
          className="btn btn-primary btnCreate"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => {
            createOrder(order);
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
