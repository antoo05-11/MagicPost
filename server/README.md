MagicPost Node.js server
=======

# Table of content
- [MagicPost Node.js server](#magicpost-nodejs-server)
- [Table of content](#table-of-content)
- [API List](#api-list)
  - [Auth API](#auth-api)
    - [Log in](#log-in)
      - [Sample request JSON](#sample-request-json)
      - [Sample response JSOn](#sample-response-json)
  - [Employee API](#employee-api)
    - [Get all employees](#get-all-employees)
      - [Sample response JSON](#sample-response-json-1)
    - [Get employee by employeeID](#get-employee-by-employeeid)
      - [Sample response JSON](#sample-response-json-2)
    - [Add new employee](#add-new-employee)
      - [Sample request JSON](#sample-request-json-1)
      - [Sample response JSON](#sample-response-json-3)
  - [Order API](#order-api)
    - [Get all orders (with current working address)](#get-all-orders-with-current-working-address)
      - [Sample response JSON](#sample-response-json-4)
    - [Get order by ID](#get-order-by-id)
      - [Sample Response JSON](#sample-response-json-5)
    - [Create new order](#create-new-order)
      - [Sample Request JSON](#sample-request-json-2)
      - [Sample Response JSON](#sample-response-json-6)
  - [Transaction Point API](#transaction-point-api)
    - [Get transaction point by address](#get-transaction-point-by-address)
      - [Sample response JSON](#sample-response-json-7)
  - [Address API](#address-api)
    - [Get all communes/districts/provinces](#get-all-communesdistrictsprovinces)
      - [Sample response JSON](#sample-response-json-8)
    - [Get all districts by provinceID](#get-all-districts-by-provinceid)
      - [Sample response JSON](#sample-response-json-9)
    - [Get all communes by districtID](#get-all-communes-by-districtid)
      - [Sample response JSON](#sample-response-json-10)
- [Database Design](#database-design)
# Error Response JSON Sample
```json
{
    "code": "...",
    "error": "...",
    "message": "..."
}
```
## Error code

| HTTP status code | Error code | Description                                                                               |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------- |
| 400              | 10000      | Invalid Address (CommuneID, DistrictID and ProvinceID are not compatible with each other) |
| 400              | 10001      | Invalid Email                                                                             |
| 409              | 10002      | Duplicated Identifier                                                                     |
| 400              | 10003      | Invalid Address (Detail attribute must not be null or empty)                              |
| 400              | 10004      | Invalid Phone Number                                                                      |


# API List

## Auth API

### Log in

#### Request JSON Sample

```json
{
    "employeeID": "23000014",
    "password": "password"
}
```

#### Response JSON Sample

```json
{
    "user": {
        "employeeID": 23000014,
        "identifier": "010203090730",
        "phoneNumber": "0123457789",
        "fullName": "Nguyễn Thị Hòa",
        "addressID": 91,
        "role": "TRANSACTION_POINT_EMPLOYEE",
        "email": "email@email.com",
        "workingPointID": 47
    },
    "accessToken": "sample-token"
}
```

## Employee API

### Get all employee roles

| Request Requirement | Content                                                     |
| ------------------- | ----------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/getAllRoles |
| HTTP method         | GET                                                         |
| Token Required      | YES                                                         |
| Roles Authorized    | NONE                                                        |

#### Response JSON Sample
```json
[
    "GOODS_POINT_EMPLOYEE",
    "GOODS_POINT_HEAD",
    "MANAGER",
    "TRANSACTION_POINT_EMPLOYEE",
    "TRANSACTION_POINT_HEAD"
]
```

### Get all employees

| Request Requirement | Content                                                |
| ------------------- | ------------------------------------------------------ |
| API URL             | https://magicpost-uet.onrender.com/api/employee/getall |
| HTTP method         | GET                                                    |
| Token Required      | YES                                                    |
| Roles Authorized    | TRANSACTION_POINT_HEADER                               |

#### Response JSON Sample
```json
[
    {
        "employeeID": 23000000,
        "identifier": "010203000000",
        "phoneNumber": "0123456789",
        "fullName": "Nguyễn Hòa Bình",
        "role": "TRANSACTION_POINT_EMPLOYEE",
        "email": "hoabinhnguyen@gmail.com",
        "workingPointID": 45,
        "address": {
            "province": "Tỉnh Quảng Ninh",
            "district": "Thành phố Uông Bí",
            "commune": "Phường Thanh Sơn",
            "detail": "435 Trần Khánh Dư"
        }
    }
]
```

### Get employee by employeeID

| Request Requirement | Content                                                 |
| ------------------- | ------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/get/:id |
| HTTP method         | POST                                                    |
| Token Required      | YES                                                     |
| Roles Authorized    | TRANSACTION_POINT_HEADER                                |

#### Response JSON Sample
```json
```

### Add new employee

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/add |
| HTTP method         | GET                                                 |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_HEADER                            |

#### Request JSON Sample
```json
{
    "identifier": "0405899833000",
    "phoneNumber": "0192344559",
    "fullName": "Thái Hoàng Linh",
    "address": {
        "detail": "Số 100, đường 19/4",
        "communeID": "5355",
        "districtID": "302",
        "provinceID": "27" 
    },
    "transactionPointID": null,
    "goodPointID": null,
    "email": "linhhoang@yahoo.com",
    "role": null
}
```
#### Response JSON Sample
```json
{
    "employeeID": 23000042,
    "identifier": "0405899833000",
    "phoneNumber": "0192344559",
    "fullName": "Thái Hoàng Linh",
    "addressID": 171,
    "email": "linhhoang@yahoo.com",
    "password": "YRkLcYuE",
    "role": null,
    "address": {
        "province": "Tỉnh Nghệ An",
        "district": "Huyện Tân Kỳ",
        "commune": "Thị trấn Tân Kỳ",
        "detail": "Số 100, đường 19/4"
    }
}
```

### Get employee by ID
| Request Requirement | Content                                                 |
| ------------------- | ------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/:id/get |
| HTTP method         | GET                                                     |
| Token Required      | YES                                                     |
| Roles Authorized    | TRANSACTION_POINT_HEADER                                |

#### Response JSON sample

```json
{
    "employeeID": 23000000,
    "identifier": "010203000000",
    "phoneNumber": "0123456789",
    "fullName": "Nguyễn Hòa Bình",
    "role": "TRANSACTION_POINT_EMPLOYEE",
    "email": "hoabinhnguyen@gmail.com",
    "workingPointID": 45,
    "address": {
        "addressID": 90,
        "detail": "435 Trần Khánh Dư",
        "commune": {
            "communeID": 2464,
            "name": "Phường Thanh Sơn"
        },
        "district": {
            "districtID": 145,
            "name": "Thành phố Uông Bí"
        },
        "province": {
            "provinceID": 14,
            "name": "Tỉnh Quảng Ninh"
        }
    },
    "routing_point": {
        "routingPointID": 45,
        "address": {
            "addressID": 81,
            "commune": {
                "communeID": 57,
                "name": "Phường Dịch Vọng Hậu"
            },
            "district": {
                "districtID": 5,
                "name": "Quận Cầu Giấy"
            },
            "province": {
                "provinceID": 1,
                "name": "Thành phố Hà Nội"
            }
        }
    }
}
```

## Order API

### Get all orders (with current working address)

| Request Requirement | Content                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/getall                                            |
| HTTP method         | GET                                                                                            |
| Token Required      | YES                                                                                            |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER, GOODS_POINT_EMPLOYEE, GOODS_POINT_HEADER |

#### Response JSON Sample
```json
[
    {
        "orderID": "1",
        "sentTime": "2023-11-16T00:05:12.000Z",
        "receivedTime": "2023-11-17T00:05:15.000Z",
        "status": "delivering"
    }
]
```

### Get order by ID

| Request Requirement | Content                                              |
| ------------------- | ---------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/get/:id |
| HTTP method         | GET                                                  |
| Token Required      | YES                                                  |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER |

#### Response JSON Sample
```json
{
    "order": {
        "sender": {
            "fullname": "Trần Vương Khánh",
            "phoneNumber": "0123456789",
            "address": {
                "detail": "Số 1, đường Xuân Thủy",
                "commune": {
                    "communeID": 57,
                    "name": "Phường Dịch Vọng Hậu"
                },
                "district": {
                    "districtID": 5,
                    "name": "Quận Cầu Giấy"
                },
                "province": {
                    "provinceID": 1,
                    "name": "Thành phố Hà Nội"
                }
            }
        },
        "receiver": {
            "fullname": "Vương Khánh Linh",
            "phoneNumber": "0123456789",
            "address": {
                "detail": "435 Trần Khánh Dư",
                "commune": {
                    "communeID": 2464,
                    "name": "Phường Thanh Sơn"
                },
                "districtName": {
                    "districtID": 145,
                    "name": "Thành phố Uông Bí"
                },
                "provinceName": {
                    "provinceID": 14,
                    "name": "Tỉnh Quảng Ninh"
                }
            }
        },
        "creator": {
            "creatorID": 23000014,
            "creatorName": "Nguyễn Thị Hòa"
        },
        "failChoice": "return",
        "mainPostage": 1000,
        "addedPostage": 1000,
        "VATFee": 1000,
        "otherFee": 1000,
        "receiverCOD": 1000,
        "receiverOtherFee": 1000,
        "specialService": "",
        "orderID": "AEX451934145VN",
        "startTransactionPointID": 47,
        "endTransactionPointID": 46,
        "createdAt": "2023-11-30T13:00:31.000Z",
        "updatedAt": "2023-11-30T13:00:31.000Z"
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

### Create new order

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/create |
| HTTP method         | POST                                                |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE                          |


#### Request JSON Sample

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
        "mainPostage": "1000",
        "addedPostage": "1000",
        "VATFee": "1000",
        "otherFee": "1000",
        "receiverCOD": "1000",
        "receiverOtherFee": "1000",
        "specialService": ""
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

#### Response JSON Sample

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
        "mainPostage": "1000",
        "addedPostage": "1000",
        "VATFee": "1000",
        "otherFee": "1000",
        "receiverCOD": "1000",
        "receiverOtherFee": "1000",
        "specialService": "",
        "orderID": "UAO124368446VN",
        "startTransactionPointID": 47,
        "endTransactionPointID": "46",
        "creatorID": 23000014,
        "createdAt": "2023-11-30T13:39:12.787Z",
        "updatedAt": "2023-11-30T13:39:12.787Z"
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

## Transaction Point API
### Get transaction point by address

| Request Requirement | Content                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/http://localhost:3000/api/transactionPoint/get/?provinceID=?&districtID=?&communeID=? |
| HTTP method         | GET                                                                                                                          |
| Token Required      | NO                                                                                                                           |
| Roles Authorized    | NONE                                                                                                                         |

#### Response JSON Sample
```json
[
    {
        "address": {
            "detail": "Số 1, đường Xuân Thủy",
            "commune": {
                "name": "Phường Dịch Vọng Hậu"
            },
            "district": {
                "name": "Quận Cầu Giấy"
            },
            "province": {
                "name": "Thành phố Hà Nội"
            }
        }
    }
]
```

## Address API
### Get all communes/districts/provinces
| Request Requirement | Content                                                                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/province/getall  <br/> https://magicpost-uet.onrender.com/api/administrative/district/getall <br/> https://magicpost-uet.onrender.com/api/administrative/commune/getall |
| HTTP method         | GET                                                                                                                                                                                                                           |
| Token Required      | YES                                                                                                                                                                                                                           |
| Roles Authorized    | NONE                                                                                                                                                                                                                          |
#### Response JSON Sample
```json
[
    {
        "name":"Thành phố Hà Nội", "provinceID/districtID/communeID": 1
    }
]
```
### Get all districts by provinceID
| Request Requirement | Content                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/district/getall/:provinceID |
| HTTP method         | GET                                                                               |
| Token Required      | YES                                                                               |
| Roles Authorized    | NONE                                                                              |
#### Response JSON Sample
```json
[
    {
        "name":"Quận 1","districtID":1474,"provinceID":63
    }
]
```
### Get all communes by districtID
| Request Requirement | Content                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/administrative/commune/getall/:communeID |
| HTTP method         | GET                                                                             |
| Token Required      | YES                                                                             |
| Roles Authorized    | NONE                                                                            |
#### Response JSON Sample
```json
[
    {
        "name":"Phường Phúc Xá","communeID":1,"districtID":1
    }
]
```
# Database Design
![Alt text](drawSQL-magicpost-export-2023-11-15.png)