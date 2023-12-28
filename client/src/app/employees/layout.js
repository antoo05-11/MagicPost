"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });
import { Breadcrumb, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "@/components/employee/sidebar/sidebar";
import "@/css/employee/employee-page.css";
import { useParams, usePathname } from "next/navigation";
import TopBar from "@/components/employee/topbar";
import { useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";
import { MenuToggle } from "@/components/employee/sidebar/menutoggle";
import { motion } from "framer-motion";
import { SWRConfig } from "swr";
import { useSession } from "next-auth/react";

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();
  const isSmallScreen = window.innerWidth <= 768;
  const translationValue = isSmallScreen ? '-50vw' : '-15vw';
  useEffect(() => {
    const menuAnimations = isOpen
      ? [
        [
          "#mySidebar",
          { transform: "translateX(0%)", opacity: 1 },
          { at: "<" },
        ],
        ["#togle-zone", { transform: "translateX(0%)" }, { at: "<" }],
      ]
      : [
        ["#mySidebar", { transform: "translateX(-100%)", opacity: 0 }],
        ["#togle-zone", { transform: `translateX(${translationValue})` }, { at: "<" }],
      ];

    animate([
      ...menuAnimations,
    ]);
  }, [isOpen]);

  return scope;
}

export default function EmployeesLayout({ children }) {
  const token = useSession()?.data?.accessToken;
  const [isOpen, setIsOpen] = useState(true);
  const scope = useMenuAnimation(isOpen);
  return (
    <motion.div ref={scope}>
      <SideBar />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      <motion.div id="main" data-isOpen={isOpen}>
        <TopBar layout />
        <motion.section id="noidung" children className="p-3">
          <Container>
            <SWRConfig
              value={{
                // refreshInterval: 3000,
                fetcher: async (url) =>
                  fetch(url, {
                    headers: new Headers({
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    }),
                  }).then((res) => {
                    return res.json();
                  }),
              }}
            >
              {children}
            </SWRConfig>
          </Container>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
