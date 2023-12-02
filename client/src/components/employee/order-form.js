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
    <form className="row g-3">
      <h2>Thong tin nguoi gui</h2>
      <div className="col-md-6">
        <label className="form-label">Ho va ten nguoi gui</label>
        <input className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-6">
        <label className="form-label">So dien thoai</label>
        <input className="form-control" id="inputPassword4" />
      </div>
      <div className="col-12">
        <label className="form-label">Dia chi</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Ma khach hang</label>
        <input className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Ma buu chinh</label>
        <input className="form-control" id="inputPassword4" />
      </div>
      <h2>Thong tin nguoi nhan</h2>
      <div className="col-md-6">
        <label className="form-label">Ho va ten nguoi nhan</label>
        <input className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-6">
        <label className="form-label">So dien thoai</label>
        <input className="form-control" id="inputPassword4" />
      </div>
      <div className="col-12">
        <label className="form-label">Dia chi</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
        />
      </div>

      <h2>Thong tin hang hoa</h2>
      <div>
        <h3>Loai hang gui</h3>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
          />
          <label class="form-check-label" for="inlineRadio1">
            Tai lieu
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
          />
          <label class="form-check-label" for="inlineRadio2">
            Hang hoa
          </label>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Noi Dung</th>
              <th scope="col">So luong</th>
              <th scope="col">Tri Gia</th>
              <th scope="col">Noi dung dinh kem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">tong</th>
              <td>
                <input />
              </td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
}
