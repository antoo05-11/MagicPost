"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, useAnimate } from "framer-motion";
import "bootstrap/js/src/dropdown.js";
import { useEffect } from "react";
export default function SideBar({ role }) {
  const route = useRouter();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const controls = animate();
  });
  return (
    <motion.div
      // initial={false}
      animate={{ x: [-300, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="sidebar"
      id="mySidebar"
      exit={{ opacity: 0 }}
    >
      <a href="/employees" className="bar-item" id="app-name">
        Magic Post
      </a>
      <button
        className="bar-item button large"
        id="button-close"
        onClick={() => {
          console.log(345);
          document.getElementById("main").style.width = "100%";
          document.getElementById("main").style.marginLeft = "0%";
          document.getElementById("mySidebar").style.width = "0%";
          document.getElementById("button-open").style.display = "inline";
        }}
      >
        Close &times;
      </button>

      <hr />
      {role?.map((roro) => {
        return (
          <div
            className="bar-item button"
            onClick={() => {
              route.push(roro?.url);
            }}
          >
            {roro?.name}
          </div>
        );
      })}

      <hr />
      <div className="position-absolute bottom-0 start-50 translate-middle d-flex">
        <div class="dropdown">
          <button
            class="btn btn-secondary d-flex justify-content-center"
            id="btn-logout"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon="fa-solid fa-user-tie" size="2xl" />
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" onClick={() => signOut()}>
                Logout
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/employees/information">
                Information
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Setting
              </a>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "10px" }}>Do Minh Duy</div>
      </div>
      {/* <script src="/static/script.js"></script> */}
    </motion.div>
  );
}
