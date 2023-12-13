"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { RiContactsBookLine } from "react-icons/ri";

export function getData(url) {
  const fetcher = async (url, token) =>
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    }).then((res) => res.json());
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  // if (token) {
  const { data, error, isLoading } = useSWR([url, token], ([url, token]) =>
    fetcher(url, token)
  );
  return data;
  // }
}

export function getDataWithoutToken(url) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // if (token) {
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
  // }
}

export function getEmployee(query) {
  try {
    const data = getData(
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
  try {
    const data = getData(
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
    const data = getData("https://magicpost-uet.onrender.com/api/order/getall");
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

export function findOrder(orderID) { }

export function getOrderById(id) { }
// export const icon = {};

export function getAllProvince() {
  const dataRes = getDataWithoutToken(
    "https://magicpost-uet.onrender.com/api/administrative/province/getall"
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getProvinceInfo() {
  try {
    const data = getData(
      "https://magicpost-uet.onrender.com/api/administrative/province/getall"
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

export function getDistrictByProvinceID(id) {
  const dataRes = getDataWithoutToken(
    `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getCommuneByDistrictID(id) {
  const dataRes = getDataWithoutToken(
    `https://magicpost-uet.onrender.com/api/administrative/commune/getall/${id}`
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getTransactionPoint(provinceID, districtID, communeID) {
  const dataRes = getDataWithoutToken(
    `https://magicpost-uet.onrender.com/api/transactionPoint/get/?provinceID=${1}&districtID=${1}&communeID=${1}`
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

export function getOrderTracking(orderID) {
  const { data: dataRes, error: errorRes } = getDataWithoutToken(
    `https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`
  )

  if (errorRes) {
    console.error('Error fetching order data:', errorRes);
    return null; 
  }

  const data = [];

  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}