"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
library.add(fas);
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  // console.log("check session", session);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
