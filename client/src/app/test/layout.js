"use client";
import { SWRConfig } from "swr";
export default function Layout({ children, params }) {
  return (
    <section>
      {/* <SWRConfig
        value={{
          // refreshInterval: 3000,
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
      > */}
      {children}
      {/* </SWRConfig> */}
    </section>
  );
}
