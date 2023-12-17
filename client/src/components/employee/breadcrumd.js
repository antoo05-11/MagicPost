"use client";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { listUrl } from "@/api/utils";
import { useEffect } from "react";
import { BreadcrumbItem } from "react-bootstrap";

// const listItem = ["hihi"];
export default function BreadCrumb() {
  const pathname = usePathname();
  const listItem = ["homepage"];
  if (pathname.includes("list_ordered")) {
    listItem.push("manageOrders");
    if (pathname.includes("create")) {
      listItem.push("createOrder");
    } else if (pathname.includes("detail")) {
      listItem.push("detailOrder");
    }
  } else if (pathname.includes("list_employee")) {
    listItem.push("manageEmployees");
    if (pathname.includes("create")) {
      listItem.push("createEmployee");
    } else if (pathname.includes("detail")) {
      listItem.push("detailEmployee");
    }
  } else if (pathname.includes("list_transaction")) {
    listItem.push("manageTransactionPoint");
  } else if (pathname.includes("list_workspace")) {
    listItem.push("manageGoodsPoint");
  }
  const route = useRouter();
  return (
    <Breadcrumb>
      {listItem.map((e) => {
        return (
          <BreadcrumbItem
            onClick={() => {
              route.push(listUrl[e]?.url);
            }}
          >
            {listUrl[e]?.name}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
