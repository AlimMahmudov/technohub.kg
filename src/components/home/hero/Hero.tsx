"use client";
import { useCard } from "@/components/ui/card/Card";
import { Name } from "@/components/ui/text/Name";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

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
          <Title>Ноутбуки в Бишкеке, Кыргызстане</Title>

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
                    <input type="checkbox" />
                    <h1>По возрастанию</h1>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" />
                    <h1>По убыванию</h1>
                  </div>
                </div>

                <div className="flex flex-col items-start mt-2">
                  <div className="flex gap-1">
                    <input type="checkbox" />
                    <h1>Сначало новинки</h1>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" />
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
          {card.map((el) => (
            <div
              key={el.id}
              className="bg-white flex  flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md"
            >
              <Link
                href={`/detail/${el.id}`}
                className="relative flex justify-start w-full h-[240px] rounded-[10px] overflow-hidden"
              >
                <Image
                  className="object-cover w-full h-full"
                  src={el.image}
                  alt="product"
                />
              </Link>
              <div className="flex flex-col gap-1">
                <Name className="text-gray-800">{el.text}</Name>
                <TitleComponent>{el.price} сом</TitleComponent>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
