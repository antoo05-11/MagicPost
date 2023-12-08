import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Breadcrumb from "react-bootstrap/Breadcrumb";
const funtrole = {
  employees: {
    url: "/employees",
    name: "Trang chinh",
  },
  list_employee: {
    url: "/employees/list_employee",
    name: "Quan li nhan vien",
  },
  list_ordered: {
    url: "/employees/list_ordered",
    name: "Quan li don hang",
  },
};
const url = {
  "/employees": "Trang Chinh",
  "/employees/list_employee": "Quan li nhan vien",
  "/employees/list_ordered": "Quan li don hang",
  "/employees/list_ordered/create": "Tao don hang",
  "/employees/list_employee/create": "Tao tai khoan nhan vien",
};
export default function BreadCrumb() {
  const pathname = usePathname().split("/");
  const listItem = [""];
  for (var i = 1; i < pathname.length; i++) {
    listItem.push(listItem[listItem.length - 1] + "/" + pathname[i]);
  }
  console.log(listItem);
  const route = useRouter();
  return (
    <Breadcrumb style={{ paddingLeft: "10px" }}>
      {listItem.map((item) => {
        if (item != "") {
          return (
            <Breadcrumb.Item onClick={() => route.push(item)}>
              {url[item]}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
}
