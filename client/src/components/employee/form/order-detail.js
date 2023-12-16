"use client";

import "@/css/employee/customForm.css";

import { createOrder } from "@/api/action";
import { getOrderById } from "@/api/data";

export default function OrderDetail(id) {
  const data = getOrderById(id);
  return (
    <div className="container">
      s
      {/* <div className="btnContainer">
        <button
          type="button"
          className="btn btn-primary btnCreate"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => {
            createOrder(order);
          }}
        >
          Tao don hang
        </button>
        <button type="button" className="btn btn-secondary">
          Xóa
        </button>
      </div> */}
    </div>
  );
}

// function createGoods() {
//   return ()
// }
