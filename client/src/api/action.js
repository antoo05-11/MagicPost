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
    }).then((res) => res.json());
    return res?.code;
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

export async function estimateFee(infoOrder) {
  infoOrder = {
    order: {
      sender: {
        fullname: "Hoang Thuy Linh",
        phoneNumber: "0123456789",
        address: {
          detail: "39S, Street A",
          communeID: "121",
          districtID: "9",
          provinceID: "1",
        },
      },
      receiver: {
        fullname: "Nguyen Huu Minh",
        phoneNumber: "0123456789",
        address: {
          detail: "43, Street A",
          communeID: "121",
          districtID: "9",
          provinceID: "1",
        },
      },
      failChoice: "return",
      specialService: "Some special services",
    },
    goodsList: [
      {
        realWeight: "100",
        convertedWeight: "25",
        goodsType: "goods",
      },
    ],
  };
  const session = await getServerSession(authOptions);
  console.log(session?.accessToken);
  const url = "https://magicpost-uet.onrender.com/api/order/getordercost";
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(infoOrder),
    }).then((res) => res.json());
    // const data = await res.json();
    console.log(res);
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProcessesOrder(id, status) {
  const session = await getServerSession(authOptions);
  console.log("check", id, status);
  const url = `https://magicpost-uet.onrender.com/api/process/${id}/update/?status=${status}`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    console.log(await res.json());
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
