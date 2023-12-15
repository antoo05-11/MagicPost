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
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Preview />
        </div>

        <div className="col m-0">
          <div >

            <Button onClick={() => setCurrentPage("mainInformation")}>
              Thông tin
            </Button>
            <Button
              onClick={() => setCurrentPage("security")}
              className="ms-3"
            >
              Bảo mật
            </Button>
          </div>
          <div className="row mt-3">
            {currentPage === "mainInformation" && <MainInformation />}
            {currentPage === "security" && <Security />}
          </div>
        </div>
      </div>
    </div>
  );
}