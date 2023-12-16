"use client";
import { TestTestTest } from "@/components/skeleton";
import { useState } from "react";

export default function page() {
  const [employee, setEmploye] = useState("Do Minh Duy");
  return (
    <div>
      <TestTestTest changeData={setEmploye} />
      <div>employee: {employee}</div>
    </div>
  );
}
