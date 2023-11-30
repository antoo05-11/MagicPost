"use client";

// import AppHeader from "@/components/header";
import { Inter } from "next/font/google";
import { Container, Navbar } from "react-bootstrap";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { AuthProvider } from "./Providers";
library.add(fas);
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
