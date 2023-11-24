"use server";
export async function login() {
  const data = {
    employeeID: "23000000",
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
    // console.log(responseData);
    return responseData.accessToken;
  } else {
    console.error(res.status);
  }
}
