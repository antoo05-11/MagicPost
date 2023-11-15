"use client";
import useSWR from "swr";
import { login } from "./action";
import axios from "axios";
import { headers } from "../../next.config";

export async function getEmployee() {
  const tokendata = await login();
  const data = await getData(
    "https://magicpost-uet.onrender.com/api/employee/get",
    tokendata
  );
  // console.log(data);
  // const fetcher = (url, token) =>
  //   fetch(url, {
  //     headers: new Headers({
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: `Bearer ${token}`,
  //     }),
  //   }).then((res) => res.json());
  // const { data, error } = useSWR(
  //   ["https://magicpost-uet.onrender.com/api/employee/get", tokendata],
  //   fetcher
  // );
  // if (error) console.log(error);
  // if (data) console.log(data);
  const dat = [];
  for (var i in data) {
    dat.push(data[i]);
  }
  return dat;
}

async function getData(url, token) {
  const data = await fetch(url, {
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    }),
  });
  const dataRes = await data.json();
  return dataRes;
}
