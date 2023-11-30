# API List

## Order API

### Get all order

| Request Requirement | Content                                             |
|---------------------|-----------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/order/getall |
| HTTP method         | GET                                                |
| Token Required      | YES                                                 |
| Roles Authorized     | TRANSACTION_POINT_EMPLOYEE, TRANSACTION_POINT_HEADER                          |

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

### Create new order

| Request Requirement | Content                                             |
|---------------------|-----------------------------------------------------|
| API URL             | https://magicpost-uet.onrender.com/api/order/create |
| HTTP method         | POST                                                |
| Token Required      | YES                                                 |
| Roles Authorized     | TRANSACTION_POINT_EMPLOYEE                          |


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
# Database Design
![Alt text](drawSQL-magicpost-export-2023-11-15.png)