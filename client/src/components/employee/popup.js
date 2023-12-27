"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
export default function PopUp({
  isOpen,
  setIsOpen,
  functionCreate,
  dataCreate,
}) {
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState();
  useEffect(() => {
    setData(null);
    setConfirm(false);
  }, [isOpen]);
  return (
    <>
      <div
        className="disClick"
        data-isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <motion.div layout className="popup" data-isOpen={isOpen}>
        {confirm || (
          <div>
            <button
              onClick={async () => {
                setData(await functionCreate(dataCreate));
                setConfirm(true);
              }}
            >
              Xac nhan
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>close</button>
          </div>
        )}
        {confirm && (
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>close</button>
          </div>
        )}
        <button
          onClick={() => {
            console.log(confirm);
          }}
        >
          Test
        </button>
        {data?.success || <div>{createError[data?.data?.code]}</div>}
        {data?.success && <div>Tao thanh cong</div>}
      </motion.div>
    </>
  );
}
