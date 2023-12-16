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
import "@/css/employee/sidebar.css"
import { Row, Image, Col } from "react-bootstrap";

export default function SideBar() {
  const route = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState("true");
  const rightRole = employeeRole[useSession()?.data?.user?.role]?.right;
  const rightURL = [];
  for (var i in rightRole) {
    rightURL.push(listUrl[rightRole[i]]);
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

  const isActive = (pathname === "/" || pathname.includes("/employees"));

  return (
    <motion.div
      // initial={false}
      animate={isOpen ? show : hide}
      // transition={{ duration: 1 }}
      className="sidebar"
      data-isOpen={isOpen}
      id="mySidebar"
      exit={{ opacity: 0 }}
    >

      <Link href="/employees" className="appName">
        MAGIC POST
      </Link>
      
      {rightURL?.map((roro) => {
        return (
          <div
            className={
              pathname === roro?.url
                ? "bar-item button item-bar active"
                : "bar-item button item-bar"
            }
            onClick={() => {
              route.push(roro?.url);
            }}
          >
            {roro?.icon}
            {roro?.name}
          </div>
        );
      })}
    </motion.div>
  );
}