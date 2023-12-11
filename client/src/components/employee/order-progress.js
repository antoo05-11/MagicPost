export default function OrderProgress() {
    return (
        <div className="mt-2 flow-root table">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
                    <table className="table table-hover mb-0 ">
                        <thead>
                            <tr>
                                <th scope="col">
                                    STT
                                </th>
                                <th scope="col" >
                                    Ngày
                                </th>
                                <th scope="col" >
                                    Giờ
                                </th>
                                <th scope="col" >
                                    Trạng thái
                                </th>
                                <th scope="col" >
                                    Vị trí
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {/* {data?.map((data, index) => {
                                return (
                                    <tr key={data?.employeeID}>
                                        <td>{index + 1}</td>
                                        <td>{data?.orderID}</td>
                                        <td>{data?.status}</td>
                                        <td>{data?.senderID}</td>
                                        <td>{data?.receiverID}</td>
                                        <td>{data?.creatorID}</td>
                                        <td>
                                            <OrderDetail id={data?.employeeID} />
                                        </td>
                                    </tr>
                                );
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}