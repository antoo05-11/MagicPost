import "bootstrap/dist/css/bootstrap.min.css";
// import "@/css/components/sidebar.css";
import Script from "next/script";
// import { w3_open } from "../../../../public/static/script";
export default function SideBar() {
  const role = {
    president: {
      order_management: {
        path: "employee/",
      },
    },
  };
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
        <a href="/employees/list_employee" className="bar-item button">
          Danh sach nhan vien
        </a>
        <a href="#" class="bar-item button">
          Hang hoa
        </a>
        <a href="#" class="bar-item button">
          Link 3
        </a>
      </div>
    </div>
  );
}
