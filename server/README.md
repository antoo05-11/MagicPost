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
    - [Get all orders](#get-all-orders)
      - [Sample response JSON](#sample-response-json-4)
    - [Get order by ID](#get-order-by-id)
      - [Sample Response JSON](#sample-response-json-5)
    - [Create new order](#create-new-order)
      - [Sample Request JSON](#sample-request-json-2)
      - [Sample Response JSON](#sample-response-json-6)
  - [Address API](#address-api)
    - [Get all communes/districts/provinces](#get-all-communesdistrictsprovinces)
      - [Sample response JSON](#sample-response-json-7)
    - [Get all districts by provinceID](#get-all-districts-by-provinceid)
      - [Sample response JSON](#sample-response-json-8)
    - [Get all communes by districtID](#get-all-communes-by-districtid)
      - [Sample response JSON](#sample-response-json-9)
- [Database Design](#database-design)
# API List

## Auth API

### Log in

#### Sample request JSON

```json
{
    "employeeID": "23000014",
    "password": "password"
}
```

#### Sample response JSOn

```json
{
    "user": {
        "employeeID": 23000014,
        "identifier": "010203090730",
        "phoneNumber": "0123457789",
        "fullName": "Nguyễn Thị Hòa",
        "addressID": 91,
        "role": "TRANSACTION_POINT_EMPLOYEE",
        "email": "hoanguyen@gmail.com",
        "workingPointID": 47
    },
    "accessToken": "sample-token"
}
```

## Employee API

### Get all employees

| Request Requirement | Content                                                |
| ------------------- | ------------------------------------------------------ |
| API URL             | https://magicpost-uet.onrender.com/api/employee/getall |
| HTTP method         | GET                                                    |
| Token Required      | YES                                                    |
| Roles Authorized    | TRANSACTION_POINT_HEADER                               |

#### Sample response JSON
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

#### Sample response JSON
```json
```

### Add new employee

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/employee/add |
| HTTP method         | GET                                                 |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_HEADER                            |

#### Sample request JSON
```json
{
    "identifier": "040508576730",
    "phoneNumber": "0123457589",
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
#### Sample response JSON
```json
```

## Order API

### Get all orders

| Request Requirement | Content                                              |
| ------------------- | ---------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/order/getall  |
| HTTP method         | GET                                                  |
| Token Required      | YES                                                  |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER |

#### Sample response JSON
```json
[
    {
        "orderID": "1",
        "senderID": 1,
        "receiverID": 2,
        "sentTime": "2023-11-16T00:05:12.000Z",
        "receivedTime": "2023-11-17T00:05:15.000Z",
        "failChoice": "return",
        "mainPostage": 100000,
        "addedPostage": 0,
        "VATFee": 10000,
        "otherFee": 0,
        "receiverCOD": 0,
        "receiverOtherFee": 0,
        "startTransactionPointID": 45,
        "endTransactionPointID": 46,
        "specialService": null,
        "creatorID": 23000000,
        "status": "delivering",
        "createdAt": null,
        "updatedAt": null
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

#### Sample Response JSON
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


#### Sample Request JSON

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

#### Sample Response JSON

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

| Request Requirement | Content                                             |
| ------------------- | --------------------------------------------------- |
| API URL             | https://magicpost-uet.onrender.com/api/http://localhost:3000/api/transactionPoint/get/?provinceID=?&districtID=?&communeID=? |
| HTTP method         | POST                                                |
| Token Required      | YES                                                 |
| Roles Authorized    | TRANSACTION_POINT_EMPLOYEE                          |

#### Sample response JSON
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
#### Sample response JSON
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
#### Sample response JSON
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
#### Sample response JSON
```json
[
    {
        "name":"Phường Phúc Xá","communeID":1,"districtID":1
    }
]
```
# Database Design
![Alt text](drawSQL-magicpost-export-2023-11-15.png)