"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useDetailLaptopQuery } from "@/redux/api/laptop";
import Gallery from "./Gallery";
import Info from "./Info";
import Specs from "./Specs";
import BuyModal from "./BuyModal";
import { Title } from "@/components/ui/text/Title";
import { IoCartOutline } from "react-icons/io5";



const Detail = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data } = useDetailLaptopQuery(slug);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  return (
    <div className="container">
      <div className="w-full py-5 md:px-5 mt-[20px] flex flex-col gap-4 md:mb-[60px]">
        <Title>Подробнее о ноутбуке</Title>
        <div className="w-full mt-3 flex md:flex-row flex-col gap-4">
          {/* Галерея */}
          <Gallery images={data.laptop_image} name={data.name} />

          {/* Инфо + кнопки */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <Info data={data} />
            <div className="flex gap-2">
              <button className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                <IoCartOutline /> В корзину
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white"
              >
                Купить сейчас
              </button>
            </div>
            <Specs data={data} />
          </div>
        </div>
      </div>

      {/* Модалка */}
      {isModalOpen && (
        <BuyModal
          data={data}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Detail;
