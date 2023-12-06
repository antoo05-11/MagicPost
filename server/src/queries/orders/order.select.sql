select
    orders.*,
    employees.fullName as creatorName,
    start_transaction_address.addressID as startTransationAddressID,
    start_transaction_address.detail as startTransactionAddressDetail,
    start_transaction_communes.communeID as startTransactionCommuneID,
    start_transaction_communes.name as startTransactionCommuneName,
    start_transaction_districts.districtID as startTransactionDistrictID,
    start_transaction_districts.name as startTransactionDistrictName,
    start_transaction_provinces.provinceID as startTransactionProvinceID,
    start_transaction_provinces.name as startTransactionProvinceName,
    end_transaction_address.addressID as startTransationAddressID,
    end_transaction_address.detail as endTransactionAddressDetail,
    end_transaction_communes.communeID as endTransactionCommuneID,
    end_transaction_communes.name as endTransactionCommuneName,
    end_transaction_districts.districtID as endTransactionDistrictID,
    end_transaction_districts.name as endTransactionDistrictName,
    end_transaction_provinces.provinceID as endTransactionProvinceID,
    end_transaction_provinces.name as endTransactionProvinceName,
    receivers.fullname as receiverFullName,
    receivers.addressID as receiverAddressID,
    receiver_addresses.detail as receiverAddressDetail,
    receivers.phoneNumber as receiverPhoneNumber,
    receiver_communes.communeID as receiverCommuneID,
    receiver_communes.name as receiverCommuneName,
    receiver_districts.districtID as receiverDistrictID,
    receiver_districts.name as receiverDistrictName,
    receiver_provinces.provinceID as receiverProvinceID,
    receiver_provinces.name as receiverProvinceName,
    senders.fullname as senderFullName,
    senders.phoneNumber as senderPhoneNumber,
    senders.addressID as senderAddressID,
    sender_addresses.detail as senderAddressDetail,
    sender_communes.communeID as senderCommuneID,
    sender_communes.name as senderCommuneName,
    sender_districts.districtID as senderDistrictID,
    sender_districts.name as senderDistrictName,
    sender_provinces.provinceID as senderProvinceID,
    sender_provinces.name as senderProvinceName
from
    orders
    inner join employees on orders.creatorID = employees.employeeID
    inner join routing_points as start_routing_points on orders.startTransactionPointID = start_routing_points.routingPointID
    inner join addresses as start_transaction_address on start_routing_points.addressID = start_transaction_address.addressID
    inner join communes as start_transaction_communes on start_transaction_address.communeID = start_transaction_communes.communeID
    inner join districts as start_transaction_districts on start_transaction_communes.districtID = start_transaction_districts.districtID
    inner join provinces as start_transaction_provinces on start_transaction_districts.provinceID = start_transaction_provinces.provinceID
    inner join routing_points as end_routing_points on orders.endTransactionPointID = end_routing_points.routingPointID
    inner join addresses as end_transaction_address on end_routing_points.addressID = end_transaction_address.addressID
    inner join communes as end_transaction_communes on end_transaction_address.communeID = end_transaction_communes.communeID
    inner join districts as end_transaction_districts on end_transaction_communes.districtID = end_transaction_districts.districtID
    inner join provinces as end_transaction_provinces on end_transaction_districts.provinceID = end_transaction_provinces.provinceID
    inner join customers as receivers on orders.receiverID = receivers.customerID
    inner join addresses as receiver_addresses on receivers.addressID = receiver_addresses.addressID
    inner join communes as receiver_communes on receiver_addresses.communeID = receiver_communes.communeID
    inner join districts as receiver_districts on receiver_communes.districtID = receiver_districts.districtID
    inner join provinces as receiver_provinces on receiver_districts.provinceID = receiver_provinces.provinceID
    inner join customers as senders on orders.senderID = senders.customerID
    inner join addresses as sender_addresses on senders.addressID = sender_addresses.addressID
    inner join communes as sender_communes on sender_addresses.communeID = sender_communes.communeID
    inner join districts as sender_districts on sender_communes.districtID = sender_districts.districtID
    inner join provinces as sender_provinces on sender_districts.provinceID = sender_provinces.provinceID
where
    orderID = :orderID;