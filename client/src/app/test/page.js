"use client";
import useSWR, { SWRConfig } from "swr";

import { Form } from "react-bootstrap";
import { useState } from "react";
export const orderDetails = [
  "nguoi gui",
  "nguoi nhan",
  "dia chi nguoi nhan",
  "Ten don hang",
  "Phi van chuyen",
];
import { mutate } from "swr";
export default function AdminPage() {
  // const [id, setid] = useState(1);
  // // const [data, setData] = useState();
  // // let hihi = getDistrictByProvinceID(1);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // // if (token) {

  // const { data, error, isLoading, mutate } = useSWR(
  //   `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`,
  //   fetcher
  // );
  // return (
  //   <div>
  //     <Form.Select
  //       aria-label="Default select example"
  //       onChange={(e) => {
  //         console.log(e.target.value);
  //       }}
  //     >
  //       <option value="0">Open this select menu</option>
  //       <option value="1">One</option>
  //       <option value="2">Two</option>
  //       <option value="3">Three</option>
  //       {/* {id && setData(getDistrictByProvinceID(id))} */}
  //     </Form.Select>
  //     <button
  //       onClick={async () => {
  //         mutate(
  //           `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`
  //         );
  //       }}
  //     ></button>
  //     <button
  //       onClick={() => {
  //         console.log(data);
  //       }}
  //     ></button>
  //   </div>
  // );
  const [id, setPageIndex] = useState(1);

  // The API URL includes the page index, which is a React state.
  const { data } = useSWR(
    `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`,
    fetcher
  );

  // ... handle loading and error states

  return (
    <div>
      <button onClick={() => setPageIndex(id - 1)}>Previous</button>
      <button onClick={() => setPageIndex(id + 1)}>Next</button>
      <button onClick={() => console.log(data)}>Data</button>
    </div>
  );
}
