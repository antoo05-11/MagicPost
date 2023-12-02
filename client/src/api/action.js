"use server";
export async function login() {
  const data = {
    employeeID: "23000014",
    password: "password",
  };
  // const data = {
  //   employeeID: formData.get("employeeID"),
  //   password: formData.get("password"),
  // };

  const url = "https://magicpost-uet.onrender.com/api/auth/login";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const responseData = await res.json();
    return responseData.accessToken;
  } else {
    console.error(res.status);
  }
}

export async function addEmployee(infoEmployee) {
  const data = {
    identifier: infoEmployee?.identifier,
    phoneNumber: infoEmployee?.phoneNumber,
    fullName: infoEmployee?.fullName,
    address: {
      detail: infoEmployee?.address.detail,
      commune: infoEmployee?.address.commune,
      district: infoEmployee?.address.district,
      province: infoEmployee?.address.province,
    },
    transactionPointID: infoEmployee?.transactionPointID,
    goodPointID: infoEmployee?.goodPointID,
    email: infoEmployee?.email,
    role: infoEmployee?.role,
  };
  const url = "https://magicpost-uet.onrender.com/api/employee/add";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return true;
  } else return false;
}
