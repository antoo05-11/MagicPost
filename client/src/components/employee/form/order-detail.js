"use client";

import "@/css/employee/customForm.css";

import { getOrderById } from "@/api/data";
import OrderProgress from "../table/order-progress";
import { orderStatus } from "@/api/utils";
import { updateProcessesOrder } from "@/api/action";

export default function OrderDetail({ id }) {
  const { data: order } = getOrderById(id);
  console.log(order);
  return (
    <div className="container">
      {/* Thong tin don hang  */}
      <div className="formContainer">
        <div className="row">
          <h3>Thông tin don hang</h3>
        </div>
        <div className="row">
          <label>Ma don hang</label>
          <input
            type="text"
            className="form-control"
            value={id}
            disabled="true"
          />
        </div>

        <div className="row">
          <label>Phi van chuyen</label>
          <input
            type="text"
            className="form-control"
            //   value={}
            disabled="true"
          />
        </div>
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="creator">Nhân viên tạo đơn</label>
            <input
              id="creator"
              type="text"
              className="form-control"
              value={order?.order?.creator?.fullName}
              disabled="true"
            />
          </div>
          <div className="col">
            <label htmlFor="timeCreate">Thời gian tạo</label>
            <input
              type="text"
              id="timeCreate"
              className="form-control"
              value={order?.order?.createdAt}
              disabled="true"
            />
          </div>
        </div>
        <div className="row">
          <label>Trang thai</label>
          <input
            type="text"
            className="form-control"
            value={orderStatus[order?.order?.goodsStatus]?.now}
            disabled="true"
          />
        </div>
        {orderStatus[order?.order?.goodsStatus]?.next && (
          <button
            className="btn btn-primary"
            onClick={() => {
              updateProcessesOrder(
                order?.order?.processes?.pop()?.processID,
                "forwarded"
              );
            }}
          >
            {orderStatus[order?.order?.goodsStatus]?.next}
          </button>
        )}
      </div>
      {/* Thong tin nguoi gui */}
      <div className="formContainer">
        <div className="row">
          <h3>Thông tin người gửi</h3>
        </div>
        {/* Thong tin co ban */}
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="senderName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="senderName"
              placeholder="Họ và tên"
              value={order?.order?.sender?.fullName}
              disabled="true"
            />
          </div>

          <div className="col">
            <label htmlFor="senderPhoneNumber">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              id="senderPhoneNumber"
              placeholder="Số điện thoại"
              defaultValue={order?.order?.sender?.phoneNumber}
              disabled="true"
            />
          </div>
        </div>
        {/* Dia chi chi tiet */}
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="addressDetail">Dia chi</label>
            <input
              className="form-control"
              id="addressDetail"
              placeholder="Chi tiết"
              defaultValue={order?.order?.sender?.address}
              disabled="true"
            />
          </div>
        </div>
      </div>
      {/* Thong tin nguoi nhan */}
      <div className="formContainer">
        <div className="row">
          <h3>Thông tin người nhận</h3>
        </div>
        {/* Thong tin co ban */}

        <div className="row mt-2">
          <div className="col">
            <label htmlFor="receiverName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="receiverName"
              placeholder="Họ và tên"
              value={order?.order?.receiver?.fullName}
              disabled="true"
            />
          </div>

          <div className="col">
            <label htmlFor="receiverPhoneNumber">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              id="receiverPhoneNumber"
              placeholder="Số điện thoại"
              value={order?.order?.receiver?.phoneNumber}
              disabled="true"
            />
          </div>
        </div>
        {/* Dia chi chi tiet */}

        <div className="row mt-2">
          <div className="col">
            <label htmlFor="addressDetail">Dia chi</label>
            <input
              className="form-control"
              id="addressDetail"
              placeholder="Chi tiết"
              value={order?.order?.receiver?.address}
              disabled="true"
            />
          </div>
        </div>
      </div>
      {/* Thong tin hang hoa */}
      <div className="formContainer">
        <div className="row">
          <div className="col">
            <h3>Thông tin hàng hóa</h3>
          </div>
        </div>

        <div className="row p-2 table-responsive">
          <table className="createOrderTable">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Loại hàng hóa</th>
                <th scope="col">Khối lượng thực</th>
                <th scope="col">Khối lượng chuyển đổi</th>
              </tr>
            </thead>
            <tbody>
              {order?.goodsList?.map((e) => {
                return (
                  <tr>
                    <td></td>
                    <td>{e?.goodsType}</td>
                    <td>{e?.realWeight}</td>
                    <td>{e?.convertedWeight}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="formContainer">
        <OrderProgress orderProcesses={order?.order?.processes} />
      </div>
    </div>
  );
}

// function createGoods() {
//   return ()
// }
