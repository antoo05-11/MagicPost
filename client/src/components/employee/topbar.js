"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/js/src/dropdown.js";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BreadCrumb from "./breadcrumd";
import { signOut, useSession } from "next-auth/react";
import { FaRegBell } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "@/css/employee/topbar.css";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function TopBar() {
  const route = useRouter();
  const [profile, setProfile] = useState();
  const profileRef = useRef();
  const userName = useSession()?.data?.user?.fullName;
  // console.log(useSession()?.data?.user);
  useEffect(() => {
    const closeProfile = (e) => {
      // if (e.path[0] !== profileRef.currents) {
      setProfile(false);
      // }
    };
    document.body.addEventListener("click", closeProfile);
    return () => document.body.removeEventListener("click", closeProfile);
  });
  return (
    <motion.nav layout className="nav topbar">
      <Container className="navBar">
        <Row className="breadCrumbContainer">
          <BreadCrumb />
        </Row>

        <Row>
          <Col xs="auto">
            <motion.button layout type="button" class="btn btn-light notiBtn">
              <FaRegBell />
            </motion.button>
          </Col>
          <Col xs="auto" className="avatarContainer">
            <motion.nav
              layout
              initial={false}
              animate={profile ? "open" : "closed"}
            >
              <Container ref={profileRef} onClick={() => setProfile(!profile)}>
                <Row>
                  <Col xs="auto" className="userName">
                    {userName}
                  </Col>
                  <Col xs="auto">
                    <FaRegUserCircle size={"2em"} />
                  </Col>
                </Row>
              </Container>
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
                    display: "inline",
                  },
                  closed: {
                    clipPath: "inset(10% 5% 90% 5% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                      display: "inline",
                    },
                    display: "none",
                  },
                }}
                style={{ pointerEvents: profile ? "auto" : "none" }}
              >
                <motion.li
                  className="acc-list"
                  variants={itemVariants}
                  onClick={() => {
                    setProfile(!profile);
                    route.push("/employees/information");
                  }}
                >
                  Information
                </motion.li>
                <motion.li
                  className="acc-list"
                  variants={itemVariants}
                  onClick={() => signOut()}
                >
                  Logout
                </motion.li>
              </motion.ul>
            </motion.nav>
          </Col>
        </Row>
      </Container>
    </motion.nav>
    // <motion.nav layout class="navbar navbar-light topbar">
    //   <BreadCrumb />
    //   <motion.div layout className="avatarContainer">
    //     <motion.button layout type="button" class="btn btn-primary icon">
    //       <FaRegBell />
    //     </motion.button>
    //     <motion.nav
    //       layout
    //       initial={false}
    //       animate={profile ? "open" : "closed"}
    //       className="menu">
    //       <div className="avatar container" onClick={() => setProfile(!profile)}>
    //         <div id="user-name">
    //           <p>Do Minh Duy</p>
    //           <FaRegUserCircle />
    //         </div>

    //       </div>

    //     </motion.nav>
    //   </motion.div>
    // </motion.nav>
  );
}
