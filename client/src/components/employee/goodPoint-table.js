import Pagination from "./pagination";

export default function GoodPointTable() {
    return (
        <div>
            <div className="mt-2 flow-root table">
                <div className="inline-block min-w-full align-middle">
                    <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã điểm</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Trưởng điểm</th>
                                    <th scope="col">Hàng đã nhận</th>
                                    <th scope="col">Hàng đang giao</th>
                                    <th scope="col">Hàng đã giao</th>
                                </tr>
                            </thead>

                            <tbody class="table-group-divider">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination totalPage={1} />
        </div>
    );
}