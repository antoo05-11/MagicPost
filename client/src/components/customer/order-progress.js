import { orderStatus } from "@/api/utils";
import { Container } from "react-bootstrap";
import "@/css/customer/timeline.css"
import { TbTruckDelivery } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";

export default function OrderProgress({ orderProcesses }) {
  const data = orderProcesses.processes;

  function formatDateTime(isoDateString) {
    const dateObject = new Date(isoDateString);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return {
      formattedTime,
      formattedDate,
    };
  }

  return (
    <Container>
      <div class="wrapper">
        <div class="center-line">
        </div>
        <div class="row">
          {data.map((process) => {
            const status = orderStatus[process.status] || {}
            const { formattedTime, formattedDate } = formatDateTime(process.arrivedTime);
            return (
              <section>
                <TbTruckDelivery className="icon" />
                <div class="details">
                  <span class="title"> <IoLocationOutline size={'2em'} />{process.routingPointAddress}</span>
                  <span>{formattedDate} {formattedTime}</span>
                </div>
                <p><span
                  className={`badge rounded-pill bg-${status.color} p-2`}
                >
                  {status.now}
                </span></p>
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
