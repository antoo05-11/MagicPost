"use server";

import { login } from "@/api/action";

export default async function Page() {
  const loginwithRole = login.bind(null, "123");
  return (
    <div>
      hihi
      <form action={login}>
        <input name="employeeID" />
        <input name="password" />
        <button type="sumbit">hihi</button>
      </form>
    </div>
  );
}
