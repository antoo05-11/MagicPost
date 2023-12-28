import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { employeeRole } from "@/api/utils";

export default function Preview(data) {
  console.log(data)
  const roleInfo = employeeRole[data?.data?.role];
  const locationDetails =
    [data?.data?.workingPoint.address.commune.name, data?.data?.workingPoint.address.district.name, data?.data?.workingPoint.address.province.name].filter(Boolean).join(", ");
  console.log(locationDetails)
  return (
    <div className="formContainer">
      <Row className="d-flex justify-content-center align-items-center ">
        <img alt="avatar" src="/avatar.png" className="w-75 rounded-circle" />
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-3 text-center">
        Chức vụ: {roleInfo?.name || "Không xác định"}
      </Row>
      <Row className="d-flex justify-content-center align-items-center text-center">
        Địa điểm công tác: {locationDetails}
      </Row>
    </div>
  );
}
