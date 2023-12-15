"use client";

import React, { useState } from "react";
import MainInformation from "@/components/employee/information/mainInfo";
import Preview from "@/components/employee/information/preview";
import Security from "@/components/employee/information/security";
import "@/css/employee/customForm.css";
import { Button } from "react-bootstrap";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("mainInformation");

  return (
    <div className="formContainer">
      <form id="form-employee ">
        <div className="row">
          <h3>Thông tin ca nhan</h3>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Họ và tên"
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
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="Số điện thoại"
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
            >
              {/* <option selected>Chọn Tỉnh / TP</option>
              {provinceData.map((province) => (
                <option
                  key={province.provinceID}
                  data-key={province.provinceID}
                  value={province.provinceID}
                >
                  {province.name}
                </option>
              ))} */}
            </select>
          </div>

          <div className="col-md-4">
            <select className="form-select" aria-label="Default select example">
              {/* <option selected>Chọn Xã / Phường</option>
              {districtData.map((district) => (
                <option
                  key={district.districtID}
                  data-key={district.districtID}
                  value={district.districtID}
                >
                  {district.name}
                </option>
              ))} */}
            </select>
          </div>

          <div className="col-md-4">
            <select className="form-select" aria-label="Default select example">
              {/* <option selected>Chọn Quận / Huyện</option>
              {communeData.map((commune) => (
                <option
                  key={commune.communeID}
                  data-key={commune.communeID}
                  value={commune.communeID}
                >
                  {commune.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="col m-0">
          <div>
            <Button onClick={() => setCurrentPage("mainInformation")}>
              Thông tin
            </Button>
            <Button onClick={() => setCurrentPage("security")} className="ms-3">
              Bảo mật
            </Button>
          </div>
          <div className="row mt-3">
            {currentPage === "mainInformation" && <MainInformation />}
            {currentPage === "security" && <Security />}
          </div>
        </div>
      </form>
    </div>
  );
}
