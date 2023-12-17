"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
export default function PopUp({ isOpen, setIsOpen }) {
  return (
    <>
      <div className="disClick" data-isOpen={isOpen}></div>
      <motion.div
        layout
        className="popup"
        data-isOpen={isOpen}
        //   whileHover="hover"
        // variants={popupVariants}
        onPan={(e, pointInfo) => {
          console.log(123);
        }}
        onMouseLeave={() => {
          console.log(345);
        }}
      >
        <button onClick={() => setIsOpen(!isOpen)}>close</button>
      </motion.div>
    </>
  );
}
