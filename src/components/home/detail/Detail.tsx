import Image from "next/image";
import React from "react";
import laptop from "@/shared/image/laptop.jpeg";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const Detail = () => {
  return (
    <div className="container">
      <div className="w-full py-5 px-5 mt-[20px] flex flex-col gap-4">
        <h1 className=" flex items-center gap-1 text-[20px] font-[600]">
          <FaArrowLeft />
          Объекты
          <span className="font-[100]">/ Об объекте</span>
        </h1>
        <div className="w-full mt-3 flex md:flex-row flex-col gap-4">
          <div className="w-full h-[500px] flex flex-col gap-1 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md">
            <div className="w-full h-full rounded-[10px] overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={laptop}
                alt="product"
              />
            </div>
            <div className="flex gap-1">
              <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={laptop}
                  alt="product"
                />
              </div>
              <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={laptop}
                  alt="product"
                />
              </div>
              <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={laptop}
                  alt="product"
                />
              </div>
              <div className="w-full h-[100px] rounded-[10px] overflow-hidden bg-black flex justify-center items-center">
                <h1 className="text-[22px] text-white">+5</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full h-full flex flex-col justify-between rounded-[10px] gap-4 bg-white border border-gray-200 p-3 shadow-md">
              <div className="flex flex-col gap-2">
                <h1 className=" text-[24px]">
                  Ноутбук Acer Aspire Lite AL16-52P-31UT Intel
                </h1>
                <h2 className=" text-[18px]">
                  <span className="text-gray-500">Цена:</span> 45200 сом
                </h2>
                <h2>
                  <span className="text-gray-500">Гарантия:</span> 12 месяцев
                </h2>
                <p className=" text-gray-600">
                  16&quot; IPS 1920x1200; процессор Intel Core i3-1305U;
                  оперативная память 64GB DDR5; накопитель 256GB SSD NVMe;
                  видеокарта Intel Graphics; без ОС
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full h-[1px] bg-slate-400"></div>
                <div className="flex gap-2 mt-2">
                  <button className="py-2 px-5 rounded-[10px] w-full  border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                    <MdFavoriteBorder />В понравившие
                  </button>
                  <button className="py-2 px-5 rounded-[10px] w-full  border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                    <IoCartOutline /> Купить
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col rounded-[10px] gap-2 bg-white border border-gray-200 p-3 shadow-md">
              <div className="">
                <h1 className="text-[16px] font-[600]">
                  Основные характеристики
                </h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Экран:</span> 16&quot; IPS
                  1920x1200 (WUXGA)
                </p>
                <p>
                  <span className="text-gray-500">Операционная система:</span>{" "}
                  нет
                </p>
              </div>

              <div className="">
                <h1 className="text-[16px] font-[600]">Процессор</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Модель:</span> Intel Core
                  i3-1305U
                </p>

                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Количество ядер/потоков:
                  </span>{" "}
                  5/6
                </p>

                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Максимальная тактовая частота:
                  </span>
                  4500 МГц
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Объем кэша:</span> 10 Мб
                </p>
              </div>

              <div className="">
                <h1 className="text-[16px] font-[600]">Видеокарта</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Модель:</span> Intel Graphics
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Объем видеопамяти:</span> SMA
                </p>
              </div>

              <div className="">
                <h1 className="text-[16px] font-[600]">Интерфейсы и порты</h1>
                <p className="text-[16px]">3 x USB Type-A</p>
                <p className="text-[16px]">1 x USB Type-С</p>
                <p className="text-[16px]">1 х HDMI</p>
                <p className="text-[16px]">1 x Audio 3.5 mm</p>
              </div>

              <div className="">
                <h1 className="text-[16px] font-[600]">
                  Дополнительные спецификации
                </h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Подсветка клавиатуры:</span>{" "}
                  нет
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Сканер отпечатка пальца:
                  </span>
                  нет
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Емкость аккумулятора:</span>{" "}
                  58 ВтЧ
                </p>
              </div>

              <div className="">
                <h1 className="text-[16px] font-[600]">
                  Физические характеристики
                </h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Размеры:</span> 358 х 247 х
                  18.9 мм
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Вес:</span> от 1.7 кг
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
