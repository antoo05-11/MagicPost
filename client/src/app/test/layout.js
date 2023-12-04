// import SideBar from "@/components/employee/sidebar/sidebar";
import Script from "next/script";
// import "@/css/components/sidebar.css";

const president = ["Danh sach nhan vien", "Hang hoa"];
export default function Layout({ children, params }) {
  return (
    <section>
      {/* <SideBar role={president} /> */}
      {children}
    </section>
  );
}
