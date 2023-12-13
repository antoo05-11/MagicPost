import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const role = [
  "GOODS_POINT_EMPLOYEE",
  "GOODS_POINT_HEAD",
  "MANAGER",
  "TRANSACTION_POINT_EMPLOYEE",
  "TRANSACTION_POINT_HEAD",
];
export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.user.role;

    if (req.nextUrl.pathname.startsWith("/login")) {
      // console.log(123);
      //   NextResponse.redirect(new URL("/"));
      //   return NextResponse.rewrite(new URL(`/employees`));
      return NextResponse.redirect(new URL("/employees", req.url));
    }
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

export const config = { matcher: ["/dashboard",  "/test"] };
