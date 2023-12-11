import "@/css/employee/customForm.css"

export default function OrderForm() {
  const order = {
    order: {
      sender: {
        fullname: "Hoang Thuy Linh",
        phoneNumber: "0123456789",
        address: {
          detail: "39S, Street A",
          communeID: "121",
          districtID: "9",
          provinceID: "1",
        },
      },
      receiver: {
        fullname: "Nguyen Huu Minh",
        phoneNumber: "0123456789",
        address: {
          detail: "43, Street A",
          communeID: "121",
          districtID: "9",
          provinceID: "1",
        },
      },
      failChoice: "return",
      mainPostage: "1000",
      addedPostage: "1000",
      VATFee: "1000",
      otherFee: "1000",
      receiverCOD: "1000",
      receiverOtherFee: "1000",
      specialService: "",
    },
    goodsList: [
      {
        realWeight: "100",
        convertedWeight: "25",
        goodsType: "goods",
      },
    ],
  };
  return (
    <div className="container">
      <form>
        <div className="formContainer">
          <div className="row">
            <h3>Thông tin người gửi</h3>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label htmlFor="senderName">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="senderName"
                placeholder="Họ và tên" />
            </div>

            <div className="col">
              <label htmlFor="senderPhoneNumber">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="senderPhoneNumber"
                placeholder="Số điện thoại" />
            </div>
          </div>

          <div className="row mt-2">
            <label htmlFor="province" className="col-sm-12 col-form-label">Địa chỉ</label>
            <div className="col-md-4">
              <select className="form-select" aria-label="Default select example" id="province">
                <option selected>Chọn Tỉnh / TP</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col">
              <select className="form-select" aria-label="Default select example">
                <option selected>Chọn Xã / Phường</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col">
              <select className="form-select" aria-label="Default select example">
                <option selected>Chọn Quận / Huyện</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <input
                className="form-control"
                id="addressDetail"
                placeholder="Chi tiết"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label htmlFor="senderCode">Mã khách hàng</label>
              <input
                type="text"
                className="form-control"
                id="senderCode"
                placeholder="Mã khách hàng" />
            </div>

            <div className="col">
              <label htmlFor="senderPostalCode">Mã bưu chính</label>
              <input
                type="text"
                className="form-control"
                id="senderPostalCode"
                placeholder="Mã bưu chính" />
            </div>
          </div>

        </div>

        <div className="formContainer">
          <div className="row border-bottom">
            <h3>Thông tin người nhận</h3>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label htmlFor="receiverName">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="receiverName"
                placeholder="Họ và tên" />
            </div>

            <div className="col">
              <label htmlFor="receiverPhoneNumber">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="receiverPhoneNumber"
                placeholder="Số điện thoại" />
            </div>
          </div>

          <div className="row mt-2">
            <label htmlFor="province" className="col-sm-12 col-form-label">Địa chỉ</label>
            <div className="col-md-4">
              <select className="form-select" aria-label="Default select example" id="province">
                <option selected>Chọn Tỉnh / TP</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col">
              <select className="form-select" aria-label="Default select example">
                <option selected>Chọn Xã / Phường</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col">
              <select className="form-select" aria-label="Default select example">
                <option selected>Chọn Quận / Huyện</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <input
                className="form-control"
                id="addressDetail"
                placeholder="Chi tiết"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label htmlFor="receiverCode">Mã khách hàng</label>
              <input
                type="text"
                className="form-control"
                id="receiverCode"
                placeholder="Mã khách hàng" />
            </div>

            <div className="col">
              <label htmlFor="receiverPostalCode">Mã bưu chính</label>
              <input
                type="text"
                className="form-control"
                id="receiverPostalCode"
                placeholder="Mã bưu chính" />
            </div>
          </div>

        </div>

        <div className="formContainer">
          <div className="row">
            <div className="col">
              <h3>Thông tin hàng hóa</h3>
            </div>

            <div className="col btnContainer">
              <button type="button" class="btn btnCreate">Thêm hàng hóa</button>
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
              <tbody id="goodsTableBody">

              </tbody>
            </table>
          </div>
          <div className="btnContainer">
            <button type="button" className="btn btnCreate">
              Tạo đơn hàng
            </button>

            <button type="button" className="btn btn-secondary">Xóa</button>
          </div>

        </div>

      </form>
    </div>
    // <form className="row g-3">
    //   <h2>Thong tin nguoi gui</h2>
    //   <div className="col-md-6">
    //     <label className="form-label">Ho va ten nguoi gui</label>
    //     <input className="form-control" id="inputEmail4" />
    //   </div>
    //   <div className="col-md-6">
    //     <label className="form-label">So dien thoai</label>
    //     <input className="password" id="inputPassword4" />
    //   </div>
    //   <div className="col-12">
    //     <label className="form-label">Dia chi</label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="inputAddress"
    //       placeholder="1234 Main St"
    //     />
    //   </div>
    //   <div className="col-md-6">
    //     <label className="form-label">Ma khach hang</label>
    //     <input className="form-control" id="inputEmail4" />
    //   </div>
    //   <div className="col-md-6">
    //     <label className="form-label">Ma buu chinh</label>
    //     <input className="form-control" id="inputPassword4" />
    //   </div>
    //   <h2>Thong tin nguoi nhan</h2>
    //   <div className="col-md-6">
    //     <label className="form-label">Ho va ten nguoi nhan</label>
    //     <input className="form-control" id="inputEmail4" />
    //   </div>
    //   <div className="col-md-6">
    //     <label className="form-label">So dien thoai</label>
    //     <input className="form-control" id="inputPassword4" />
    //   </div>
    //   <div className="col-12">
    //     <label className="form-label">Dia chi</label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="inputAddress"
    //       placeholder="1234 Main St"
    //     />
    //   </div>

    //   <h2>Thong tin hang hoa</h2>
    //   <div>
    //     <h3>Loai hang gui</h3>
    //     <div class="form-check form-check-inline">
    //       <input
    //         class="form-check-input"
    //         type="radio"
    //         name="inlineRadioOptions"
    //         id="inlineRadio1"
    //         value="option1"
    //       />
    //       <label class="form-check-label" for="inlineRadio1">
    //         Tai lieu
    //       </label>
    //     </div>
    //     <div class="form-check form-check-inline">
    //       <input
    //         class="form-check-input"
    //         type="radio"
    //         name="inlineRadioOptions"
    //         id="inlineRadio2"
    //         value="option2"
    //       />
    //       <label class="form-check-label" for="inlineRadio2">
    //         Hang hoa
    //       </label>
    //     </div>
    //     <table class="table">
    //       <thead>
    //         <tr>
    //           <th scope="col">Noi Dung</th>
    //           <th scope="col">So luong</th>
    //           <th scope="col">Tri Gia</th>
    //           <th scope="col">Noi dung dinh kem</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <th scope="row">tong</th>
    //           <td>
    //             <input />
    //           </td>
    //           <td>Otto</td>
    //           <td>@mdo</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </form>
  );
}
