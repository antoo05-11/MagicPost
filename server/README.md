# <samp>MagicPost Node.js server</samp>

## <samp>Table of contents</samp>
- [<samp>Server Information</samp>](#server-information)
- [<samp>Install and run</samp>](#install-and-run)
- [<samp>Error Response JSON Sample and Error codes<samp>](#error-response-json-sample-and-error-codes)
- [<samp>Accounts For Testing</samp>](#accounts-for-testing)
- [<samp>API List</samp>](#api-list)
  - [<samp>Auth API</samp>](#auth-api)
    - [<samp>Log in</samp>](#log-in)
    - [<samp>Change password</samp>](#change-password)
  - [<samp>Employee API</samp>](#employee-api)
    - [<samp>Get all employee roles</samp>](#get-all-employee-roles)
    - [<samp>Get all employees</samp>](#get-all-employees)
    - [<samp>Add new employee</samp>](#add-new-employee)
    - [<samp>Get employee by ID</samp>](#get-employee-by-id)
    - [<samp>Edit employee by ID</samp>](#edit-employee-by-id)
  - [<samp>Order API</samp>](#order-api)
    - [<samp>Get all orders (with current working address)</samp>](#get-all-orders-with-current-working-address)
    - [<samp>Get order by ID</samp>](#get-order-by-id)
    - [<samp>Get order by ID</samp>](#get-order-by-id-for-customer)
    - [<samp>Get order cost estimation</samp>](#get-order-cost-estimation)
    - [<samp>Create new order</samp>](#create-new-order)
  - [<samp>Order Process API</samp>](#order-process-api)
    - [<samp>Update process status with process ID</samp>](#update-process-status-with-process-id)
  - [<samp>Routing Point API</samp>](#routing-point-api)
    - [<samp>Get all routing points</samp>](#get-all-routing-points)
    - [<samp>Get all routing point provinces</samp>](#get-all-routing-point-provinces)
    - [<samp>Get all routing point districts</samp>](#get-all-routing-point-districts)
    - [<samp>Get all routing point communes</samp>](#get-all-routing-point-communes)
  - [<samp>Transaction Point API</samp>](#transaction-point-api)
    - [<samp>Get transaction points by address</samp>](#get-transaction-point-by-address)
    - [<samp>Get all transaction points with statictics</samp>](#get-all-transaction-points-with-statistics)
  - [<samp>Goods Point API</samp>](#goods-point-api)
    - [<samp>Get all goods points with statistics</samp>](#get-all-goods-points-with-statistics)
  - [<samp>Address API</samp>](#address-api)
    - [<samp>Get all communes/districts/provinces</samp>](#get-all-communesdistrictsprovinces)
    - [<samp>Get all districts by provinceID</samp>](#get-all-districts-by-provinceid)
    - [<samp>Get all communes by districtID</samp>](#get-all-communes-by-districtid)
- [<samp>Database Design</samp>](#database-design)
  - [<samp>Relation Schema</samp>](#relation-schema)

## <samp>Server Information</samp>
+ <samp> This project is a part of Web Application Development course in UET, VNU. </samp>
+ <samp>This Node.js application is hosted on <a href="https://dashboard.render.com/"><samp>Render.com<samp></a> with URL <a href = "https://magicpost-uet.onrender.com/"><samp>magicpost-uet.onrender.com</samp></a>.</samp>
+ <samp>The database is hosted on <a href="https://console.clever-cloud.com" target="_blank"><samp>Clever Cloud Console</samp></a>.</samp>
+ <samp>Last Updated: 2023/12/16</samp>
  
## <samp>Install and run</samp>

<samp>Contact me to get environment variables, SQL initial commands and build database. </samp>
<samp>Then, clone my project and change directory to server folder. Now, execute the following commands one by one: ```npm install``` - ```npm run dev```.</samp>

## <samp>Error Response JSON Sample and Error codes</samp>
```json
{
    "code": "...",
    "error": "...",
    "message": "..."
}
```
| HTTP status code | Error code | Description                                                                                         |
|------------------|------------|-----------------------------------------------------------------------------------------------------|
| 400              | 10000      | No credentials sent                                                                                 |
| 400              | 10001      | Not authorized                                                                                      |
| 400              | 10002      | Authentication Failed                                                                               |
| 400              | 10003      | Invalid Request Body                                                                                |
| 409              | 10004      | Invalid Address ID (Commune does not match with province and district)                              |
| 404              | 10005      | Invalid Employee ID                                                                                 |
| 409              | 10006      | Invalid Working Address ID (Working address cannot be found or does not match with role registered) |
| 409              | 10007      | Duplicated identifier (Identifier has been registered before)                                       |
| 404              | 10008      | Invalid Order ID                                                                                    |
| 400              | 10009      | Invalid Password                                                                                    |
| 403              | 10010      | Invalid Refresh Token                                                                               |
| 401              | 10011      | No Refresh Token                                                                                    |
| 400              | 10012      | Invalid Date Param Format                                                                           |
| 404              | 10013      | Invalid District ID                                                                                 |
| 404              | 10014      | Invalid Commune ID                                                                                  |
| 404              | 10015      | Invalid Province ID                                                                                 |
| 404              | 10016      | No Record Found                                                                                     |
| 400              | 10017      | New data is repeated                                                                                |
| 400              | 10018     | Invalid Data Order                                                                                  |
| 400             | 10019     | Invalid Process ID                        |
| 401             | 10020    | JWT token expired                        |

## <samp>Accounts for testing</samp>

| Role                       | Employee ID | Password |
|----------------------------|-------------|----------|
| Manager                    | 23000015    | password |
| Transaction point employee | 23000013    | password |
| Goods point employee       | 23000016    | password |
| Transaction point head     | 23000000    | password |
| Goods point head           | 23000021    | password |

    
<samp>To test features of all roles, use this account: <br></samp>
<samp> `21000022` as <i>employee ID</i> and `password` as <i>password</i>.

## <samp>API List</samp>

### <samp>Auth API</samp>

#### <samp>Log in</samp>

+ ##### <em><samp>API Information</samp></em>
  
| Request Requirement | Content                                           |
|---------------------|---------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/auth/login |
| HTTP method         | POST                                              |
| Token Required      | NO                                                |
| Roles Authorized    | NONE                                              |

+ ##### <em><samp>Request JSON Sample</samp></em>

```json
{
    "employeeID": "23000014",
    "password": "password"
}
```

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "user": {
        "employeeID": 23000014,
        "fullName": "Dương Nguyễn Việt Anh",
        "role": "TRANSACTION_POINT_HEAD",
        "status": "ACTIVE"
    },
    "accessToken": "sample-token"
}
```

#### <samp>Change Password</samp>

+ ##### <em><samp>API Information</samp></em>
  
| Request Requirement | Content                                           |
|---------------------|---------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/auth/changePassword |
| Query params            | `verifiedCode` |
| HTTP method         | PUT                                              |
| Token Required      | YES                                                |
| Roles Authorized    | NONE                                              |

+ ##### <em><samp>Explanation</samp></em>

    <samp>To use change password API, you must follow these steps:</samp>
    
    <samp><strong>Step 1:</strong> Use API without `verifiedCode` query param. HTTP response with `200` status code is sended to you, and check mail content into user mail box. Then, use the code for the second step. </samp>
    
    <samp><strong>Step 2:</strong> Use the same API URL but add `verifiedCode` with value got from above step. The body of the request must the same as the first one. You will get a response with `200` HTTP code if everything is fine.</samp>

+ ##### <em><samp>Request JSON Sample</samp></em>

```json
{
    "newPassword": "password"
}
```

### <samp>Employee API</samp>

#### <samp>Get all employee roles</samp>

+ ##### <em> <samp> API Information </samp></em>

| Request Requirement | Content                                                     |
| ------------------- | ----------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/getAllRoles |
| Params              | page - optional                                             |
| HTTP method         | GET                                                         |
| Token Required      | YES                                                         |
| Roles Authorized    | NONE                                                        |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    "GOODS_POINT_EMPLOYEE",
    "GOODS_POINT_HEAD",
    "MANAGER",
    "TRANSACTION_POINT_EMPLOYEE",
    "TRANSACTION_POINT_HEAD"
]
```

#### <samp>Get all employees</samp>
+ ##### <em> <samp> API Information </samp></em>

| Request Requirement | Content                                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/employee/get                                                                                                                                                    |
| Query Params        | `page` (1 as default), `limit` (8 as default), `employeeID`, `identifier`, `fullName`, `role`, `email`, `address: {communeID, districtID, provinceID}` |
| HTTP method         | GET                                                                                                                                                                                                    |
| Token Required      | YES                                                                                                                                                                                                    |
| Roles Authorized    | TRANSACTION_POINT_HEAD, GOODS_POINT_HEAD   

+ ##### <em><samp>Explanation</samp></em>
    <samp> This API is used for getting all employees working in request sender's working address. Note that only heads of transaction points and goods points are authorized to execute this. </samp>

    <samp>All params in query API URL are optional. Attributes `address` and `workingAddress` are both objects, if they are defined, remember to attach it with at least one of three attributes: `communeID`, `districtID`, `provinceID`</samp>.

    <samp>Example: [https://magicpost-uet.onrender.com/api/employee/get/?limit=4&page=1&employeeID=14&fullName=Hòa&role=TRANSACTION_POINT_HEAD&email=hoa&status=ACTIVE&address[provinceID]=14&workingAddress[provinceID]=1](https://magicpost-uet.onrender.com/api/employee/get/?limit=4&page=1&employeeID=14&fullName=Hòa&role=TRANSACTION_POINT_HEAD&email=hoa&status=ACTIVE&address[provinceID]=14&workingAddress[provinceID]=1)</samp>

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "totalPages": 1,
    "limit": "4",
    "employees": [
        {
            "employeeID": 23000014,
            "identifier": "010203090730",
            "phoneNumber": "0123457789",
            "fullName": "Nguyễn Thị Hòa",
            "addressID": 91,
            "role": "TRANSACTION_POINT_HEAD",
            "email": "hoanguyen@gmail.com",
            "workingPointID": 47,
            "status": "ACTIVE",
            "address": {
                "detail": "Số 10, Vũ Tướng",
                "commune": { "name": "Phường Giếng Đáy" },
                "district": { "name": "Thành phố Hạ Long" },
                "province": { "name": "Tỉnh Quảng Ninh" }
            },
            "workingPoint": {
                "addressID": 83,
                "address": {
                    "detail": "Ngh. 282/35 Đ. Kim Giang",
                    "commune": { "name": "Phường Kim Giang" },
                    "district": { "name": "Quận Thanh Xuân" },
                    "province": { "name": "Thành phố Hà Nội" }
                }
            }
        }
    ]
}
```

#### <samp>Add new employee</samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/add |
| HTTP method         | GET                                                 |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_HEADER                            |

+ ##### <em><samp>Request JSON Sample</samp></em>
```json
{
    "identifier": "123426783902",
    "phoneNumber": "0192344547",
    "fullName": "Nguyen Ngoc Linh",
    "address": {
        "detail": "Số 100, đường 19/4",
        "communeID": "5375",
        "districtID": "302",
        "provinceID": "27" 
    },
    "gender": "MALE",
    "birthDate": "2003-11-24",
    "workingPointID": null,
    "email": "linhhoang@yahoo.com",
    "role": null
}

```
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "employeeID": 23000047,
    "identifier": "123426783902",
    "phoneNumber": "0192344547",
    "fullName": "Nguyen Ngoc Linh",
    "addressID": 184,
    "email": "linhhoang@yahoo.com",
    "workingPointID": null,
    "password": "tqSQiRVf",
    "role": null,
    "gender": "MALE",
    "birthDate": "2003-11-24T00:00:00.000Z",
    "updatedAt": "2023-12-15T20:55:44.503Z",
    "createdAt": "2023-12-15T20:55:44.503Z",
    "address": {
        "province": {
            "name": "Tỉnh Nghệ An"
        },
        "district": {
            "name": "Huyện Tân Kỳ"
        },
        "commune": {
            "name": "Xã Tân Hương"
        },
        "detail": "Số 100, đường 19/4"
    }
}
```

### <samp>Get employee by ID<samp>

+ ##### <em> <samp> API Information </samp></em>

| Request Requirement | Content                                                 |
| ------------------- | ------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/:id/get |
| HTTP method         | GET                                                     |
| Token Required      | YES                                                     |
| Roles Authorized    | TRANSACTION_POINT_HEAD                                  |

+ ##### <em><samp>Response JSON Sample</samp></em>

```json
{
    "employeeID": 23000013,
    "identifier": "010203090030",
    "phoneNumber": "0123457789",
    "fullName": "Hoàng Văn Anh",
    "role": "TRANSACTION_POINT_EMPLOYEE",
    "email": "anhhoang@gmail.com",
    "workingPointID": 46,
    "status": "ACTIVE",
    "birthDate": "2023-12-15",
    "gender": "male",
    "createdAt": "2023-12-09T17:05:12.000Z",
    "updatedAt": "2023-12-09T17:05:12.000Z",
    "address": {
        "addressID": 89,
        "detail": "Ngh. 285/35 Đ. Kim Giang",
        "commune": { "communeID": 121, "name": "Phường Kim Giang" },
        "district": { "districtID": 9, "name": "Quận Thanh Xuân" },
        "province": { "provinceID": 1, "name": "Thành phố Hà Nội" }
    },
    "workingPoint": {
        "routingPointID": 46,
        "address": {
            "addressID": 82,
            "commune": { "communeID": 64, "name": "Phường Láng Thượng" },
            "district": { "districtID": 6, "name": "Quận Đống Đa" },
            "province": { "provinceID": 1, "name": "Thành phố Hà Nội" }
        }
    }
}
```

#### <samp>Edit employee by ID</samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                                  |
|---------------------|----------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/employee/:id/edit |
| HTTP method         | PUT                                                      |
| Token Required      | YES                                                      |
| Roles Authorized    | GOODS_POINT_HEADER, TRANSACTION_POINT_HEADER             |
| Note                | All attributes in Request JSON are optional              |

+ ##### <em><samp>Request JSON Sample</samp></em>

```json
{
    "identifier": "923456789012",
    "phoneNumber": "0123457789",
    "fullName": "Hoàng Văn Anh",
    "role": "TRANSACTION_POINT_EMPLOYEE",
    "email": "anhhoang@gmail.com",
    "workingPointID": 46,
    "status": "ACTIVE",
    "address": { "detail": "hello", "communeID": 120, "districtID": 9, "provinceID": 1 }
}
```

+ ##### <em><samp>Response JSON Sample</samp></em>

```json
{
    "employeeID": 23000013,
    "identifier": "923456789012",
    "phoneNumber": "0123457789",
    "fullName": "Hoàng Văn Anh",
    "role": "TRANSACTION_POINT_EMPLOYEE",
    "email": "anhhoang@gmail.com",
    "workingPointID": 46,
    "status": "ACTIVE",
    "createdAt": "2023-12-09T17:05:12.000Z",
    "updatedAt": "2023-12-09T18:24:01.000Z",
    "address": {
        "addressID": 89,
        "detail": "Street A",
        "commune": { "communeID": 120, "name": "Phường Khương Đình" },
        "district": { "districtID": 9, "name": "Quận Thanh Xuân" },
        "province": { "provinceID": 1, "name": "Thành phố Hà Nội" }
    },
    "workingPoint": {
        "routingPointID": 46,
        "address": {
            "addressID": 82,
            "commune": { "communeID": 64, "name": "Phường Láng Thượng" },
            "district": { "districtID": 6, "name": "Quận Đống Đa" },
            "province": { "provinceID": 1, "name": "Thành phố Hà Nội" }
        }
    }
}
```

### <samp>Order API<samp>

#### <samp>Get all orders (with current working address)</samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/getall                                            |
| HTTP method         | GET                                                                                            |
| Token Required      | YES                                                                                            |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER, GOODS_POINT_EMPLOYEE, GOODS_POINT_HEADER |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "totalPages": 1,
    "limit": 8,
    "orders": [
        {
            "orderID": "AEX451934145VN",
            "startTransactionProvince": "Thành phố Hà Nội",
            "endTransactionProvince": "Thành phố Hà Nội",
            "createdAt": "2023-11-30T13:00:31.000Z",
            "goodsStatus": "arriving"
        }
    ]
}
```

### <samp>Get order by ID</samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                              |
| ------------------- | ---------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/get/:id |
| HTTP method         | GET                                                  |
| Token Required      | YES                                                  |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "order": {
        "orderID": "AEX451934145VN",
        "sender": {
            "fullName": "Trần Vương Khánh",
            "phoneNumber": "0123456789",
            "address": "Số 1, đường Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội",
            "customerID": 1
        },
        "receiver": {
            "fullName": "Vương Khánh Linh",
            "phoneNumber": "0123456789",
            "address": "435 Trần Khánh Dư, Phường Thanh Sơn, Thành phố Uông Bí, Tỉnh Quảng Ninh",
            "customerID": 2
        },
        "creator": {
            "employeeID": 23000014,
            "fullName": "Nguyễn Thị Hòa"
        },
        "failChoice": "return",
        "mainPostage": 1000,
        "addedPostage": 1000,
        "VATFee": 1000,
        "otherFee": 1000,
        "receiverCOD": 1000,
        "receiverOtherFee": 1000,
        "specialService": "",
        "status": "delivered",
        "goodsStatus": "forwarded",
        "sentTime": "2023-12-11T23:34:37.000Z",
        "receivedTime": null,
        "startTransactionPoint": {
            "name": "Thanh Xuân",
            "address": "Ngh. 282/35 Đ. Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Thành phố Hà Nội",
            "zipCode": "53453"
        },
        "endTransactionPoint": {
            "name": "Đống Đa",
            "address": "Số 2, đường Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội",
            "zipCode": "13245"
        },
        "createdAt": "2023-11-30T13:00:31.000Z",
        "processes": [
            {
                "processID": 1,
                "routingPointAddress": "Ngh. 282/35 Đ. Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T18:00:34.000Z"
            },
            {
                "processID": 2,
                "routingPointAddress": "Số 157, đường Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T18:04:02.000Z"
            },
            {
                "processID": 3,
                "routingPointAddress": "Số 324, đường Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T19:04:09.000Z"
            },
            {
                "processID": 4,
                "routingPointAddress": "hello, Phường Khương Đình, Quận Thanh Xuân, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T20:04:13.000Z"
            },
            {
                "processID": 5,
                "routingPointAddress": "Số 2, đường Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội",
                "status": "arriving",
                "arrivedTime": "2023-12-11T20:04:13.000Z"
            }
        ]
    },
    "goodsList": [
        {
            "goodsID": 10,
            "orderID": "AEX451934145VN",
            "goodsType": "document",
            "realWeight": 634,
            "convertedWeight": 643
        }
    ]
}
```

#### <samp>Get Order by ID (for Customer)</samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                              |
| ------------------- | ---------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/customerget/:id |
| HTTP method         | GET                                                  |
| Token Required      | NO                                                  |
| Roles Authorized    | NONE                                                   |

+ ##### <em><samp>Response JSON Sample</samp></em>

```json
{
    "order": {
        "orderID": "AEX451934145VN",
        "sender": {
            "fullName": "Trần Vương Khánh",
            "address": "Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội"
        },
        "receiver": {
            "fullName": "Vương Khánh Linh",
            "address": "Phường Thanh Sơn, Thành phố Uông Bí, Tỉnh Quảng Ninh"
        },
        "creator": {
            "employeeID": 23000014,
            "fullName": "Nguyễn Thị Hòa"
        },
        "status": "delivered",
        "sentTime": "2023-12-11T23:34:37.000Z",
        "receivedTime": null,
        "weight": 634,
        "estimatedDeliveryDate": "2023-12-11T23:34:37.000Z",
        "createdAt": "2023-11-30T13:00:31.000Z",
        "processes": [
            {
                "processID": 1,
                "routingPointAddress": "Ngh. 282/35 Đ. Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T18:00:34.000Z"
            },
            {
                "processID": 2,
                "routingPointAddress": "Số 157, đường Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T18:04:02.000Z"
            },
            {
                "processID": 3,
                "routingPointAddress": "Số 324, đường Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T19:04:09.000Z"
            },
            {
                "processID": 4,
                "routingPointAddress": "hello, Phường Khương Đình, Quận Thanh Xuân, Thành phố Hà Nội",
                "status": "forwarded",
                "arrivedTime": "2023-12-11T20:04:13.000Z"
            },
            {
                "processID": 5,
                "routingPointAddress": "Số 2, đường Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội",
                "status": "arriving",
                "arrivedTime": "2023-12-11T20:04:13.000Z"
            }
        ]
    }
}
```

#### <samp>Get order cost estimation<samp>
+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/getordercost |
| HTTP method         | GET                                                |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE                          |

+ ##### <em><samp>Request JSON Sample</samp></em>
<samp>The request body for this API is the same as request body for [Create new order API](#create-new-order), except for not including the attributes appearring in following response.</samp>
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
{
    "mainPostage": 10000,
    "addedPostage": 475000,
    "VATFee": 38800,
    "otherFee": 10000,
    "receiverCOD": 0,
    "receiverOtherFee": 0
}
```

#### <samp>Create new order<samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/create |
| HTTP method         | POST                                                |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE                          |


+ ##### <em><samp>Request JSON Sample</samp></em>

```json
{
    "order": {
        "sender": {
            "fullname": "Hoang Thuy Linh",
            "phoneNumber": "0123456789",
            "address": {
                "detail": "39S, Street A",
                "communeID": "121",
                "districtID": "9",
                "provinceID": "1"
            }
        },
        "receiver": {
            "fullname": "Nguyen Huu Minh",
            "phoneNumber": "0123456789",
            "address": {
                "detail": "43, Street A",
                "communeID": "121",
                "districtID": "9",
                "provinceID": "1"
            }
        },
        "failChoice": "return",
        "specialService": "Some special services"
    },
    "goodsList": [
        {
            "realWeight": "100",
            "convertedWeight": "25",
            "goodsType": "goods"
        }
    ]
}
```

+ ##### <em><samp>Response JSON Sample</samp></em>

```json
{
    "order": {
        "orderID": "TNJ945334140VN",
        "sender": {
            "fullName": "Hoang Thuy Linh",
            "phoneNumber": "0123456789",
            "address": "39S, Street A, Phường Kim Giang, Quận Thanh Xuân, Thành phố Hà Nội",
            "customerID": 63
        },
        "receiver": {
            "fullName": "Nguyen Huu Minh",
            "phoneNumber": "0123456789",
            "address": "43, Street A, Phường Kim Giang, Quận Thanh Xuân, Thành phố Hà Nội",
            "customerID": 64
        },
        "creator": {
            "employeeID": 23000013,
            "fullName": "Hoàng Văn Anh"
        },
        "failChoice": "return",
        "mainPostage": 1000,
        "addedPostage": 1000,
        "VATFee": 1000,
        "otherFee": 1000,
        "receiverCOD": 1000,
        "receiverOtherFee": 1000,
        "specialService": "",
        "status": "delivering",
        "goodsStatus": "on_stock",
        "sentTime": null,
        "receivedTime": null,
        "startTransactionPoint": {
            "name": "Điểm giao dịch QN1",
            "address": "Số nhà 44, Tổ 2 khu 3B, Phường Giếng Đáy, Thành phố Hạ Long, Tỉnh Quảng Ninh",
            "zipCode": "13245"
        },
        "endTransactionPoint": {
            "name": "Điểm giao dịch QN1",
            "address": "Số nhà 44, Tổ 2 khu 3B, Phường Giếng Đáy, Thành phố Hạ Long, Tỉnh Quảng Ninh",
            "zipCode": "13245"
        },
        "createdAt": "2023-12-17T12:02:07.000Z",
        "processes": [
            {
                "processID": 24,
                "routingPointAddress": "Số nhà 44, Tổ 2 khu 3B, Phường Giếng Đáy, Thành phố Hạ Long, Tỉnh Quảng Ninh",
                "status": "on_stock",
                "arrivedTime": "2023-12-17T12:02:08.000Z"
            }
        ]
    },
    "goodsList": [
        {
            "goodsID": 35,
            "orderID": "TNJ945334140VN",
            "goodsType": "goods",
            "realWeight": 100,
            "convertedWeight": 25
        }
    ]
}
```
### <samp>Order Process API<samp>
#### <samp>Update process status with process ID</samp>

+ ##### <em> <samp> API Information </samp></em>

| Request Requirement | Content                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/process/:id/update                         |
| Query params        | `status` (<i>required</i>, must be one of [<i>on_stock</i>, <i>forwarded</i>])    |
| HTTP method         | PUT                                                                               |
| Token Required      | YES                                                                               |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, GOODS_POINT_EMPLOYEE                                  |

+ ##### <em> <samp> Explanation </samp></em>
    <samp>This API is used for updating the process status of order with process ID. Note that, an order can have some processes. Any process of all orders has an unique process ID. So process ID can be used for defining the order. Process status can be: <i>on_stock</i>, <i>forwarded</i> or <i>arriving</i>. <i>arriving</i> cannot be set by user. When the previous routing point confirm the order is forwarded, and then new process with status <i>arriving</i> and next routing point is created automatically.</samp>
    
    <samp>The API URL must contain the `status` query param, and its value must be one of [<i>on_stock</i>, <i>forwarded</i>]. If your request URL does not satisfy the above conditions, you should get HTTP response with error code `10003`.</samp>

    <samp>Besides that, you can get HTTP response with error code `10018` if new status of process must match old status. If old status is <i>forwarded</i>, new status cannot be <i>on_stock</i>. And if old status is <i>arriving</i>, new status cannot be <i>forwarded</i>. If new status is similar to old status, you can get error with code `10017`.</samp>

    <samp>When the request is valid properly, you can get all processes of current order with new status as response.</samp>

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "processID": 6,
        "routingPointAddress": "Tổ 3 Khu 6, Phường Đại Yên, Thành phố Hạ Long, Tỉnh Quảng Ninh",
        "status": "forwarded",
        "arrivedTime": "2023-12-16T08:28:14.000Z"
    },
    {
        "processID": 4,
        "routingPointAddress": "12, đường Lê Hồng Phong, Phường Hưng Bình, Thành phố Vinh, Tỉnh Nghệ An",
        "status": "forwarded",
        "arrivedTime": "2023-12-11T20:04:13.000Z"
    },
    {
        "processID": 3,
        "routingPointAddress": "Tổ 3 Khu 6, Phường Đại Yên, Thành phố Hạ Long, Tỉnh Quảng Ninh",
        "status": "forwarded",
        "arrivedTime": "2023-12-11T19:04:09.000Z"
    },
    {
        "processID": 2,
        "routingPointAddress": "105, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội",
        "status": "forwarded",
        "arrivedTime": "2023-12-11T18:04:02.000Z"
    },
    {
        "processID": 1,
        "routingPointAddress": "34, đường Nguyễn Sỹ Sách, Xã Hưng Lộc, Thành phố Vinh, Tỉnh Nghệ An",
        "status": "forwarded",
        "arrivedTime": "2023-12-11T18:00:34.000Z"
    }
]
```

### <samp>Routing Point API<samp>
#### <samp>Get all routing points<samp>
+ ##### <em> <samp> API Information </samp></em>
| Request Requirement | Content                                                            |
|---------------------|--------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/routingPoint/getall/        |
| Query Params        | provinceID (optional), communeID (optional), districtID (optional) |
| HTTP method         | GET                                                                |
| Token Required      | YES                                                                |
| Roles Authorized    | MANAGER                                                            |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "name": "Điểm giao dịch Trung Tâm Thủ Đô",
        "routingPointID": 45,
        "address": {
            "communeID": 70,
            "districtID": 6,
            "provinceID": 1
        }
    },
    {
        "name": "Điểm giao dịch QN1",
        "routingPointID": 46,
        "address": {
            "communeID": 2401,
            "districtID": 142,
            "provinceID": 14
        }
    }
]
```


#### <samp>Get all routing point provinces<samp>
+ ##### <em> <samp> API Information </samp></em>
| Request Requirement | Content                                                            |
|---------------------|--------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/routingPoint/getallprovinces/        |
| HTTP method         | GET                                                                |
| Token Required      | YES                                                                |
| Roles Authorized    | MANAGER                                                            |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "name": "Thành phố Hà Nội",
        "provinceID": 1
    },
    {
        "name": "Tỉnh Quảng Ninh",
        "provinceID": 14
    }
]
```

#### <samp>Get all routing point districts<samp>
+ ##### <em> <samp> API Information </samp></em>
| Request Requirement | Content                                                            |
|---------------------|--------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/routingPoint/getalldistricts/:provinceID        |
| HTTP method         | GET                                                                |
| Token Required      | YES                                                                |
| Roles Authorized    | MANAGER                                                            |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "name": "Quận Đống Đa",
        "districtID": 6,
        "provinceID": 1
    },
    {
        "name": "Quận Thanh Xuân",
        "districtID": 9,
        "provinceID": 1
    }
]
```

#### <samp>Get all routing point communes<samp>
+ ##### <em> <samp> API Information </samp></em>
| Request Requirement | Content                                                            |
|---------------------|--------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/routingPoint/getallcommunes/:districtID        |
| HTTP method         | GET                                                                |
| Token Required      | YES                                                                |
| Roles Authorized    | MANAGER                                                            |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "communeID": 68,
        "name": "Phường Láng Hạ"
    }
]
```

### <samp>Transaction Point API<samp>
#### <samp>Get transaction point by address<samp>

+ ##### <em> <samp> API Information </samp></em>

| Request Requirement | Content                                                                                            |
|---------------------|----------------------------------------------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/ |
| Query Params        | provinceID (<i>optional</i>), communeID (<i>optional</i>), districtID (<i>optional</i>)            |
| HTTP method         | GET                                                                                                |
| Token Required      | NO                                                                                                 |
| Roles Authorized    | NONE                                                                                               |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "transactionPointID": 45,
        "zipCode": "10554",
        "goodsPointID": 1,
        "name": "Điểm giao dịch Trung Tâm Thủ Đô",
        "address": "311 P. Tôn Đức Thắng, Phường Thổ Quan, Quận Đống Đa, Thành phố Hà Nội"
    }
]
```

#### <samp>Get all transaction points with statistics</samp>

+ ##### <em><samp>API Information</samp></em>
| Request Requirement | Content                                                        |
|---------------------|----------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/transactionPoint/getall |
| HTTP method         | GET                                                            |
| Token Required      | YES                                                            |
| Roles Authorized    | MANAGER                                                        |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
   {
        "transactionPointID": 45,
        "name": "Điểm giao dịch Trung Tâm Thủ Đô",
        "address": {
            "detail": "311 P. Tôn Đức Thắng",
            "commune": { "name": "Phường Thổ Quan" },
            "district": { "name": "Quận Đống Đa" },
            "province": { "name": "Thành phố Hà Nội" }
        },
        "startOrders": 2,
        "endOrders": 0,
        "head": {
            "fullName": "Ngũ Thành An",
            "employeeID": 23000000
        }
    }
]
```

### <samp>Goods Point API<samp>
#### <samp>Get all goods points with statistics<samp>

+ ##### <em><samp>API Information</samp></em>
| Request Requirement | Content                                                        |
|---------------------|----------------------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/goodsPoint/getall       |
| HTTP method         | GET                                                            |
| Token Required      | YES                                                            |
| Roles Authorized    | MANAGER                                                        |

+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    {
        "goodsPointID": 1,
        "onStockOrders": 0,
        "arrivingOrders": 0,
        "forwardedOrders": 1,
        "head": {
            "fullName": "Bùi Đức Anh",
            "employeeID": 23000013
        },
        "address": {
            "detail": "105",
            "commune": {
                "name": "Phường Láng Hạ"
            },
            "district": {
                "name": "Quận Đống Đa"
            },
            "province": {
                "name": "Thành phố Hà Nội"
            }
        }
    }
]
```

### <samp>Address API<samp>
#### <samp>Get all communes/districts/provinces<samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                                                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/province/getall  <br/> https://magicpost-uet.onrender.com/api/administrative/district/getall <br/> https://magicpost-uet.onrender.com/api/administrative/commune/getall |
| HTTP method         | GET                                                                                                                                                                                                                           |
| Token Required      | YES                                                                                                                                                                                                                           |
| Roles Authorized    | NONE                                                                                                                                                                                                                          |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    { "name":"Thành phố Hà Nội", "provinceID/districtID/communeID": 1 }
]
```
#### <samp>Get all districts by provinceID<samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/district/getall/:provinceID |
| HTTP method         | GET                                                                               |
| Token Required      | YES                                                                               |
| Roles Authorized    | NONE                                                                              |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    { "name":"Quận 1", "districtID":1474, "provinceID":63 }
]
```
#### <samp>Get all communes by districtID<samp>

+ ##### <em><samp>API Information</samp></em>

| Request Requirement | Content                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/commune/getall/:communeID |
| HTTP method         | GET                                                                             |
| Token Required      | YES                                                                             |
| Roles Authorized    | NONE                                                                            |
+ ##### <em><samp>Response JSON Sample</samp></em>
```json
[
    { "name":"Phường Phúc Xá", "communeID":1, "districtID":1 }
]
```
# <samp>Database Design<samp>

## <samp>Relation Schema<samp>
![Alt text](drawSQL-magicpost-export-2023-11-15.png)