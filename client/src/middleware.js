import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/login")) {
      console.log(123);
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
        // console.log("hihi");
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

export const config = { matcher: ["/dashboard", "/employees"] };
