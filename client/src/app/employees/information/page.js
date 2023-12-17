"use client";

import React, { useState } from "react";
import MainInformation from "@/components/employee/information/mainInfo";
import Preview from "@/components/employee/information/preview";
import Security from "@/components/employee/information/security";
import "@/css/employee/customForm.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("mainInformation");
  const dataInfo = useSession()?.data.user;
  
  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };
  console.log();
  return (
    <Container>
      <Row>
        <Col xs="4">
          <Preview data={dataInfo} />
        </Col>

        <Col>
          <div>
            <button
              type="button"
              className={`btn btn-outline-primary ${currentPage === "mainInformation" ? "active" : ""}`}
              onClick={() => handleButtonClick("mainInformation")}
            >
              Thông tin
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ms-2 ${currentPage === "security" ? "active" : ""}`}
              onClick={() => handleButtonClick("security")}
            >
              Bảo mật
            </button>
          </div>
          <div className="row mt-3">
            {currentPage === "mainInformation" && <MainInformation data={dataInfo} />}
            {currentPage === "security" && <Security data={dataInfo} />}
          </div>
        </Col >
      </Row>
    </Container >
  );
}