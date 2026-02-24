"use client";
import React, { useState } from "react";
import Gallery from "../detail/Gallery";
import Info from "../detail/Info";
import BuyModal from "../detail/BuyModal";
import { Title } from "@/components/ui/text/Title";
import { toast, ToastContainer } from "react-toastify";

const PrinterDetail = ({ data }: { data: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  /* ================= ADD TO LOCAL STORAGE ================= */

  return (
    <div className="container pt-[120px] pb-16">
      <ToastContainer theme="colored" />

      <div className="w-full py-5 md:px-5 flex flex-col gap-4 md:mb-[60px]">
        <Title>Подробнее о принтере</Title>

        <div className="w-full mt-3 flex md:flex-row flex-col gap-6 ">
          {/* Галерея */}
          <Gallery images={data.printer_image} name={data.name} />

          {/* Инфо */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <Info data={data} />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="py-3 rounded-xl w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 transition"
              >
                Купить сейчас
              </button>
            </div>

            {/* <Specs data={data} /> */}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BuyModal data={data} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default PrinterDetail;
