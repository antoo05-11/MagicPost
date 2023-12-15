import { MdOutlineDashboard } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { LuPackage2 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const employeeRole = {
  GOODS_POINT_EMPLOYEE: {
    name: "Nhan vien diem tap ket",
    right: [],
  },
  GOODS_POINT_HEAD: {
    name: "Quan li diem tap ket",
    right: [],
  },
  MANAGER: {
    name: "Quan li",
    right: [],
  },
  TRANSACTION_POINT_EMPLOYEE: {
    name: "Nhan vien diem giao dich",
    right: [],
  },
  TRANSACTION_POINT_HEAD: {
    name: "Quan li diem giao dich",
    right: [],
  },
};

export const employeeWorkIn = {
  homepage: {
    url: "/employees",
    name: "Trang chính",
    icon: <MdOutlineDashboard size={"2em"} />,
  },
  manageEmployees: {
    url: "/employees/list_employee",
    name: "Nhân viên",
    icon: <IoPeopleOutline size={"2em"} />,
  },
  manageOrders: {
    url: "/employees/list_ordered",
    name: "Đơn hàng",
    icon: <LuPackage2 size={"2em"} />,
  },
  manageGoodsPoint: {
    url: "/employees/list_workspace",
    name: "Điểm tập kết",
    icon: <RiRoadMapLine size={"2em"} />,
  },
  managaTransactionPoint: {
    url: "/employees/list_transaction",
    name: "Điểm giao dịch",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
};
