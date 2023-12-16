"use client";
import useSWR from "swr";

export function getEmployee(page, query) {
  let url = `https://magicpost-uet.onrender.com/api/employee/get/?page=${page}`;
  if (query) {
    if (query.name) url = url + `&fullName=${query.name}`;
  }
  try {
    const { data: data } = useSWR(url);
    const dataRes = [];
    for (var i in data?.employees) {
      dataRes.push(data?.employees[i]);
    }
    const totalPage = data?.totalPages;
    const itemPerPage = data?.limit;
    return { dataRes, totalPage, itemPerPage };
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getEmployeebyID(id) {
  if (!id)
    return {
      identifier: "",
      phoneNumber: "",
      fullName: "",
      address: {
        detail: "",
        communeID: "",
        districtID: "",
        provinceID: "",
      },
      transactionPointID: "",
      goodPointID: "",
      email: "",
      role: null,
    };
  try {
    const { data: data } = useSWR(
      `https://magicpost-uet.onrender.com/api/employee/${id}/get`
    );
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function getOrder(query) {
  try {
    const { data: data } = useSWR(
      `https://magicpost-uet.onrender.com/api/order/getall/?page=${query.page}`
    );
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

export function findOrder(orderID) {}

export function getAllProvince() {
  const { data: dataRes } = useSWR(
    "https://magicpost-uet.onrender.com/api/administrative/province/getall",
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
  const { data: dataRes } = useSWR(
    `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`,
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
  const { data: dataRes } = useSWR(
    `https://magicpost-uet.onrender.com/api/administrative/commune/getall/${id}`,
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
  let url = `https://magicpost-uet.onrender.com/api/transactionPoint/customerget/?`;
  if (provinceID != 0) url = url + `provinceID=${provinceID}`;
  if (districtID != 0) url = url + `&districtID=${districtID}`;
  if (communeID != 0) url = url + `&communeID=${communeID}`;
  console.log(url);
  const { data: dataRes, error: loi } = useSWR(url, {
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
  return useSWR(
    `https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

export function getOrderById(id) {
  return useSWR(`https://magicpost-uet.onrender.com/api/order/get/${id}`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
