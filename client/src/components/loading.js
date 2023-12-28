"use client";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import "@/css/loading.css";
import { FaShippingFast } from "react-icons/fa";
export default function LoadLoad() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const containerWidth = document.querySelector(".container").offsetWidth;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: "100%" }],
          [scope.current, { x: containerWidth, width: "0%" }, { delay: 0.3 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        }
      );
    };
    animateLoader();
  }, []);

  return (
    <div id="loading">
      <div className="containerer">

        <h1 className="text">
          <i>MAGIC POST</i>
        </h1>
        <motion.div animate={{ x: 300 }} transition={{ ease: "easeOut", duration: 2 }} className="icon">
          <FaShippingFast size={'4em'} />
        </motion.div>
        <motion.div ref={scope} className="loader" />
      </div>
    </div>
  );
}
