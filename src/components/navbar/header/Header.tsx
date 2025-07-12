"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import BurgerMenu from "./BurgerMenu";

import { AiOutlineMenu } from "react-icons/ai";
import { navbar } from "@/lib/data";
// import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="w-full  bg-transparent ">
      <div className="   flex items-center z-50 w-full h-[60px] bg-[#141414]">
        <div className="container">
          <div className="flex justify-between py-2 items-center">
            <div className="flex items-center  justify-between   w-full">
              <div className="md:hidden text-white flex w-full">
                <button
                  onClick={toggleBox}
                  className="flex items-center justify-center text-[26px] font-[800]"
                >
                  <AiOutlineMenu />
                </button>
              </div>

              <Link
                href={PAGE.HOME}
                className="text-[#999999]  text-[24px] w-full  text-center md:text-start "
              >
                TECHNOHUB
              </Link>

              <div className="md:flex hidden gap-6 justify-center  w-full">
                {navbar.map((el, index) => (
                  <Link
                    key={index}
                    href={el.href}
                    className="text-[14px] text-white  font-[400]  "
                  >
                    {el.name}
                  </Link>
                ))}
              </div>

              <div className="flex gap-2 w-full justify-end  ">
                {/* <button className="text-white bg-[#64646469] px-2 p-2 text-[20px] rounded-[6px]">
                  <MdFavoriteBorder />
                </button> */}
                <button className="text-white bg-[#64646469] p-2 text-[20px] rounded-[6px]">
                  <Link href="/basket">
                    <IoCartOutline />
                  </Link>
                </button>
                <button className="text-white md:flex hidden text-[14px] bg-[#64646469] p-1 px-2   justify-center items-center gap-2 rounded-[6px]">
                  Войти <RiUserLine size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
