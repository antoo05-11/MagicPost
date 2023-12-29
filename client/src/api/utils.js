import { MdOutlineDashboard } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { LuPackage2 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

/**
 * Generates a pagination array based on the current page and total number of pages.
 *
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number|string>} - An array representing the pagination items.
 */
export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

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

/**
 * Defines roles for employees along with associated permissions.
 *
 * @type {Object}
 */
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

/**
 * Defines URLs and associated information for various pages in the application.
 *
 * @type {Object}
 */
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

/**
 * Defines order status information.
 *
 * @type {Object}
 */
export const orderStatus = {
  forwarded: {
    name: "forwarded",
    now: "Đã vận chuyển",
    next: [
      {
        code: "customer_sent",
        name: "Xác nhận người nhận đã nhận được hàng",
      },
      {
        code: "customer_returned",
        name: "Xác nhận hàng bị hoàn trả",
      },
    ],
    color: "success",
  },
  arriving: {
    name: "arriving",
    now: "Đang vận chuyển đến",
    next: {
      name: "Xác nhận đã đến",
      code: "on_stock",
    },
    color: "warning",
  },
  on_stock: {
    name: "on_stock",
    now: "Trong kho",
    next: {
      name: "Xác nhận chuyển tiếp",
      code: "forwarded",
    },
    color: "danger",
  },
  customer_sent: {
    name: "customer_sent",
    now: "Người nhận đã nhận được hàng",
    next: null,
    color: "primary"
  },
  customer_returned: {
    name: "customer_returned",
    now: "Hàng bị hoàn trả",
    next: null,
    color: "dark",
  },
};

/**
 * Defines good status information.
 *
 * @type {Object}
 */
export const goodStatus = {
  delivered: { now: "Đã giao", color: "success" },
  delivering: { now: "Đang vận chuyển", color: "warning" },
};

/**
 * Defines employee status information.
 *
 * @type {Object}
 */
export const employeeStatus = {
  ACTIVE: { name: "Hoạt động", color: "success" },
  INACTIVE: { name: "Đã nghỉ", color: "secondary" },
};

/**
 * Defines error messages based on error codes.
 *
 * @type {Object}
 */
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
