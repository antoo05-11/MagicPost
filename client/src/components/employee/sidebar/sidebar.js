"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, useAnimate } from "framer-motion";
import "bootstrap/js/src/dropdown.js";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SideBar({ role, open }) {
  const route = useRouter();
  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState("true");
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
      // initial={false}
      animate={isOpen ? show : hide}
      // transition={{ duration: 1 }}
      className="sidebar"
      data-isOpen={isOpen}
      id="mySidebar"
      exit={{ opacity: 0 }}
    >
      <Link href="/employees" id="app-name">
        Magic Post
      </Link>

      <hr />
      {role?.map((roro) => {
        return (
          <div
            className={
              pathname.includes(roro?.url)
                ? "bar-item button item-bar active"
                : "bar-item button item-bar"
            }
            onClick={() => {
              route.push(roro?.url);
            }}
          >
            {roro?.name}
          </div>
        );
      })}

      <hr />
    </motion.div>
  );
}
