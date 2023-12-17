import { orderStatus } from "@/api/utils";
export default function OrderProgress({ orderProcesses }) {
  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="table table-hover mb-0 ">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Thoi gian van chuyen</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Vị trí</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {orderProcesses?.map((data, index) => {
                return (
                  <tr key={data?.processID}>
                    <td>{index + 1}</td>
                    <td>{data?.arrivedTime}</td>
                    <td>{orderStatus[data?.status]?.now}</td>
                    <td>{data?.routingPointAddress}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
