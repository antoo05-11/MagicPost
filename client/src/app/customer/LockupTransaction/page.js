"use client";
import LookUpBanner from "@/components/customer/lookUpBanner";
import LookUpTransaction from "@/components/customer/lookUpTransaction";

export default function Transaction() {
  return (
    <div>
      <LookUpBanner title={"TRA CỨU BƯU CỤC"} />
      <LookUpTransaction />
    </div>
  );
}
