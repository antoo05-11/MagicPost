import { Button } from "react-bootstrap";
import Link from "next/link";
import { createUser } from "@/api/definations";
export default async function Form() {
  return (
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">can cuoc cong dan</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Ho va ten</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>{" "}
      <div class="form-group">
        <label for="exampleFormControlInput1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>{" "}
      <div class="form-group">
        <label for="exampleFormControlInput1">Dia chi</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>{" "}
      <div class="form-group">
        <label for="exampleFormControlInput1">Role</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>{" "}
      <div class="form-group">
        <label for="exampleFormControlInput1">Dia diem lam viec</label>
        <input
          type="email"
          class="form-control"
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
