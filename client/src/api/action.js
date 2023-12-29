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
    const json = await res.json();
    const status = res.status;
    return { data: json, success: status == 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function createOrder(infoOrder) {
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
          detail: "144, duong Xuan Thuy",
          communeID: "121",
          districtID: "9",
          provinceID: "1",
        },
      },
      failChoice: "return",
      receiverCOD: 0,
      receiverOtherFee: 0,
      specialService: "Some special services",
    },
    goodsList: [
      {
        realWeight: "100",
        convertedWeight: "25",
        goodsType: "goods",
        quantity: "23",
        attached: "This is attached file",
      },
    ],
  };
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

    const json = await res.json();
    console.log(json);
    const status = res.status;
    return { data: json, success: status == 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function estimateFee(infoOrder) {
  const session = await getServerSession(authOptions);
  const url = "https://magicpost-uet.onrender.com/api/order/getordercost";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(infoOrder),
    }).then((res) => res.json());
    // const data = await res.json();
    console.log(123);
    console.log(res);
    return res;
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

export async function changePassword({ newPass, verifiedCode }) {
  try {
    const session = await getServerSession(authOptions);
    const url = verifiedCode
      ? `https://magicpost-uet.onrender.com/api/auth/changePassword?verifiedCode=${verifiedCode}`
      : `https://magicpost-uet.onrender.com/api/auth/changePassword`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      // body: JSON.stringify({ newPassword: newPass }),
    }).then((res) => console.log(res.status));
  } catch (error) {
    console.log(error);
  }
}

export async function estimateFeeForCustomer(infoOrder) {
  const url =
    "https://magicpost-uet.onrender.com/api/address/getCostEstimation";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoOrder),
    }).then((res) => res.json());

    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function editEmployee({ newInfor }) {
  try {
    const session = await getServerSession(authOptions);
    const url = verifiedCode
      ? `https://magicpost-uet.onrender.com/api/auth/changePassword?verifiedCode=${verifiedCode}`
      : `https://magicpost-uet.onrender.com/api/auth/changePassword`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      // body: JSON.stringify({ newPassword: newPass }),
    }).then((res) => console.log(res.status));
  } catch (error) {
    console.log(error);
  }
}
