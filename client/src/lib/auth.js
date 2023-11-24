import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// const credentials
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log(credentials);
        const user = { id: "1" };
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = true;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log(isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  //   secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
