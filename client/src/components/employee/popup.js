"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { usePathname } from "next/navigation";
export default function PopUp({
  isOpen,
  setIsOpen,
  functionCreate,
  dataCreate,
}) {
  const pathname = usePathname();
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState();
  useEffect(() => {
    setData(null);
    setTimeout(() => setConfirm(false), 1000);
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
            {pathname.includes("list_ordered") && (
              <div className="popupContent">Chắc chắn tạo đơn hàng</div>
            )}
            {pathname.includes("list_employee") && (
              <div className="popupContent">Chắc chắn tạo nhân viên</div>
            )}
            <div className="popupContent">
              <button
                className="btn btn-primary btn-popup"
                onClick={async () => {
                  setData(await functionCreate(dataCreate));
                  setConfirm(true);
                }}
              >
                Xác nhận
              </button>
              <button
                className="btn btn-primary btn-popup"
                onClick={() => setIsOpen(!isOpen)}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
        {confirm && (
          <div className="popupContent">
            <button
              className="btn btn-primary btn-popup"
              onClick={() => setIsOpen(!isOpen)}
            >
              Đóng
            </button>
          </div>
        )}
        {/* <button
          onClick={() => {
            console.log(dataCreate);
          }}
        >
          Test
        </button> */}
        {data?.success || <div>{createError[data?.data?.code]}</div>}
        {data?.success && <div>Tao thanh cong</div>}
      </motion.div>
    </>
  );
}
