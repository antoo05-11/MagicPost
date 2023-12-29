"use client";
import React, { useState } from "react";
import MainInformation from "@/components/employee/information/mainInfo";
import Preview from "@/components/employee/information/preview";
import Security from "@/components/employee/information/security";
import { Container, Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { getEmployeebyID } from "@/api/data";
import "@/css/employee/customForm.css";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("mainInformation");
  const userID = useSession().data?.user?.employeeID;
  const dataInfo = getEmployeebyID(userID || 1);
  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <Container>
      <Row>
        <Col xs="12" md="4">
          <Preview data={dataInfo} />
        </Col>

        <Col>
          <div>
            <button
              type="button"
              className={`btn btn-outline-primary ${currentPage === "mainInformation" ? "active" : ""
                }`}
              onClick={() => handleButtonClick("mainInformation")}
            >
              Thông tin
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ms-2 ${currentPage === "security" ? "active" : ""
                }`}
              onClick={() => handleButtonClick("security")}
            >
              Bảo mật
            </button>
          </div>
          <div className="row mt-3">
            {currentPage === "mainInformation" && (
              <MainInformation data={dataInfo} />
            )}
            {currentPage === "security" && <Security />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
