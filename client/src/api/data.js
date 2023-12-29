"use client";
import moment from "moment";
import { useSession } from "next-auth/react";
import useSWR from "swr";

/**
 * Retrieves a paginated list of employees based on the provided page and query parameters.
 *
 * @param {number} page - The page number to retrieve.
 * @param {Object} query - The query parameters for filtering employee data.
 * @param {string} query.name - The name of the employee for filtering.
 * @param {string} query.address - The province ID of the employee's address for filtering.
 * @param {string} query.emID - The employee ID for filtering.
 * @param {string} query.status - The status of the employee for filtering.
 * @param {string} query.phone - The phone number of the employee for filtering.
 * @returns {Object} - An object containing paginated employee data, total pages, and items per page.
 */
export function getEmployee(page, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/employee/get/?page=${page}`;
  if (query) {
    if (query.name) url = url + `&fullName=${query.name}`;
    if (query.address) url = url + `&address[provinceID]=${query.address}`;
    if (query.emID) url = url + `&employeeID=${query.emID}`;
    if (query.status) url = url + `&status=${query.status}`;
    if (query.phone) url = url + `&phoneNumber=${query.phone}`;
  }
  try {
    const { data: data } = useSWR([url, token]);
    const dataRes = [];
    for (var i in data?.employees) {
      dataRes.push(data?.employees[i]);
    }
    const totalPage = data?.totalPages;
    const itemPerPage = data?.limit;
    return { dataRes, totalPage, itemPerPage };
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

/**
 * Retrieves detailed information about an employee based on the provided ID.
 *
 * @param {string} id - The ID of the employee to retrieve.
 * @returns {Object} - An object containing detailed information about the employee.
 */
export function getEmployeebyID(id) {
  const token = useSession()?.data?.accessToken;

  try {
    const { data: data } = useSWR([
      `https://magicpost-uet.onrender.com/api/employee/${id}/get`,
      token,
    ]);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

/**
 * Retrieves a paginated list of orders based on the provided page and query parameters.
 *
 * @param {number} page - The page number to retrieve.
 * @param {Object} query - The query parameters for filtering order data.
 * @param {string} query.startAddress - The province ID of the start address for filtering.
 * @param {string} query.endAddress - The province ID of the end address for filtering.
 * @param {string} query.orderID - The order ID for filtering.
 * @param {string} query.status - The goods status for filtering.
 * @param {string} query.timeCreate - The minimum creation date for filtering.
 * @returns {Object} - An object containing paginated order data, total pages, and items per page.
 */
