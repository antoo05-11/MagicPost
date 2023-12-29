"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";

/**
 * Retrieves data from the specified URL using the SWR library with authentication.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} - The data obtained from the specified URL.
 */
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
  const { data, error, isLoading } = useSWR([url, token], ([url, token]) =>
    fetcher(url, token)
  );
  return data;
}

/**
 * Retrieves a list of employees from the backend API.
 *
 * @param {Object} query - The query parameters for filtering employee data.
 * @returns {Array} - An array containing employee data.
 */
export function getEmployee(query) {
  /**
   * Fetches a list of employees from the backend API.
   */
  const data = getData("https://magicpost-uet.onrender.com/api/employee/get");
  const dat = [];
  for (var i in data) {
    dat.push(data[i]);
  }
  return dat;
}

/**
 * Retrieves a list of orders from the backend API.
 *
 * @param {Object} query - The query parameters for filtering order data.
 * @returns {Array} - An array containing order data.
 * @throws {Error} - Throws an error if fetching the data fails.
 */
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
