"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SWRConfig } from "swr";
export default function Layout({ children, params }) {
  return (
    <section>
      <Link href={"/test/page1"}>page 1</Link>
      <Link href={"/test/page2"}>page 2</Link>
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
      >
        {children}
      </SWRConfig>
      {/* </SWRConfig> */}
    </section>
  );
}
