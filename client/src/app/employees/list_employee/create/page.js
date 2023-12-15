import { getEmployee } from "@/api/data";
import EmployeeForm from "@/components/employee/form/employee-form";
// import "@/css/list_employee.css";
export default async function Page() {
  return (
    <main>
      {/* <h2>Tao tai khoan nhan vien moi</h2> */}
      <EmployeeForm />
    </main>
  );
}
