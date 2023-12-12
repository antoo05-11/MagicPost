"use client";

import { useState } from "react";
import { createEmployee } from "@/api/action";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { getEmployee } from "@/api/data";
import "@/css/employee/customForm.css"

export default function EmployeeForm() {
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
    transactionPointID: "",
    goodPointID: "",
    email: "",
    role: null,
  };
  const [isCreate, setCreate] = useState();
  const router = useRouter();

  // let res = await fetch("https://magicpost-uet.onrender.com/api/administrative/province/getall", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });

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

        <div className="row mt-2">
          <div>
            Giới tính
          </div>
        </div>

        <div className="row mt-2">
          <label htmlFor="province" className="col-sm-12 col-form-label">Địa chỉ</label>
          <div className="col-md-4">
            <select className="form-select" aria-label="Default select example" id="province">
              <option selected>Chọn Tỉnh / TP</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="col-md-4">
            <select className="form-select" aria-label="Default select example">
              <option selected>Chọn Xã / Phường</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="col-md-4">
            <select className="form-select" aria-label="Default select example">
              <option selected>Chọn Quận / Huyện</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
            <select className="form-select" aria-label="Default select example" id="role">
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
            console.log(createEmployee(employee));
          }}
          type="button"
          className="btn btnCreate"
        >
          Tạo nhân viên
        </button>

        <button type="button" className="btn btn-secondary">Xóa</button>
      </div>
    </div>
  );
}
