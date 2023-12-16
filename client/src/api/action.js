"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export async function createEmployee(infoEmployee) {
  const session = await getServerSession(authOptions);
  const url = "https://magicpost-uet.onrender.com/api/employee/add";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(infoEmployee),
    });
    console.log(res);
    if (res.ok) {
      console.log("thanh cong");
      return true;
    } else {
      console.log("that bai");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createOrder(infoOrder) {
  const session = await getServerSession(authOptions);

  const url = "https://magicpost-uet.onrender.com/api/order/create";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(infoOrder),
    });
    console.log(res);
    if (res.ok) {
      console.log("thanh cong");
      return true;
    } else {
      console.log("that bai");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
