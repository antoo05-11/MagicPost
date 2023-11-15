// let token;
// async function signIn(employeeID, password) {
//   const data = {
//     employeeID: "23000000",
//     password: "password",
//   };

//   const url = "https://magicpost-uet.onrender.com/api/auth/login";
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (res.ok) {
//     const responseData = await res.json();
//     // console.log("res", responseData);
//     return responseData;
//   } else {
//     console.error(res.status);
//   }
// }

// async function getData(token) {
//   const data = await fetch(
//     "https://magicpost-uet.onrender.com/api/employee/get",
//     {
//       headers: new Headers({
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Bearer ${token}`,
//       }),
//     }
//   );
//   const dataRes = await data.json();
//   return dataRes;
// }

// export default async function hihi() {
//   // const employeeID = 23000000;
//   // const password = "password";
//   // const bien = await login(employeeID, password);
//   const token1 = await signIn();
//   //   console.log(token1.accessToken);
//   //   const data = await getData(token1.accessToken);
//   console.log(token1);
//   return <div>hihi</div>;
// }
