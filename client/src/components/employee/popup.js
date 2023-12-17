"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
export default function PopUp({ isOpen, setIsOpen, infor }) {
  return (
    <>
      <div className="disClick" data-isOpen={isOpen}></div>
      <motion.div layout className="popup" data-isOpen={isOpen}>
        <button onClick={() => setIsOpen(!isOpen)}>close</button>
        <div>{createError[infor?.code]}</div>
      </motion.div>
    </>
  );
}
