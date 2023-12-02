import { login } from "@/api/action";
import { getEmployee } from "@/api/data";

export default async function Page() {
  const token = await login();
  return <div>{token}</div>;
}
