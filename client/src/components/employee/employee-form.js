"use client";

import { useState } from "react";
import { createEmployee } from "@/api/action";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { getEmployee } from "@/api/data";

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
  const rout = useRouter();
  return (
    <div>
      <form id="form-employee">
        <div className="input-group">
          <span class="input-group-text">Ho va ten</span>
          <input
            type="text"
            class="form-control"
            placeholder="Ho va ten"
            onChange={(e) => {
              employee.fullName = e.target.value;
            }}
          />
          {/* <input type="text" class="form-control" placeholder="Ten" /> */}
        </div>
        <div className="row">
          <div className="form-group col">
            <label for="exampleFormControlInput1">CCCD/CMND</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => {
                employee.identifier = e.target.value;
              }}
            />
          </div>
          <div className="form-group col">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => {
                employee.email = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="exampleFormControlInput1">Dia chi</label>

          <div class="form-floating mb-3 col">
            <input
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                employee.address.communeID = e.target.value;
              }}
            />
            <label className="address" for="floatingInput">
              Xa
            </label>
          </div>
          <div class="form-floating mb-3 col">
            <input
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                employee.address.districtID = e.target.value;
              }}
            />
            <label className="address" for="floatingInput">
              Huyen/Quan
            </label>
          </div>
          <div class="form-floating mb-3 col">
            <input
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                employee.address.provinceID = e.target.value;
              }}
            />
            <label className="address" for="floatingInput">
              Tinh
            </label>
          </div>
          <div class="form-floating mb-3">
            <input
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                employee.address.detail = e.target.value;
              }}
            />
            <label className="address" for="floatingInput">
              Chi tiet
            </label>
          </div>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Role</label>
          <input
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => {
              employee.role = e.target.value;
            }}
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Dia diem lam viec</label>
          <input
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => {
              employee.transactionPointID = e.target.value;
            }}
          />
        </div>
        <button>
          <a href="/employees/list_employee/">Cancel</a>
        </button>
      </form>
      <button
        onClick={() => {
          console.log(createEmployee(employee));
        }}
      >
        Create
      </button>
    </div>
  );
}
