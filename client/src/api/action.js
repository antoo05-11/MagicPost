"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

/**
 * Connects with the backend to create a new employee.
 *
 * @param {Object} infoEmployee - Information about the employee to be created.
 * @returns {Promise<Object>} - A promise that resolves to an object with data and success status.
 */
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

/**
 * Connects with the backend to create a new order.
 *
 * @param {Object} infoOrder - Information about the order to be created.
 * @returns {Promise<Object>} - A promise that resolves to an object with data and success status.
 */
export async function createOrder(infoOrder) {
  console.log(infoOrder);

  const session = await getServerSession(authOptions);
  const url = "https://magicpost-uet.onrender.com/api/order/create";
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
}

/**
 * Connects with the backend to estimate the fee for an order.
 *
 * @param {Object} infoOrder - Information about the order for fee estimation.
 * @returns {Promise<Object>} - A promise that resolves to the estimated fee information.
 */
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
    return res;
    return false;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Connects with the backend to update the status of a particular order process.
 *
 * @param {string} id - The ID of the order process.
 * @param {string} status - The new status to be set.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success of the update.
 */
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

/**
 * Connects with the backend to change the user's password.
 *
 * @param {Object} params - Object containing new password and verification code.
 * @param {string} params.newPass - The new password.
 * @param {string} params.verifiedCode - The verification code.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success of the password change.
 */
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
      body: JSON.stringify({ newPassword: newPass }),
    }).then((res) => {
      console.log(res.status);
    });
    return res.status == 200;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Connects with the backend to estimate the fee for a customer's order.
 *
 * @param {Object} infoOrder - Information about the customer's order for fee estimation.
 * @returns {Promise<Object>} - A promise that resolves to the estimated fee information.
 */
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

/**
 * Connects with the backend to edit employee information.
 *
 * @param {Object} newInfor - The updated information about the employee.
 * @param {string} id - The ID of the employee to be edited.
 * @returns {Promise<Object>} - A promise that resolves to an object with data and success status.
 */
export async function editEmployee(newInfor, id) {
  try {
    const session = await getServerSession(authOptions);
    const url = `https://magicpost-uet.onrender.com/api/employee/${id}/edit`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(newInfor),
    });
    const json = await res.json();
    console.log(json);
    const status = res.status;
    return { data: json, success: status == 200 };
  } catch (error) {
    console.log(error);
  }
}
