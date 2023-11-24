import "bootstrap/dist/css/bootstrap.min.css";
// import "@/css/components/sidebar.css";
import Script from "next/script";
// import { w3_open } from "../../../../public/static/script";
export default function SideBar({ role }) {
  return (
    <div>
      {/* <button id="openNav" class="button teal xlarge">
        &#9776;
      </button> */}
      <div className="sidebar" id="mySidebar">
        <a href="/employees" className="bar-item" id="app-name">
          Magic Post
        </a>
        <hr />
        {role?.map((roro) => {
          return (
            <a href={roro?.url} className="bar-item button">
              {roro?.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
