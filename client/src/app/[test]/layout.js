import SideBar from "@/components/employee/sidebar/sidebar";
import Script from "next/script";
import "@/css/components/sidebar.css";

export default function Layout({ children, params }) {
  //   console.log(params.test);
  return (
    <section>
      {/* <SideBar /> */}
      {children}
    </section>
  );
}
