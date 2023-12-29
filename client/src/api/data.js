"use client";
import moment from "moment";
import { useSession } from "next-auth/react";
import useSWR from "swr";
export function getEmployee(page, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/employee/get/?page=${page}`;
  if (query) {
    if (query.name) url = url + `&fullName=${query.name}`;
    if (query.address) url = url + `&address[provinceID]=${query.address}`;
    if (query.emID) url = url + `&employeeID=${query.emID}`;
    if (query.status) url = url + `&status=${query.status}`;
    if (query.phone) url = url + `&phoneNumber=${query.phone}`;
  }
  try {
    const { data: data } = useSWR([url, token]);
    const dataRes = [];
    for (var i in data?.employees) {
      dataRes.push(data?.employees[i]);
    }
    const totalPage = data?.totalPages;
    const itemPerPage = data?.limit;
    return { dataRes, totalPage, itemPerPage };
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getEmployeebyID(id) {
  const token = useSession()?.data?.accessToken;

  try {
    const { data: data } = useSWR([
      `https://magicpost-uet.onrender.com/api/employee/${id}/get`,
      token,
    ]);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getOrder(page, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/order/getall/?page=${page}`;
  if (query) {
    if (query.startAddress)
      url = url + `&startAddress[provinceID]=${query.startAddress}`;
    if (query.endAddress)
      url = url + `&endAddress[provinceID]=${query.endAddress}`;
    if (query.orderID) url = url + `&orderID=${query.orderID}`;
    if (query.status) url = url + `&goodsStatus=${query.status}`;
    if (query.timeCreate) url = url + `&minCreatedAt=${query.timeCreate}`;
  }
  try {
    const { data: data } = useSWR([url, token], {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    });
    return {
      dataRes: data?.orders,
      totalPages: data?.totalPages,
      limit: data?.limit,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getAllProvince() {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      "https://magicpost-uet.onrender.com/api/administrative/province/getall",
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getDistrictByProvinceID(id) {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getCommuneByDistrictID(id) {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      `https://magicpost-uet.onrender.com/api/administrative/commune/getall/${id}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getTransactionPoint(provinceID, districtID, communeID) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?`;
  if (provinceID != 0) url = url + `provinceID=${provinceID}`;
  if (districtID != 0) url = url + `&districtID=${districtID}`;
  if (communeID != 0) url = url + `&communeID=${communeID}`;
  console.log(url);
  const { data: dataRes, error: loi } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getOrderTracking(orderID) {
  const token = useSession()?.data?.accessToken;

  return useSWR(
    [
      `https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

export function getOrderById(id) {
  const token = useSession()?.data?.accessToken;

  try {
    const { data: data } = useSWR([
      `https://magicpost-uet.onrender.com/api/order/get/${id}`,
      token,
    ]);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getAllTransactionPoint(page, limit, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/transactionPoint/getall/?page=${page}`;
  if (query) {
    if (query.name) url += `&name=${query.name}`;
    if (query.headName) url += `&headName=${query.headName}`;
    if (query.provinceID) url += `&address[provinceID]=${query.provinceID}`;
    if (limit) url += `&limit=${limit}`;
    if (query.startOrdersSort)
      url += `&sort[startOrders]=${query.startOrdersSort}`;
    if (query.endOrdersSort) url += `&sort[endOrders]=${query.endOrdersSort}`;
  }
  console.log(url);

  const { data: dataRes } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return dataRes;
}

export function getAllGoodPoint(page, limit, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/goodsPoint/getall/?page=${page}`;
  if (query) {
    if (query.headName) url += `&headName=${query.headName}`;
    if (query.provinceID) url += `&address[provinceID]=${query.provinceID}`;
    if (limit) url += `&limit=${limit}`;
    if (query.arrivingQuantitySort)
      url += `&sort[arrivingOrders]=${query.arrivingQuantitySort}`;
    if (query.onStockQuantitySort)
      url += `&sort[onStockOrders]=${query.onStockQuantitySort}`;
    if (query.forwardedQuantitySort)
      url += `&sort[forwardedOrders]=${query.forwardedQuantitySort}`;
  }
  console.log(url);

  const { data: dataRes } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return dataRes;
}

export function fetchGeneralStatistic(query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/statistic/general/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }

  console.log(url);
  const { data: data } = useSWR([url, token]);
  return data;
}

export function fetchGoodsPointsStatistic(query) {
  const token = useSession()?.data?.accessToken;
  let url = `https://magicpost-uet.onrender.com/api/statistic/goodspoints/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }
  const { data: data } = useSWR([url, token]);
  console.log(data);
  return data;
}

export function fetchTransactionPointsStatistic(query) {
    let url = `https://magicpost-uet.onrender.com/api/statistic/transactionPoints/?`;
    if (query) {
        if (query.minDate) url += `&minDate=${query.minDate}`;
        if (query.maxDate) url += `&maxDate=${query.maxDate}`;
    }
    const { data: data } = useSWR(url);
    console.log(url);
    return data;
}

export function formatDate(dateTime) {
    return moment(dateTime).format('YYYY-MM-DD').replace(/-/g, '');
}