import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// const credentials
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(req);
        const { username, password } = credentials;
        console.log(credentials);
        const data = {
          employeeID: username,
          password: password,
        };
        const url = "https://magicpost-uet.onrender.com/api/auth/login";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          console.log("thanh cong");
        } else console.log("sai");
        const user = await res.json();
        // return false;
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user);
      return true;
    },
    async jwt({ token, user }) {
      // if (user) {
      //   token.accessToken = user.accessToken;
      // }
      // console.log(user);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log("check user", user);
      // console.log("check token", token);
      session.accessToken = token.accessToken;
      session.user = token.user;
      // console.log(session);
      // console.log(session.accessToken);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
