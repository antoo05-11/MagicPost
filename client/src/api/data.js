"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export function getData(url) {
  const fetcher = (url, token) =>
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

export function getOrder(query) {
  try {
    const data = getData("https://magicpost-uet.onrender.com/api/order/getall");
    const dat = [];
    for (var i in data) {
      dat.push(data[i]);
    }
    // return dat;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

export function findOrder(orderID) { }

export function getOrderById(id) { }
// export const icon = {};

export function getCityInfo() {
  try {
    const data = getData()
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}