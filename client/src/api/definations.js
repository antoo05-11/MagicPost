import useSWR from "swr";

export function getgetData() {
  const token = login();
  console.log(token);
  const fetcher = (url) =>
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://magicpost-uet.onrender.com/api/employee/get",
    fetcher
  );
  return data;
  // console.log(data);
}
