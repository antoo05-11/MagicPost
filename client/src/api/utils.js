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
    name: "Nhân viên điểm tập kết",
    role: "GOODS_POINT_EMPLOYEE",
    left: ["manageEmployees", "manageGoodsPoint", "manageTransactionPoint"],
    right: ["homepage", "manageOrders"],
  },
  GOODS_POINT_HEAD: {
    name: "Quản lí điểm tập kết",
    role: "GOODS_POINT_HEAD",
    left: ["manageGoodsPoint", "manageTransactionPoint", "createOrder"],
    right: ["homepage", "manageOrders", "manageEmployees"],
  },
  MANAGER: {
    name: "Quản lí",
    role: "MANAGER",
    right: [
      "homepage",
      "manageGoodsPoint",
      "manageTransactionPoint",
      "manageEmployees",
    ],
    left: ["manageOrders", "createOrder"],
  },
  TRANSACTION_POINT_EMPLOYEE: {
    name: "Nhân viên điểm giao dịch",
    role: "TRANSACTION_POINT_EMPLOYEE",
    left: ["manageGoodsPoint", "manageTransactionPoint", "manageEmployees"],
    right: ["homepage", "manageOrders"],
  },
  TRANSACTION_POINT_HEAD: {
    name: "Quản lí điểm giao dịch",
    role: "TRANSACTION_POINT_HEAD",
    left: ["manageGoodsPoint", "manageTransactionPoint", "createOrder"],
    right: ["homepage", "manageOrders", "manageEmployees"],
  },
};

export const listUrl = {
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
  manageTransactionPoint: {
    url: "/employees/list_transaction",
    name: "Điểm giao dịch",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
  createEmployee: {
    url: "/employees/list_employee/create",
    name: "Tạo tài khoản nhân viên",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
  createOrder: {
    url: "/employees/list_ordered/create",
    name: "Tạo đơn hàng",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
  detailEmployee: {
    url: "/employees/list_employee/[id]/detail",
    name: "Thông tin nhân viên",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
  detailOrder: {
    url: "/employees/list_ordered/[id]/detail",
    name: "Chi tiết đơn hàng",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
};

export const orderStatus = {
  forwarded: { now: "Đã vận chuyển", next: null, color: "success" },
  arriving: {
    now: "Đang vận chuyển đến",
    next: "Xác nhận đã đến",
    color: "warning",
  },
  on_stock: { now: "Trong kho", next: "Xác nhận chuyển tiếp", color: "danger" },
  customer_sent: {
    now: "Người nhận đã nhận được hàng",
    next: "Người nhận đã nhận được hàng",
  },
  customer_returned: { now: "Hàng bị hoàn trả", next: "Hàng bị hoàn trả" },
};

export const goodStatus = {
  delivered: { now: "Đã giao", color: "success" },
  delivering: { now: "Đang vận chuyển", color: "warning" },
};

export const employeeStatus = {
  ACTIVE: { name: "Hoạt động", color: "success" },
  INACTIVE: { name: "Đã nghỉ", color: "secondary" },
};

export const createError = {
  10003: "Nội dung không hợp lệ",
  10004: "Địa chỉ không hợp lệ",
  10005: "Mã nhân viên không hợp lệ",
  10007: "Số CCCD trùng lặp (Số CCCD đã được đăng ký trước đó)",
  10008: "Mã đơn hàng không hợp lệ",
  10009: "Mật khẩu không hợp lệ",
  10012: "Ngày tháng không hợp lệ",
  10024: "Địa chỉ khách hàng chưa được hỗ trợ",
};
