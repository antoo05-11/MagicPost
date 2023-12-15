"use client";
import useSWR from "swr";

export function getEmployee(query) {
  try {
    const { data: data } = useSWR(
      `https://magicpost-uet.onrender.com/api/employee/get/?page=${query?.page}`
    );
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
      "https://magicpost-uet.onrender.com/api/order/getall"
    );
    const dat = [];
    for (var i in data) {
      dat.push(data[i]);
    }
    return dat;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function findOrder(orderID) {}

export function getOrderById(id) {}
// export const icon = {};

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
  const { data: dataRes, error: loi } = useSWR(
    `https://magicpost-uet.onrender.com/api/transactionPoint/get/?provinceID=${1}&districtID=${1}&communeID=${1}`,
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
