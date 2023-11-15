export class Order {
  constructor(
    employeeID,
    identifier,
    phoneNumber,
    fullName,
    address,
    role,
    email,
    goodsPointID,
    transactionPointID
  ) {
    this.employeeID = employeeID;
    this.identifier = identifier;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.address = address;
    this.role = role;
    this.email = email;
    this.goodsPointID = goodsPointID;
    this.transactionPointID = transactionPointID;
  }
}
let i = new Order();
i.address = 1;
