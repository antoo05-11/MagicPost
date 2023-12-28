"use client";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import "@/css/loading.css";
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
        <motion.div ref={scope} className="loader" />
        <h1 className="text">
          <i>Magic Post</i>
        </h1>
      </div>
    </div>
  );
}
