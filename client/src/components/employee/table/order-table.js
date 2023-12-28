"use client";
import "@/css/employee/table.css";
import { OrderDetail } from "../button";
import { getOrder } from "@/api/data";
import Pagination from "../pagination";
import { getAllProvince } from "@/api/data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { orderStatus } from "@/api/utils";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";

export default function OrderTable({ page, query, showFilter }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const provinceData = getAllProvince();
  const {
    dataRes: inforOrders,
    totalPages: totalPage,
    itemPerPage: itemPerPage,
  } = getOrder(page || 1, query);
  const userWorkingPointID = useSession()?.data?.user?.workingPointID;
  const handleID = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("orderID", term);
    } else {
      params.delete("orderID");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleStartAd = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("startAddress", term);
    } else {
      params.delete("startAddress");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleEndAd = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("endAddress", term);
    } else {
      params.delete("endAddress");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleTimeCreate = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("timeCreate", term);
    } else {
      params.delete("timeCreate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleStatus = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("status", term);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDateTime;
  };
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full ">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive ">
          <table className="orderTable w-100">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Địa chỉ gửi</th>
                <th scope="col">Địa chỉ nhận</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Trạng thái</th>
                <th scope="col"></th>
              </tr>
              {showFilter && (
                <tr className="filter">
                  <th scope="col"></th>
                  <th scope="col">
                    <input
                      placeholder="Lọc theo mã đơn hàng"
                      onChange={(e) => handleID(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <select
                      defaultValue={query?.startAddress}
                      onChange={(e) => handleStartAd(e.target.value)}
                    >
                      <option value={""}>Chọn tỉnh/ thành phố</option>
                      {provinceData.map((province) => (
                        <option
                          key={province.provinceIDnceID}
                          value={province.provinceID}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select
                      defaultValue={query?.endAddress}
                      onChange={(e) => handleEndAd(e.target.value)}
                    >
                      <option value={""}>Chọn tỉnh/ thành phố</option>
                      {provinceData.map((province) => (
                        <option
                          key={province.provinceIDnceID}
                          value={province.provinceID}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <input
                      type="date"
                      onChange={(e) => {
                        const date = String(e.target.value).replaceAll("-", "");
                        handleTimeCreate(date);
                      }}
                    />
                  </th>
                  <th scope="col">
                    <select
                      defaultValue={query?.status}
                      onChange={(e) => handleStatus(e.target.value)}
                    >
                      <option value={""}>Trạng thái</option>
                      {Object.keys(orderStatus).map((statusKey) => (
                        <option key={statusKey} value={statusKey}>
                          {orderStatus[statusKey].now}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col"></th>
                </tr>
              )}
            </thead>
            <tbody className="table-group-divider">
              {inforOrders?.map((data, index) => {
                const statusInfo = orderStatus[data?.goodsStatus] || {};
                const badgeColor = statusInfo.color || "secondary";
                return (
                  <tr key={data?.orderID}>
                    <td>{index + 1}</td>
                    <td>{data?.orderID}</td>
                    <td>{data?.startTransactionProvince}</td>
                    <td>{data?.endTransactionProvince}</td>
                    <td>{formatDateTime(data?.createdAt)}</td>
                    <td>
                      <span
                        className={`badge rounded-pill bg-${badgeColor} p-2`}
                      >
                        {statusInfo.now}
                      </span>
                    </td>
                    <td className="d-flex justify-content-center">
                      <OrderDetail id={data?.orderID} page={page} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
