"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { usePathname, useRouter } from "next/navigation";
import Invoice from "./order/invoice";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { GiConfirmed } from "react-icons/gi";
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
              <div>
                <div className="popupIcon confirm"><AiOutlineExclamationCircle size={'10em'} /></div>
                <div className="popupContent"><h3>Xác nhận tạo đơn hàng</h3></div>
                <div className="popupContent">
                  <p>Bạn sẽ không sửa thông tin đơn hàng sau khi tạo</p>
                </div>
              </div>
            )}
            {pathname.includes("list_employee") && (
              <div>
                <div className="popupIcon confirm"><AiOutlineExclamationCircle size={'10em'} /></div>
                <div className="popupContent">Xác nhận tạo nhân viên</div>
                <div className="popupContent">
                  <p>Một số thông tin sẽ không thể sửa sau khi tạo</p>
                </div>
              </div>
            )}
            <div className="popupContent">
              <button
                className="btn btn-danger btn-popup"
                onClick={async () => {
                  setLoading(true);
                  setData(await functionCreate(dataCreate));
                  setConfirm(true);
                  setLoading(false);
                }}
                disabled={loading ? true : false}
              >
                {loading || "Xác nhận"}
                {loading && "Loading"}
              </button>
              <button
                className="btn btn-outline-secondary btn-popup"
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading ? true : false}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
        {data?.data?.code ? (
          <div>
            <div>
              <div className="popupIcon error"><VscError size={"10em"} /></div>
              {createError[data?.data?.code]}
            </div>
          </div>
        ) : null}
        {data?.success && (
          <div>
            <div className="popupIcon success"> <GiConfirmed size={"10em"} /></div>
            <div className="popupContent">Tạo thành công</div>
          </div>
        )}
        {confirm && (
          <div className="popupContent">
            {data?.success && (
              <div>
                <button
                  className="btn btn-primary btn-popup"
                  onClick={() => {
                    route.push(pathname.replace("/create", ""));
                  }}
                >
                  Trờ về trang trước
                </button>
                {pathname.includes("list_ordered") && (
                  <button
                    className="btn btn-primary btn-popup"
                    onClick={() => {
                      setPrint(true);
                      setIsOpen(!isOpen);
                    }}
                  >
                    In hóa đơn
                  </button>
                )}
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
      </motion.div>
      {print && <Invoice />}
    </>
  );
}
