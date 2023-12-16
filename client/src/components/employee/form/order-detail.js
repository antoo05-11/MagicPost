"use client";

import "@/css/employee/customForm.css";

import { createOrder } from "@/api/action";
import { getOrderById } from "@/api/data";

export default function OrderDetail({ id }) {
  const { data: order } = getOrderById(id);
  console.log(order?.order);
  return (
    <div className="container">
      <form>
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
          <div className="row">
            <label>Nhan vien tao don hang</label>
            <input
              type="text"
              className="form-control"
              //   value={}
              disabled="true"
            />
          </div>
          <div className="row">
            <label>Trang thai</label>
            <input
              type="text"
              className="form-control"
              //   value={}
              disabled="true"
            />
          </div>
          <button className="btn btn-primary"></button>
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

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-2 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Loại hàng hóa</th>
                  <th scope="col">Đính kèm</th>
                  <th scope="col">Giá trị</th>
                  <th scope="col">Sửa, xóa = 1 nút</th>
                </tr>
              </thead>
              <tbody id="goodsTableBody"></tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

// function createGoods() {
//   return ()
// }
