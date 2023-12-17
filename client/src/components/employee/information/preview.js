import React from "react";
import { Row, Col, Table } from "react-bootstrap";

export default function Preview(data) {
  console.log(data);
  return (
    <div className="formContainer">
      <Row className="d-flex justify-content-center align-items-center">
        <img alt="avatar" src="/avatar.png" className="w-75 rounded-circle" />
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-3">
        Chức vụ: {data?.data?.role}
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        Địa điểm công tác: ABC, ABC, ACB
      </Row>

      <Row className="d-flex justify-content-center align-items-center mt-3">
        {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Thao tác</th>
                            <th>Thời gian</th>
                            <th>Đối tượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table> */}
      </Row>
    </div>
  );
}
