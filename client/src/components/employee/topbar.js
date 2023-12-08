"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/js/src/dropdown.js";
import "@/css/employee/topbar.css";
import { useState } from "react";
import { motion } from "framer-motion";
import BreadCrumb from "./breadcrumd";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function TopBar() {
  const [profile, setProfile] = useState();
  return (
    <motion.nav layout class="navbar navbar-light bg-light topbar">
      <BreadCrumb />
      <motion.div layout id="avatar">
        <motion.nav
          layout
          initial={false}
          animate={profile ? "open" : "closed"}
          className="menu"
        >
          {/* <div d-flex flex-column bd-highlight>
            <div>Do Minh Duy</div>
        </div> */}
          <div class="d-flex flex-row justify-content-end bd-highlight mb-3">
            <div class="p-2 bd-highlight" id="user-name">
              <p>Do Minh Duy</p>
            </div>
            <motion.button
              layout
              whileTap={{ scale: 0.97 }}
              onClick={() => setProfile(!profile)}
              id="icon"
            >
              <FontAwesomeIcon layout icon="fa-solid fa-user-tie" size="2xl" />
              <motion.div
                layout
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.2 }}
                style={{ originY: 0.55 }}
              ></motion.div>
            </motion.button>
          </div>
          <motion.ul
            className="list-infor"
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05,
                },
              },
              closed: {
                clipPath: "inset(10% 5% 90% 5% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
              },
            }}
            style={{ pointerEvents: profile ? "auto" : "none" }}
          >
            <motion.li className="acc-list" variants={itemVariants}>
              Information
            </motion.li>
            <motion.li className="acc-list" variants={itemVariants}>
              Setting
            </motion.li>
            <motion.li className="acc-list" variants={itemVariants}>
              Logout
            </motion.li>
          </motion.ul>
        </motion.nav>
      </motion.div>
    </motion.nav>
  );
}
