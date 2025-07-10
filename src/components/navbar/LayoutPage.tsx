"use client";
import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Menu from "./menu/Menu";

interface LayoutPageProps {
  children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-[#f3f2f2]">
      <Header />
      <div className="flex">
        <Menu />
        <main className="w-full bg-[#f3f2f2]">{children}</main>
      </div>
    </div>
  );
};

export default LayoutPage;
