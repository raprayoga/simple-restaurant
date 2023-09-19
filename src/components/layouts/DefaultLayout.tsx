import React from "react";
import Header from "@/components/modules/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mt-20 px-12">{children}</main>
    </>
  );
}
