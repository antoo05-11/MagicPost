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
  "/employees": "Trang Chính",
  "/employees/list_employee": "Nhân viên",
  "/employees/list_ordered": "Đơn hàng",
  "/employees/list_ordered/create": "Tạo đơn hàng",
  "/employees/list_employee/create": "Tạo nhân viên",
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
    <Breadcrumb>
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
