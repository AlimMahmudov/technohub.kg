"use client";

import React, { useState } from "react";
import Gallery from "./Gallery";
import Info from "./Info";
import Specs from "./Specs";
import BuyModal from "./BuyModal";
import { Title } from "@/components/ui/text/Title";
import { toast, ToastContainer } from "react-toastify";

const LaptopDetail = ({ data }: { data: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= ADD TO LOCAL STORAGE ================= */

  return (
    <div className="container pt-[120px] pb-16">
      <ToastContainer theme="colored" />

      <div className="w-full py-5 md:px-5 flex flex-col gap-4 md:mb-[60px]">
        <Title>Подробнее о ноутбуке</Title>

        <div className="w-full mt-3 flex md:flex-row flex-col gap-6">
          {/* Галерея */}
          <Gallery images={data.laptop_image} name={data.name} />

          {/* Инфо + кнопки */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <Info data={data} />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const isAuthenticated =
                    typeof window !== "undefined" &&
                    localStorage.getItem("access");

                  if (!isAuthenticated) {
                    toast.error("⚠️ Пожалуйста, авторизуйтесь", {
                      autoClose: 3000,
                    });
                    return;
                  }

                  setIsModalOpen(true);
                }}
                className="py-3 rounded-xl w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 transition"
              >
                Купить сейчас
              </button>
            </div>

            <Specs data={data} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BuyModal data={data} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default LaptopDetail;
