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
import { MdOutlineDashboard } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { LuPackage2 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";
import { SWRConfig } from "swr";
import { useSession } from "next-auth/react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
const roleFunc = {
  home_page: {
    url: "/employees",
    name: "Trang chính",
    icon: <MdOutlineDashboard size={"2em"} />,
  },
  list_employee: {
    url: "/employees/list_employee",
    name: "Nhân viên",
    icon: <IoPeopleOutline size={"2em"} />,
  },
  list_order: {
    url: "/employees/list_ordered",
    name: "Đơn hàng",
    icon: <LuPackage2 size={"2em"} />,
  },
  list_workspace: {
    url: "/employees/list_workspace",
    name: "Điểm tập kết",
    icon: <RiRoadMapLine size={"2em"} />,
  },
  list_transaction: {
    url: "/employees/list_transaction",
    name: "Điểm giao dịch",
    icon: <HiOutlineBuildingOffice size={"2em"} />,
  },
};
const role = {
  staff: [
    roleFunc["home_page"],
    roleFunc["list_employee"],
    roleFunc["list_order"],
    roleFunc["list_workspace"],
    roleFunc["list_transaction"],
  ],
};

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "#mySidebar",
            { transform: "translateX(0%)", opacity: 1 },
            { at: "<" },
          ],
          ["#togle-zone", { transform: "translateX(0%)" }, { at: "<" }],
          // ["#main", { transform: "translateX(0%)" }, { at: "<" }],
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
          ["#mySidebar", { transform: "translateX(-100%)", opacity: 0 }],
          ["#togle-zone", { transform: "translateX(-15vw)" }, { at: "<" }],
          // ["#main", { transform: "translateX(-15vw)" }, { at: "<" }],
        ];

    animate([
      // [
      //   "path.top",
      //   { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
      //   { at: "<" },
      // ],
      // ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      // [
      //   "path.bottom",
      //   { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
      //   { at: "<" },
      // ],
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
      <SideBar role={role.staff} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      <motion.div layout id="main" data-isOpen={isOpen}>
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
                  }).then((res) => res.json()),
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
