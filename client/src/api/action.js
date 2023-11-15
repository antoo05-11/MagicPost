export async function login(employeeID, password) {
  const data = {
    employeeID: "23000000",
    password: "password",
  };

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
    // console.log("res", responseData);
    return responseData.accessToken;
  } else {
    console.error(res.status);
  }
}
