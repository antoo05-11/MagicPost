"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { usePathname, useRouter } from "next/navigation";
import Invoice from "./order/invoice";
export default function PopUp({
  isOpen,
  setIsOpen,
  functionCreate,
  dataCreate,
  print,
  setPrint,
}) {
  const pathname = usePathname();
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    setData(null);
    setTimeout(() => setConfirm(false), 1000);
  }, [isOpen]);
  return (
    <>
      <div className="disClick" data-isOpen={isOpen}></div>
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
                  setLoading(true);
                  setData(await functionCreate(dataCreate));
                  setConfirm(true);
                  setLoading(false);
                }}
              >
                {loading || "Xác nhận"}
                {loading && "Loading"}
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
            {data?.success && (
              <div>
                {/* <button
                  className="btn btn-primary btn-popup"
                  onClick={() => {
                    route.push(pathname.replace("/create", ""));
                  }}
                >
                  Trờ về trang trước
                </button> */}
                <button
                  className="btn btn-primary btn-popup"
                  onClick={() => {
                    setPrint(true);
                    setIsOpen(!isOpen);
                  }}
                >
                  In hóa đơn
                </button>
              </div>
            )}
            {data?.success || (
              <button
                className="btn btn-primary btn-popup"
                onClick={() => setIsOpen(!isOpen)}
              >
                Tạo lại
              </button>
            )}
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
      {print && <Invoice />}
    </>
  );
}
