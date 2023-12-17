"use client";

import "@/app/globals.css";
import { Lexend } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  // console.log("check session", session);
  return (
    <html lang="en">
      <body className={lexend.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
