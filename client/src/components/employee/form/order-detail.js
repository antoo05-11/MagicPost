"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { getOrderById } from "@/api/data";
import { orderStatus } from "@/api/utils";
import { updateProcessesOrder } from "@/api/action";
import { mutate } from "swr";

import "@/css/employee/customForm.css";
import "@/css/employee/customTable.css";
// import { useRouter } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderDetail({ id }) {
  const page = useSearchParams().get("page");
  const order = getOrderById(id);
  const router = useRouter();
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDateTime;
  };

  return (
    <Container>
      {/* === Thông tin đơn hàng === */}
      <div className="formContainer">
        <Row>
          <h3>Thông tin đơn hàng</h3>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Mã đơn hàng</Form.Label>
              <Form.Control type="text" value={id} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Phí vận chuyển</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  order?.order?.mainPostage +
                  order?.order?.addedPostage +
                  order?.order?.VATFee +
                  order?.order?.otherFee
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group controlId="creator">
              <Form.Label>Nhân viên tạo đơn</Form.Label>
              <Form.Control
                type="text"
                value={order?.order?.creator?.fullName}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="timeCreate">
              <Form.Label>Thời gian tạo</Form.Label>
              <Form.Control
                type="text"
                value={formatDateTime(order?.order?.createdAt)}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              type="text"
              value={orderStatus[order?.order?.goodsStatus]?.now}
              disabled
            />
          </Form.Group>
        </Row>

        <Row>
          <Col>
            {orderStatus[order?.order?.goodsStatus]?.next && (
              <Button
                variant="warning"
                className="w-100 mt-3"
                onClick={() => {
                  updateProcessesOrder(
                    order?.order?.processes?.pop()?.processID,
                    "forwarded"
                  );
                  mutate(
                    `https://magicpost-uet.onrender.com/api/order/getall/?page=${page}`
                  );
                  router.push("/employees/list_ordered");
                }}
              >
                {orderStatus[order?.order?.goodsStatus]?.next}
              </Button>
            )}
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col xs={12} md={6}>
            <div className="formContainer">
              <Row>
                <h3>Thông tin người gửi</h3>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="senderName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={order?.order?.sender?.fullName}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="senderPhoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={order?.order?.sender?.phoneNumber}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Group controlId="addressDetail">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={order?.order?.sender?.address}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="formContainer">
              <Row>
                <h3>Thông tin người nhận</h3>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="receiverName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={order?.order?.receiver?.fullName}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="receiverPhoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      value={order?.order?.receiver?.phoneNumber}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Dia chi chi tiet */}
              <Row className="mt-2">
                <Col>
                  <Form.Group controlId="addressDetail">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      value={order?.order?.receiver?.address}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* Thong tin hang hoa */}
      <div className="formContainer">
        <Row>
          <Col>
            <h3>Thông tin hàng hóa</h3>
          </Col>
        </Row>

        <Row className="p-2 table-responsive">
          <table striped bordered hover className="createOrderTable">
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại hàng hóa</th>
                <th>Số lượng</th>
                <th>Khối lượng thực</th>
                <th>Khối lượng chuyển đổi</th>
                <th>Đính kèm</th>
              </tr>
            </thead>
            <tbody>
              {order?.goodsList?.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e?.goodsType}</td>
                  <td>{e?.quantity}</td>
                  <td>{e?.realWeight}</td>
                  <td>{e?.convertedWeight}</td>
                  <td>{e?.attached}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </div>
    </Container>
  );
}
