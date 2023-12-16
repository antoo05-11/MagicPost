"use client";

import { useState, useEffect } from "react";
import { createEmployee } from "@/api/action";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { employeeRole } from "@/api/utils";
import {
  getEmployee,
  getDistrictByProvinceID,
  getProvinceInfo,
  getCommuneByDistrictID,
  getEmployeebyID,
  getAllProvince,
} from "@/api/data";
import "@/css/employee/customForm.css";
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
export default function EmployeeForm({ id, changeData }) {
  const provinceData = getAllProvince();

  const [selectedProvince, setSelectedProvince] = useState(
    employee?.address?.province?.provinceID || employee?.address?.provinceID
  );
  const districtData = getDistrictByProvinceID(selectedProvince);
  districtData.unshift({
    name: "Chọn Quận/ Huyện",
    districtID: 0,
  });
  const [selectedDistrict, setSelectedDistrict] = useState(
    employee?.address?.district?.districtID || employee?.address?.districtID
  );
  const communeData = getCommuneByDistrictID(selectedDistrict);
  communeData.unshift({
    name: "Chọn Xã / Phường",
    districtID: 0,
  });
  const [selectedCommune, setSelectedCommune] = useState(
    employee?.address?.commune?.communeID || employee?.address?.communeID
  );

  return (
    <div>
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
              onChange={(e) => {
                employee.fullName = e.target.value;
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="dob">Ngày sinh</label>
            <input type="date" className="form-control" id="dob" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="email">Địa chỉ Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Địa chỉ email"
              defaultValue={employee?.email}
              onChange={(e) => {
                employee.email = e.target.value;
              }}
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
              onChange={(e) => {
                employee.phoneNumber = e.target.value;
              }}
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
              onChange={(e) => {
                employee.identifier = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div>Giới tính</div>
        </div>

        <div className="row mt-2">
          <label htmlFor="province" className="col-sm-12 col-form-label">
            Địa chỉ
          </label>
          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Default select example"
              id="province"
              defaultValue={1}
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
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Default select example"
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
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Default select example"
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
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <input
              className="form-control"
              id="addressDetail"
              placeholder="Chi tiết"
              defaultValue={employee?.address?.detail}
              onChange={(e) => {
                employee.address.detail = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="role">Vai trò</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="role"
            >
              <option selected>Chọn vai trò</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="transactionPoint">Địa điểm làm việc</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Địa điểm làm việc</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>
      <div className="mt-3 btnContainer">
        <button
          onClick={() => {
            createEmployee(employee);
          }}
          type="button"
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button type="button" className="btn btn-secondary">
          Xóa
        </button>
      </div>
    </div>
  );
}
