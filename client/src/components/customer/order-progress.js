import { orderStatus } from "@/api/utils";
import { Container, Col } from "react-bootstrap";
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
      <div className="wrapper">
        <div className="center-line">
        </div>
        <div className="row">
          {data.map((process, index) => {
            const status = orderStatus[process.status] || {}
            const { formattedTime, formattedDate } = formatDateTime(process.arrivedTime);
            return (
              <section key={index}>
                <TbTruckDelivery className="icon" />
                <div className="details">
                  <Col xs="10" className="me-2 text-justify">
                    <span className="title"> <IoLocationOutline size={'2em'} />{process.routingPointAddress}</span>
                  </Col>
                  <Col>
                    <span className="time">{formattedDate} {formattedTime}</span>
                  </Col>
                </div>
                <p>
                  <span className={`badge rounded-pill bg-${status.color} p-2`}>
                    {status.now}
                  </span>
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
