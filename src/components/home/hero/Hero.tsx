"use client";
import { useCard } from "@/components/ui/card/Card";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";

const Hero = () => {
  const { card } = useCard();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <div className="w-full md:px-5 px-0 mt-[20px] relative">
        <div className="w-full gap-1   rounded-[10px]   p-0 md:p-3 flex items-center justify-between flex-wrap">
          <h1 className="text-[23px] font-semibold">
            Ноутбуки в Бишкеке, Кыргызстане
          </h1>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-[10px] md:mt-0 mt-2 bg-[#141414] text-white shadow-sm text-[14px] px-3 flex items-center gap-1"
            >
              Сортировка{" "}
              <BiSortAlt2
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div
                ref={ref}
                className="absolute md:right-0 mt-2 w-[200px] bg-white border border-gray-200 shadow-md rounded-[10px] z-50 p-3 text-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Сортировка</span>
                  <button
                    onClick={() => {
                      console.log("Очистить сортировку");
                    }}
                    className="text-blue-500 text-xs"
                  >
                    Очистить
                  </button>
                </div>

                <div className="flex flex-col items-start">
                  <p className="font-[600]">Цена</p>
                  <div className="flex gap-1">
                    <input type="radio" />
                    <h1>По возрастанию</h1>
                  </div>
                  <div className="flex gap-1">
                    <input type="radio" />
                    <h1>По убыванию</h1>
                  </div>
                </div>

                <div className="flex flex-col items-start mt-2">
                  <div className="flex gap-1">
                    <input type="radio" />
                    <h1>Сначало новинки</h1>
                  </div>
                  <div className="flex gap-1">
                    <input type="radio" />
                    <h1>Сначало популярные</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full py-5 md:px-5 px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-[10px] w-full">
          {card.map((el, index) => (
            <Link key={index} href={`/detail/${el.id}`}>
              <div className="bg-white flex  flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md">
                <div className="w-full h-[240px] rounded-[10px] overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={el.image}
                    alt="product"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Description className="text-gray-800">{el.text}</Description>
                  <h2 className="text-[18px] font-[600] text-black">
                    {el.price} сом
                  </h2>
                  <div className="flex gap-1">
                    <div className="bg-slate-200 px-[10px] py-[2px] rounded-[10px] text-[14px]">
                      <h1>{el.brend}</h1>
                    </div>
                    <div className="bg-slate-200 px-[10px] py-[2px] rounded-[10px] text-[14px]">
                      <h1>{el.processor}</h1>
                    </div>
                    <div className="bg-slate-200 px-[10px] py-[2px] rounded-[10px] text-[14px]">
                      <h1>{el.model}</h1>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <div className="flex gap-1 mt-1">
                    <button className="w-full py-2 p-1 mt-2 text-[14px] bg-black text-white rounded-[10px]">
                      В корзину
                    </button>
                    <button className="w-[20%] py-2 flex justify-center items-center mt-2 bg-black text-white rounded-[10px]">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full p-5">
        <div className="flex items-center justify-center gap-1">
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-gray-300">
            <FaChevronLeft />
          </button>
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border bg-blue-500 text-white border-gray-300">
            1
          </button>
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-gray-300">
            2
          </button>
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-gray-300">
            ...
          </button>
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-gray-300">
            5
          </button>
          <button className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-gray-300">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
