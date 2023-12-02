"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function SideBar({ role }) {
  const route = useRouter();
  return (
    <div>
      <div className="sidebar" id="mySidebar">
        <a href="/employees" className="bar-item" id="app-name">
          Magic Post
        </a>
        <button
          className="bar-item button large"
          id="button-close"
          onClick={() => {
            console.log(345);
            document.getElementById("main").style.width = "100%";
            document.getElementById("main").style.marginLeft = "0%";
            document.getElementById("mySidebar").style.width = "0%";
            document.getElementById("button-open").style.display = "inline";
          }}
        >
          Close &times;
        </button>
        <hr />
        {role?.map((roro) => {
          return (
            <div
              className="bar-item button"
              onClick={() => {
                route.push(roro?.url);
              }}
            >
              {roro?.name}
            </div>
          );
        })}

        <hr />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      {/* <script src="/static/script.js"></script> */}
    </div>
  );
}
