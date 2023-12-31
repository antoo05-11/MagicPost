import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listUrl, employeeRole } from "@/api/utils";
import { useSession } from "next-auth/react";
import "@/css/employee/sidebar.css";
import { Row, Image, Col } from "react-bootstrap";
import { FaTruckFast } from "react-icons/fa6";

let pagenow = 1;
let pagepre = 1;
export default function SideBar() {
  const route = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState("true");
  const rightRole = employeeRole[useSession()?.data?.user?.role]?.right;
  const rightURL = [];
  for (var i in rightRole) {
    rightURL.push({ url: listUrl[rightRole[i]], active: i });
    if (pathname.includes(listUrl[rightRole[i]]?.url)) pagenow = i;
  }

  const show = {
    opacity: 1,
    display: "block",
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  return (
    <motion.div
      animate={isOpen ? show : hide}
      className="sidebar"
      data-isOpen={isOpen}
      id="mySidebar"
      exit={{ opacity: 0 }}
    >
      <Link href="/employees" className="appName">
        <Col>
          <FaTruckFast size={"2em"}/>
          MAGIC POST
        </Col>
      </Link>

      {rightURL?.map((roro) => {
        return (
          <div
            className={
              pagenow == roro?.active
                ? "bar-item button item-bar active"
                : "bar-item button item-bar"
            }
            onClick={() => {
              pagenow = roro.active;
              route.push(roro?.url?.url);
            }}
          >
            {roro?.url?.icon}
            {roro?.url?.name}
          </div>
        );
      })}
    </motion.div>
  );
}
