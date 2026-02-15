"use client";
import React, { useState } from "react";
import Gallery from "../detail/Gallery";
import Info from "../detail/Info";
import Specs from "../detail/Specs";
import BuyModal from "../detail/BuyModal";
import { Title } from "@/components/ui/text/Title";
import { IoCartOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const PrinterDetail = ({ data }: { data: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  /* ================= ADD TO LOCAL STORAGE ================= */

  const handleAddToCart = () => {
    if (typeof window === "undefined") return;

    const isAuthenticated = localStorage.getItem("access");

    if (!isAuthenticated) {
      toast.error(
        "⚠️ Пожалуйста, авторизуйтесь перед добавлением в корзину",
        { autoClose: 4000 }
      );
      return;
    }

    const existingBasket = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );

    const existingItem = existingBasket.find(
      (item: any) => item.product_id === data.id
    );

    let updatedBasket;

    if (existingItem) {
      updatedBasket = existingBasket.map((item: any) =>
        item.product_id === data.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedBasket = [
        ...existingBasket,
        {
          product_id: data.id,
          quantity: 1,
          product: data,
        },
      ];
    }

    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    toast.success("Товар добавлен в корзину 🛒");
  };

  return (
    <div className="container pt-[120px] pb-16">
      <ToastContainer theme="colored" />

      <div className="w-full py-5 md:px-5 flex flex-col gap-4 md:mb-[60px]">
        <Title>Подробнее о принтере</Title>

        <div className="w-full mt-3 flex md:flex-row flex-col gap-6">
          {/* Галерея */}
          <Gallery images={data.printer_image} name={data.name} />

          {/* Инфо */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <Info data={data} />

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 rounded-xl w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 transition"
              >
                <IoCartOutline size={20} />
                В корзину
              </button>

              <button
                onClick={() => {
                  const isAuthenticated =
                    typeof window !== "undefined" &&
                    localStorage.getItem("access");

                  if (!isAuthenticated) {
                    toast.error(
                      "⚠️ Пожалуйста, авторизуйтесь",
                      { autoClose: 3000 }
                    );
                    return;
                  }

                  setIsModalOpen(true);
                }}
                className="py-3 rounded-xl w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
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
