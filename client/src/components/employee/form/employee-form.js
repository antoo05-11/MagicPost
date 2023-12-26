"use client";

import { useState, useEffect } from "react";
import { createEmployee } from "@/api/action";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { employeeRole, createError } from "@/api/utils";
import {
  getEmployee,
  getDistrictByProvinceID,
  getCommuneByDistrictID,
  getAllProvince,
} from "@/api/data";
import "@/css/employee/customForm.css";
import { useSession } from "next-auth/react";
import PopUp from "../popup";
import { Container, Row, Col, Form } from "react-bootstrap";
const employee = {
  identifier: "",
  phoneNumber: "",
  fullName: "",
  address: {
    detail: "",
    communeID: "",
    districtID: "",
    provinceID: "",
  },
  gender: "",
  birthDate: "",
  workingPointID: null,
  email: "",
  role: null,
};
export default function EmployeeForm() {
  const userRole = useSession()?.data?.user?.role;
  const provinceData = getAllProvince();

  const [selectedProvince, setSelectedProvince] = useState("");
  const districtData = getDistrictByProvinceID(selectedProvince);
  districtData.unshift({
    name: "Chọn Quận/ Huyện",
    districtID: 0,
  });
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const communeData = getCommuneByDistrictID(selectedDistrict);
  communeData.unshift({
    name: "Chọn Xã / Phường",
    districtID: 0,
  });
  const [selectedCommune, setSelectedCommune] = useState("");

  const [error, setError] = useState(false);

  const listRole = [
    employeeRole["TRANSACTION_POINT_HEAD"],
    employeeRole["GOODS_POINT_HEAD"],
  ];
  employee.workingPointID = useSession()?.data?.user?.workingPointID;
  if (userRole === "TRANSACTION_POINT_HEAD")
    employee.role = "TRANSACTION_POINT_EMPLOYEE";
  else if (userRole === "GOODS_POINT_HEAD")
    employee.role = "GOODS_POINT_EMPLOYEE";

  const [popup, setPopup] = useState(false);
  return (
    <div className="formContainer">
      <Form>
        <Row>
          <h3>Thông tin nhân viên</h3>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                id="fullName"
                placeholder="Họ và tên"
                onChange={(e) => {
                  employee.fullName = e.target.value;
                }}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group htmlFor="dob">Ngày sinh</Form.Group>
            <Form.Control
              type="date"
              id="dob"
              onChange={(e) => {
                employee.birthDate = e.target.value;
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group >Địa chỉ Email</Form.Group>
            <Form.Control
              type="email"
              id="email"
              placeholder="Địa chỉ email"
              onChange={(e) => {
                employee.email = e.target.value;
              }}
              required
            />
          </Col>

          <Col>
            <Form.Group>Số điện thoại</Form.Group>
            <Form.Control
              type="tel"
              id="phoneNumber"
              placeholder="Số điện thoại"
              onChange={(e) => {
                employee.phoneNumber = e.target.value;
              }}
            />
          </Col>
        </Row>

        <Row>
          <div className="col">
            <Form.Group>CCCD</Form.Group>
            <Form.Control
              type="tel"
              id="phoneNumber"
              placeholder="CCCD"
              onChange={(e) => {
                employee.identifier = e.target.value;
              }}
            />
          </div>
        </Row>

        <Row>
          <div>Giới tính</div>
          <div className="col">
            <select
              className="form-select"
              defaultValue={"default"}
              onChange={(e) => {
                employee.gender = e.target.value;
              }}
            >
              <option value={"default"}>Gioi tinh</option>
              <option value={"FEMALE"}>Nu</option>
              <option value={"MALE"}>Nam</option>
            </select>
          </div>
        </Row>

        <Row>
          <Form.Group htmlFor="province" className="col-sm-12 col-form-Form.Group">
            Địa chỉ
          </Form.Group>
          <Col>
            <select
              className="form-select"
              id="province"
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                employee.address.provinceID = e.target.value;
                employee.address.districtID = 0;
                employee.address.communeID = 0;
              }}
            >
              <option selected>Chọn Tỉnh / TP</option>
              {provinceData.map((province) => (
                <option key={province.provinceID} value={province.provinceID}>
                  {province.name}
                </option>
              ))}
            </select>
          </Col>

          <Col>
            <select
              className="form-select"

              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                employee.address.districtID = e.target.value;
                employee.address.communeID = 0;
              }}
            >
              {districtData.map((district) => (
                <option key={district.districtID} value={district.districtID}>
                  {district.name}
                </option>
              ))}
            </select>
          </Col>

          <Col>
            <select
              className="form-select"

              onChange={(e) => {
                setSelectedCommune(e.target.value);
                employee.address.communeID = e.target.value;
              }}
            >
              {communeData.map((commune) => (
                <option key={commune.communeID} value={commune.communeID}>
                  {commune.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row>
          <div className="col">
            <Form.Control
              id="addressDetail"
              placeholder="Chi tiết"
              onChange={(e) => {
                employee.address.detail = e.target.value;
              }}
            />
          </div>
        </Row>

        <Row>
          {userRole && userRole === "MANAGER" && (
            <Col>
              <Form.Group htmlFor="role">Vai trò</Form.Group>
              <select
                className="form-select"

                id="role"
                onChange={(e) => {
                  employee.role = e.target.value;
                }}
              >
                <option selected>Chọn vai trò</option>
                {listRole.map((e) => {
                  return <option value={e?.role}>{e?.name}</option>;
                })}
              </select>
            </Col>
          )}
          {userRole && userRole === "MANAGER" && (
            <Col>
              <Form.Group htmlFor="transactionPoint">Địa điểm làm việc</Form.Group>
              <select
                className="form-select"

              >
                <option selected>Địa điểm làm việc</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
          )}
        </Row>
      </Form>
      <div className="mt-3 btnContainer">
        <button
          onClick={async () => {
            employee.address.provinceID = selectedProvince;
            employee.address.districtID = selectedDistrict;
            employee.address.communeID = selectedCommune;
            setError(await createEmployee(employee));
            setPopup(!popup);
          }}
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button className="btn btn-secondary">Xóa</button>
      </div>
      <PopUp isOpen={popup} setIsOpen={setPopup} infor={{ code: error }} />
    </div>
  );
}
