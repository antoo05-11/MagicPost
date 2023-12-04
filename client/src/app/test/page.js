"use client";
import { login } from "@/api/action";
import { getEmployee } from "@/api/data";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
export default function Page() {
  const variant = {
    initial: { opacity: 0.1 },
    whileHover: {
      scale: 1.2,
      transition: { duration: 1 },
    },
    whileTap: { scale: 0.9 },
    whileInView: { opacity: 1 },
  };
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const animation = async () => {
      await animate(scope.current, { x: "100%" });
      animate("li", { opacity: 1 });
    };
  });
  return (
    <div>
      <svg height="500" width="500">
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill="red"
          animate="animate"
          variants={{ variant }}
          // animate={{ cx: [null, 100, 200] }}
          // transition={{ duration: 3, times: [0, 0.2, 1] }}
        />
      </svg>
      <button>hihi</button>
    </div>
  );
}
