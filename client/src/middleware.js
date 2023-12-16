import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { employeeRole } from "./api/utils";
export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.user.role;

    if (req.nextUrl.pathname.startsWith("/dashboard"))
      return NextResponse.rewrite(new URL("/login?message=You Fail", req.url));
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
