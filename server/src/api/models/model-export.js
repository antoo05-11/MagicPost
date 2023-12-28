const db = require('../models');

// Order
export const Order = db.orders;
export const Process = db.processes;
export const Goods = db.goods;

// Routing Point
export const Address = db.addresses;
export const RoutingPoint = db.routing_points;
export const Route = db.routes;
export const GoodsPoint = db.goods_points;
export const TransactionPoint = db.transaction_points;

// Administrative
export const Commune = db.communes;
export const District = db.districts;
export const Province = db.provinces;

// Human
export const Customer = db.customers;
export const Employee = db.employees;
export const EmployeeRole = db.employee_roles;

// References
Address.belongsTo(Commune, { foreignKey: 'communeID' });
Address.belongsTo(District, { foreignKey: 'districtID' });
Address.belongsTo(Province, { foreignKey: 'provinceID' });

District.belongsTo(Province, { foreignKey: 'provinceID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });

RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });

Employee.belongsTo(Address, { foreignKey: 'addressID', as: 'address' });
Employee.belongsTo(RoutingPoint, { foreignKey: 'workingPointID', as: 'workingPoint' });
Employee.belongsTo(TransactionPoint, { foreignKey: 'workingPointID' });
Employee.belongsTo(GoodsPoint, { foreignKey: 'workingPointID' });

TransactionPoint.belongsTo(RoutingPoint, { foreignKey: 'transactionPointID' });
TransactionPoint.hasMany(Employee, { foreignKey: 'workingPointID' });
TransactionPoint.hasMany(Process, { foreignKey: 'routingPointID' });

GoodsPoint.hasMany(Process, { foreignKey: 'routingPointID' });
GoodsPoint.hasMany(Employee, { foreignKey: 'workingPointID' });
GoodsPoint.belongsTo(RoutingPoint, { foreignKey: 'goodsPointID' });

Order.hasMany(Process, { foreignKey: 'orderID' });
Order.belongsTo(TransactionPoint, { foreignKey: 'startTransactionPointID', as: 'startTransactionPoint' });
Order.belongsTo(TransactionPoint, { foreignKey: 'endTransactionPointID', as: 'endTransactionPoint' });
Order.belongsTo(Customer, { foreignKey: 'senderID', as: 'sender' });
Order.belongsTo(Customer, { foreignKey: 'receiverID', as: 'receiver' });
Order.belongsTo(Employee, { foreignKey: 'creatorID' });

Process.belongsTo(TransactionPoint, { foreignKey: 'routingPointID' });
Process.belongsTo(GoodsPoint, { foreignKey: 'routingPointID' });
Process.belongsTo(Order, { foreignKey: 'orderID' });
Process.belongsTo(RoutingPoint, { foreignKey: 'routingPointID' });

Customer.belongsTo(Address, { foreignKey: 'addressID' });

Goods.belongsTo(Order, { foreignKey: 'orderID' });