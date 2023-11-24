import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CardData = [
  {
    title: "Revenue",
    subTitle: "Last one month",
    data: "50000$",
    icon: (
      <FontAwesomeIcon
        icon="fa-solid fa-money-bill"
        size="2xl"
        style={{ color: "#f773a2" }}
      />
    ),
    background: "#feedf3",
  },
  {
    title: "Received",
    data: "100000",
    subTitle: "Last one day",
    icon: (
      <FontAwesomeIcon
        icon="fa-solid fa-truck-fast"
        size="2xl"
        style={{ color: "#fec736" }}
      />
    ),
    background: "#fff8e7",
  },
  {
    title: "Sent",
    data: "500",
    subTitle: "Last one day",
    icon: (
      <FontAwesomeIcon
        icon="fa-solid fa-dolly"
        size="2xl"
        style={{ color: "#4c78fc" }}
      />
    ),
    background: "#ebf0ff",
  },
  {
    title: "Staff",
    data: "500",
    subTitle: "Last one year",
    icon: (
      <FontAwesomeIcon
        icon="fa-solid fa-people-group"
        size="2xl"
        style={{ color: "#27bfc8" }}
      />
    ),
    background: "#ebf9fa",
  },
];
