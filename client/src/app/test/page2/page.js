"use client";
import PopUp from "@/components/employee/popup";
import { useState } from "react";
import { motion } from "framer-motion";
export default function page() {
  const [open, setOpen] = useState(true);
  return (
    <motion.div layout>
      <PopUp isOpen={open} setIsOpen={setOpen} />
      <button onClick={() => setOpen(!open)}>Hihi</button>
    </motion.div>
  );
}
