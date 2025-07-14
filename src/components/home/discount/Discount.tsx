"use client";
import { useCard } from "@/components/ui/card/Card";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const Discount = () => {
  const { discount } = useCard();

  return (
    <div className="container">
      <div className="w-full md:px-5 px-0 mt-[20px] relative">
        <div className="w-full gap-1   rounded-[10px]   p-0 md:p-3 flex items-center justify-between flex-wrap">
          <h1 className="text-[23px] font-semibold">Скидки на ноутбуки</h1>
        </div>
      </div>
      <div className="w-full py-5 md:px-5 px-0">
        <div className="flex overflow-x-auto gap-[10px] w-full pb-2 scroll-smooth scroll-snap-x">
          {discount.map((el) => (
            <div
              key={el.id}
              className="min-w-[280px] sm:min-w-[350px] bg-white flex flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md scroll-snap-start"
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
                <div className="absolute mt-2 ml-2 px-2 rounded-[10px] bg-red-500 text-white text-[18px] font-[600]">
                  <h1 className="flex items-center">{el.procent}%</h1>
                </div>
              </Link>

              <div className="flex flex-col gap-1">
                <Description className="text-gray-800">{el.text}</Description>
                <div className="flex items-center gap-3">
                  <h2 className="text-[18px] font-[600] text-red-500">
                    {el.price}cом
                  </h2>
                  <h2 className="text-[14px] font-[600] text-gray-500 line-through decoration-gray-500 decoration-[1px]">
                    {el.discount}cом
                  </h2>
                </div>
                <div className="flex gap-1 flex-wrap">
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

              <div>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discount;
