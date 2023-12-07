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

export async function createEmployee(infoEmployee) {
  const data = {
    identifier: "040508576730",
    phoneNumber: "0123457589",
    fullName: "Do Minh Duy",
    address: {
      detail: "Số 100, đường 19/4",
      communeID: "5355",
      districtID: "302",
      provinceID: "27",
    },
    transactionPointID: null,
    goodPointID: null,
    email: "linhhoang@yahoo.com",
    role: "Tong Giam Doc",
  };
  const token = await login();
  // console.log(JSON.stringify(data));
  const url = "https://magicpost-uet.onrender.com/api/employee/add";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(res.ok);
    if (res.ok) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
}
