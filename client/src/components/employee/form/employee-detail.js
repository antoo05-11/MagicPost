"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { employeeRole, employeeStatus } from "@/api/utils";
import { getEmployeebyID } from "@/api/data";
import { Container, Row, Col, Form } from "react-bootstrap";
import useSWR from "swr";

import "@/css/employee/customForm.css";
export default function EmployeeInformation({ id }) {
  const employee = getEmployeebyID(id);
  const listRole = [
    employeeRole["TRANSACTION_POINT_HEAD"],
    employeeRole["GOODS_POINT_HEAD"],
    employeeRole["GOODS_POINT_EMPLOYEE"],
    employeeRole["TRANSACTION_POINT_EMPLOYEE"],
  ];
  useEffect(() => {
    setNewInfor({
      status: employee?.status,
      role: employee?.role,
      workingPointID: employee?.workingPointID,
    });
  }, [employee]);
  const [newInfor, setNewInfor] = useState();

  const [workingAddress, setWorkingAddress] = useState({
    provinceID: 0,
    communeID: 0,
    districtID: 0,
  });

  const { data: allProvincePoint, isLoading: isLoading } = useSWR(
    "https://magicpost-uet.onrender.com/api/routingPoint/getallprovinces/"
  );
  const { data: allDistrictsPoint } = useSWR(
    `https://magicpost-uet.onrender.com/api/routingPoint/getalldistricts/${workingAddress.provinceID}`
  );
  const { data: allCommunePoint } = useSWR(
    `https://magicpost-uet.onrender.com/api/routingPoint/getallcommunes/${workingAddress.districtID}`
  );
  const [urlWorkingPoint, setUrl] = useState(
    "https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/"
  );
  const { data: transactionPoint } = useSWR(urlWorkingPoint);
  return (
    <div className="formContainer">
      <form id="form-employee ">
        <div className="row">
          <h3>Thông tin nhân viên</h3>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Họ và tên"
              defaultValue={employee?.fullName}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="dob">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              defaultValue={employee?.birthDate}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="employeeID">Ma nhan vien</label>
            <input
              type="tel"
              className="form-control"
              id="employeeID"
              placeholder="Số điện thoại"
              defaultValue={id}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="Số điện thoại"
              defaultValue={employee?.phoneNumber}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label htmlFor="phoneNumber">CCCD</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.identifier}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">Địa chỉ Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Địa chỉ email"
              defaultValue={employee?.email}
              disabled
            />
          </div>
        </div>

        <div className="row ">
          <div>Giới tính</div>
          <div className="col">
            <select className="form-select" value={employee?.gender} disabled>
              <option value={"female"}>Nu</option>
              <option value={"male"}>Nam</option>
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <label htmlFor="province" className="col-sm-12 col-form-label">
            Địa chỉ
          </label>
          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.province?.name}
              disabled
            />
          </div>

          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.district?.name}
              disabled
            />
          </div>

          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.commune?.name}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <input
              className="form-control"
              id="addressDetail"
              placeholder="Chi tiết"
              defaultValue={employee?.address?.detail}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4">
            <label htmlFor="transactionPoint">Trạng thái</label>
            <select
              className="form-select"
              defaultValue={newInfor?.status}
              onChange={(e) => {
                setNewInfor({
                  status: e.target.value,
                  role: newInfor.role,
                  workingPointID: newInfor.workingPointID,
                });
              }}
            >
              {Object.keys(employeeStatus).map((statusKey) => (
                <option key={statusKey} value={statusKey}>
                  {employeeStatus[statusKey].name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="role">Vai trò</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="role"
              value={employee?.role}
            >
              {listRole.map((e) => {
                return <option value={e?.role}>{e?.name}</option>;
              })}
            </select>
          </div>

          <Row>
            <Form.Group
              htmlFor="province"
              className="col-sm-12 col-form-Form.Group"
            >
              Địa điểm làm việc
            </Form.Group>
            <Col>
              <select
                className="form-select"
                onChange={(e) => {
                  setWorkingAddress({
                    provinceID: e.target.value,
                    communeID: 0,
                    districtID: 0,
                  });
                  setUrl(
                    `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${e.target.value}`
                  );
                }}
              >
                <option selected value={0}>
                  Chọn tỉnh/TP
                </option>
                {Array.isArray(allProvincePoint) &&
                  allProvincePoint?.map((province) => (
                    <option
                      key={province.provinceID}
                      value={province.provinceID}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-select"
                onChange={(e) => {
                  setWorkingAddress({
                    provinceID: workingAddress.provinceID,
                    communeID: 0,
                    districtID: e.target.value,
                  });
                  setUrl(
                    `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${e.target.value}`
                  );
                }}
              >
                <option selected value={0}>
                  Chọn Quận/Huyện
                </option>
                {Array.isArray(allDistrictsPoint) &&
                  allDistrictsPoint?.map((province) => (
                    <option
                      key={province.districtID}
                      value={province.districtID}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-select"
                onChange={(e) => {
                  setWorkingAddress({
                    provinceID: workingAddress.provinceID,
                    communeID: e.target.value,
                    districtID: workingAddress.districtID,
                  });
                  setUrl(
                    `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${workingAddress.districtID}&communeID=${e.target.value}`
                  );
                }}
              >
                <option selected value={0}>
                  Chọn Xã/Phường
                </option>
                {Array.isArray(allCommunePoint) &&
                  allCommunePoint?.map((province) => (
                    <option key={province.communeID} value={province.communeID}>
                      {province.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-select"
                onChange={(e) => {
                  employee.workingPointID = e.target.value;
                }}
              >
                <option selected>Địa điểm làm việc</option>
                {Array.isArray(transactionPoint) &&
                  transactionPoint?.map((province) => (
                    <option
                      key={province.transactionPointID}
                      value={province.transactionPointID}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
        </div>
      </form>
      <div className="mt-3 btnContainer">
        <button
          onClick={() => {
            console.log(newInfor);
          }}
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button type="button" className="btn btn-secondary">
          Xóa
        </button>
        {/* <div>Error {error}</div> */}
      </div>
    </div>
  );
}
