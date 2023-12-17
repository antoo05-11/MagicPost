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
export default function EmployeeInformation({ id }) {
  const employee = getEmployeebyID(id);
  console.log(employee);
  const listRole = [];
  for (var i in employeeRole) {
    if (employeeRole[i].name !== "quan li") {
      listRole.push(employeeRole[i]);
    }
  }
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
          <div className="col-md-6">
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
            setError(createEmployee(employee));
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
