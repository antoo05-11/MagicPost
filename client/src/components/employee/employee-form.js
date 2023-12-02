export default async function EmployeeForm() {
  return (
    <form id="form-employee">
      <div className="input-group">
        <span class="input-group-text">Ho va Ten</span>
        <input type="text" class="form-control" placeholder="Ho" />
        <input type="text" class="form-control" placeholder="Ten" />
      </div>
      <div className="row">
        <div className="form-group col">
          <label for="exampleFormControlInput1">CCCD/CMND</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div className="form-group col">
          <label for="exampleFormControlInput1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="exampleFormControlInput1">Dia chi</label>

        <div class="form-floating mb-3 col">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label className="address" for="floatingInput">
            Xa
          </label>
        </div>
        <div class="form-floating mb-3 col">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label className="address" for="floatingInput">
            Huyen/Quan
          </label>
        </div>
        <div class="form-floating mb-3 col">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label className="address" for="floatingInput">
            Tinh
          </label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label className="address" for="floatingInput">
            Chi tiet
          </label>
        </div>
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Role</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Dia diem lam viec</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <button>
        <a href="/employees/list_employee/">Cancel</a>
      </button>
      <button type="sumbit">Create</button>
    </form>
  );
}
