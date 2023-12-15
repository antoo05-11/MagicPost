"use client";
import {
  getAllProvince,
  getEmployee,
  getOrderById,
  testData,
  getOrderTracking,
} from "@/api/data";
import { useState } from "react";
import useSWR, { SWRConfig } from "swr";
export default function page() {
  // "AEX451934145VN"
  const [hihi, sethihi] = useState("AEX45194145VN");
  const { data, isLoading } = getOrderTracking(hihi);
  console.log(isLoading);
  // const array = [];
  // for (var i in data) {
  //   array.push(data[i]);
  // }
  // if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return <div>hello {data.name}!</div>;
  // return (
  //   <div>
  //     <input onChange={(e) => sethihi(e.target.value)}></input>
  //     <div>{hihi}</div>
  //     {/* {array.map((e) => {
  //       return <div>{e.name}</div>;
  //     })} */}
  //   </div>
  // );
}
