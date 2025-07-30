"use client";
import { FC, ReactNode } from "react";
import Header from "./header/Header";
import { usePathname } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";
import { FaWhatsapp } from "react-icons/fa";
import { useGetContactQuery } from "@/redux/api/contact";
import Link from "next/link";

interface LayoutPageProps {
  children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
  const pathname = usePathname();
  const { data } = useGetContactQuery();

  const isAuthPage =
    pathname === PAGE.LOGIN ||
    pathname === PAGE.REGISTER ||
    pathname === PAGE.FORGOT ||
    pathname === PAGE.CONFIRM;

  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-[#f3f2f2]">
      {!isAuthPage && <Header />}
      <div className="flex w-full">
        <main
          className={`w-full bg-[#f3f2f2] ${
            isAuthPage ? "md:w-[100%]" : "md:w-[100%]"
          }`}
        >
          {children}
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative w-[50px] h-[50px] flex justify-center items-center">
          <span className="absolute inline-flex h-[80%] w-[80%] rounded-full bg-green-500 opacity-75 animate-ping"></span>
          <button
            className="relative w-full h-full rounded-full bg-green-500 text-white flex items-center justify-center text-[35px] shadow-lg"
            aria-label="WhatsApp"
          >
            {data?.map((el) => (
              <Link
                key={el.id}
                target="_blank"
                href={el.whatsapp[0]?.whatsapp || "#"}
              >
                <FaWhatsapp />
              </Link>
            ))}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
