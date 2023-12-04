// import useSWR from "swr";
import { login } from "./action";
import axios from "axios";
import { headers } from "../../next.config";

async function getData(url) {
  const token = await login();
  const data = await fetch(url, {
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    }),
  });
  const dataRes = await data.json();
  return dataRes;
}

export async function getEmployee(query) {
  try {
    const data = await getData(
      "https://magicpost-uet.onrender.com/api/employee/get"
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

export async function getOrder(query) {
  try {
    const data = await getData(
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

export async function findOrder(orderID) {}

export const icon = {};
