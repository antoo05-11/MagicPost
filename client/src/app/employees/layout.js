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
const roleFunc = {
  list_employee: {
    url: "/employees/list_employee",
    name: "Danh sach nhan vien",
  },
  list_order: {
    url: "/employees/list_ordered",
    name: "Danh sach don hang",
  },
};
const role = {
  staff: [roleFunc["list_employee"], roleFunc["list_order"]],
};

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "#mySidebar",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
          ],
          ["#togle-zone", { transform: "translateX(0%)" }, { at: "<" }],
          ["#main", { transform: "translateX(0%)" }, { at: "<" }],
          // [
          //   "li",
          //   { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
          //   { delay: stagger(0.05), at: "-0.1" },
          // ],
        ]
      : [
          // [
          //   "li",
          //   { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
          //   { delay: stagger(0.05, { from: "last" }), at: "<" },
          // ],
          ["#mySidebar", { transform: "translateX(-100%)" }, { at: "-0.1" }],
          ["#togle-zone", { transform: "translateX(-15vw)" }, { at: "<" }],
          ["#main", { transform: "translateX(-15vw)" }, { at: "<" }],
        ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations,
    ]);
  }, [isOpen]);

  return scope;
}

export default function EmployeesLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const scope = useMenuAnimation(isOpen);
  return (
    <motion.div ref={scope}>
      <SideBar role={role.staff} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      <motion.div layout id="main" data-isOpen={isOpen}>
        {/* <Breadcrumb>
          {array.map((list) => {  
            return <Breadcrumb.Item>{list}</Breadcrumb.Item>;
          })}
        </Breadcrumb> */}
        <TopBar />
        <motion.section id="noidung">
          <Container>{children}</Container>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