export function getOrder(page, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/order/getall/?page=${page}`;
  if (query) {
    if (query.startAddress)
      url = url + `&startAddress[provinceID]=${query.startAddress}`;
    if (query.endAddress)
      url = url + `&endAddress[provinceID]=${query.endAddress}`;
    if (query.orderID) url = url + `&orderID=${query.orderID}`;
    if (query.status) url = url + `&goodsStatus=${query.status}`;
    if (query.timeCreate) url = url + `&minCreatedAt=${query.timeCreate}`;
  }
  try {
    const { data: data } = useSWR([url, token], {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    });
    return {
      dataRes: data?.orders,
      totalPages: data?.totalPages,
      limit: data?.limit,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

/**
 * Retrieves a list of all provinces.
 *
 * @returns {Array} - An array containing information about all provinces.
 */
export function getAllProvince() {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      "https://magicpost-uet.onrender.com/api/administrative/province/getall",
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

/**
 * Retrieves a list of districts based on the provided province ID.
 *
 * @param {string} id - The ID of the province.
 * @returns {Array} - An array containing information about districts in the specified province.
 */
export function getDistrictByProvinceID(id) {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      `https://magicpost-uet.onrender.com/api/administrative/district/getall/${id}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

/**
 * Retrieves a list of communes based on the provided district ID.
 *
 * @param {string} id - The ID of the district.
 * @returns {Array} - An array containing information about communes in the specified district.
 */
export function getCommuneByDistrictID(id) {
  const token = useSession()?.data?.accessToken;

  const { data: dataRes } = useSWR(
    [
      `https://magicpost-uet.onrender.com/api/administrative/commune/getall/${id}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

/**
 * Retrieves a list of transaction points based on the provided location parameters.
 *
 * @param {string} provinceID - The province ID for filtering.
 * @param {string} districtID - The district ID for filtering.
 * @param {string} communeID - The commune ID for filtering.
 * @returns {Array} - An array containing information about transaction points.
 */
export function getTransactionPoint(provinceID, districtID, communeID) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?`;
  if (provinceID != 0) url = url + `provinceID=${provinceID}`;
  if (districtID != 0) url = url + `&districtID=${districtID}`;
  if (communeID != 0) url = url + `&communeID=${communeID}`;
  console.log(url);
  const { data: dataRes, error: loi } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const data = [];
  for (var i in dataRes) {
    data.push(dataRes[i]);
  }
  return data;
}

/**
 * Retrieves tracking information for a specific order based on the provided order ID.
 *
 * @param {string} orderID - The ID of the order to retrieve tracking information.
 * @returns {Object} - An object containing tracking information for the specified order.
 */
export function getOrderTracking(orderID) {
  const token = useSession()?.data?.accessToken;

  return useSWR(
    [
      `https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`,
      token,
    ],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

/**
 * Retrieves detailed information about an order based on the provided ID.
 *
 * @param {string} id - The ID of the order to retrieve.
 * @returns {Object} - An object containing detailed information about the order.
 */
export function getOrderById(id) {
  const token = useSession()?.data?.accessToken;

  try {
    const { data: data } = useSWR([
      `https://magicpost-uet.onrender.com/api/order/get/${id}`,
      token,
    ]);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw Error("Failed to fetch the latest invoices.");
  }
}

/**
 * Retrieves a paginated list of all transaction points based on the provided page, limit, and query parameters.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of items per page.
 * @param {Object} query - The query parameters for filtering transaction point data.
 * @returns {Object} - An object containing paginated transaction point data.
 */
export function getAllTransactionPoint(page, limit, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/transactionPoint/getall/?page=${page}`;
  if (query) {
    if (query.name) url += `&name=${query.name}`;
    if (query.headName) url += `&headName=${query.headName}`;
    if (query.provinceID) url += `&address[provinceID]=${query.provinceID}`;
    if (limit) url += `&limit=${limit}`;
    if (query.startOrdersSort)
      url += `&sort[startOrders]=${query.startOrdersSort}`;
    if (query.endOrdersSort) url += `&sort[endOrders]=${query.endOrdersSort}`;
  }
  console.log(url);

  const { data: dataRes } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return dataRes;
}

/**
 * Retrieves a paginated list of all goods points based on the provided page, limit, and query parameters.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of items per page.
 * @param {Object} query - The query parameters for filtering goods point data.
 * @returns {Object} - An object containing paginated goods point data.
 */
export function getAllGoodPoint(page, limit, query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/goodsPoint/getall/?page=${page}`;
  if (query) {
    if (query.headName) url += `&headName=${query.headName}`;
    if (query.provinceID) url += `&address[provinceID]=${query.provinceID}`;
    if (limit) url += `&limit=${limit}`;
    if (query.arrivingQuantitySort)
      url += `&sort[arrivingOrders]=${query.arrivingQuantitySort}`;
    if (query.onStockQuantitySort)
      url += `&sort[onStockOrders]=${query.onStockQuantitySort}`;
    if (query.forwardedQuantitySort)
      url += `&sort[forwardedOrders]=${query.forwardedQuantitySort}`;
  }
  console.log(url);

  const { data: dataRes } = useSWR([url, token], {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return dataRes;
}

/**
 * Fetches general statistics based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for filtering general statistics.
 * @returns {Object} - An object containing general statistics.
 */
export function fetchGeneralStatistic(query) {
  const token = useSession()?.data?.accessToken;

  let url = `https://magicpost-uet.onrender.com/api/statistic/general/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }

  console.log(url);
  const { data: data } = useSWR([url, token]);
  return data;
}

/**
 * Fetches statistics for goods points based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for filtering goods points statistics.
 * @returns {Object} - An object containing statistics for goods points.
 */
export function fetchGoodsPointsStatistic(query) {
  const token = useSession()?.data?.accessToken;
  let url = `https://magicpost-uet.onrender.com/api/statistic/goodspoints/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }
  const { data: data } = useSWR([url, token]);
  console.log(data);
  return data;
}

/**
 * Fetches statistics for transaction points based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for filtering transaction points statistics.
 * @returns {Object} - An object containing statistics for transaction points.
 */
export function fetchTransactionPointsStatistic(query) {
  const token = useSession()?.data?.accessToken;
  let url = `https://magicpost-uet.onrender.com/api/statistic/transactionPoints/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }
  const { data: data } = useSWR([url, token]);
  console.log(url);
  return data;
}

/**
 * Fetches profit statistics based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for filtering profit statistics.
 * @returns {Object} - An object containing profit statistics.
 */
export function fetchProfitStatistic(query) {
  const token = useSession()?.data?.accessToken;
  let url = `https://magicpost-uet.onrender.com/api/statistic/profit/?`;
  if (query) {
    if (query.minDate) url += `&minDate=${query.minDate}`;
    if (query.maxDate) url += `&maxDate=${query.maxDate}`;
  }
  const { data: data } = useSWR([url, token]);
  console.log(url);
  return data;
}

/**
 * Formats a date in the specified format.
 *
 * @param {string} dateTime - The date and time to format.
 * @returns {string} - The formatted date.
 */
export function formatDate(dateTime) {
  return moment(dateTime).format('YYYY-MM-DD').replace(/-/g, '');
}