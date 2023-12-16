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

  const listRole = [];
  for (var i in employeeRole) {
    listRole.push(employeeRole[i]);
  }
  employee.workingPointID = useSession()?.data?.user?.workingPointID;
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
              onChange={(e) => {
                employee.fullName = e.target.value;
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="dob">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              onChange={(e) => {
                employee.birthDate = e.target.value;
              }}
            />
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
              onChange={(e) => {
                employee.identifier = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="row ">
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
              onChange={(e) => {
                employee.role = e.target.value;
              }}
            >
              <option selected>Chọn vai trò</option>
              {listRole.map((e) => {
                return <option value={e?.role}>{e?.name}</option>;
              })}
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
          onClick={async () => {
            employee.address.provinceID = selectedProvince;
            employee.address.districtID = selectedDistrict;
            employee.address.communeID = selectedCommune;
            setError(await createEmployee(employee));
          }}
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            console.log(employee);
          }}
        >
          Xóa
        </button>
        <div>{createError[error]}</div>
      </div>
    </div>
  );
}
