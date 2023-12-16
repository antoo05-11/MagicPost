import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { employeeRole, listUrl } from "./api/utils";
export default withAuth(
  function middleware(req) {
    const leftURL = employeeRole[req.nextauth.token?.user.role].left;
    for (var i in leftURL) {
      if (req.nextUrl.pathname === listUrl[leftURL[i]].url) {
        return NextResponse.redirect(new URL("/employees", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log(token.accessToken);
      },
    },
  },
  {
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

export const config = { matcher: ["/employees/:path*"] };
