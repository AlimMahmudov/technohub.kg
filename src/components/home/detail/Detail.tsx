"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { Title } from "@/components/ui/text/Title";
import { Description } from "@/components/ui/text/Description";
import { useCard } from "@/components/ui/card/Card";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Detail = () => {
  const { detail } = useCard();

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!detail) return null;

  return (
    <div className="container">
      {detail.map((el) => (
        <div
          key={el.id}
          className="w-full py-5 md:px-5 px-0 mt-[20px] flex flex-col gap-4 md:mb-[60px] mb-[10px]"
        >
          <Title>Подробнее о ноутбуке</Title>
          <div className="w-full mt-3 flex md:flex-row flex-col gap-4">
            {/* Sticky блок с изображениями */}
            <div className="md:w-1/2 w-full h-fit md:sticky top-[100px] flex flex-col gap-1 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md">
              {/* Главная большая картинка */}
              <div className="w-full h-[280px] md:h-full rounded-[10px] overflow-hidden">
                <a
                  href={typeof el.image === "string" ? el.image : el.image.src}
                  data-fancybox="gallery"
                  data-caption={el.text}
                >
                  <Image
                    className="object-cover w-full h-full"
                    src={el.image}
                    alt="product"
                    width={600}
                    height={400}
                  />
                </a>
              </div>

              {/* Миниатюры */}
              <div className="flex gap-1 mt-2">
                {el.images.slice(0, 3).map((img) => (
                  <a
                    key={img.id}
                    href={
                      typeof img.photo === "string" ? img.photo : img.photo.src
                    }
                    data-fancybox="gallery"
                    data-caption={el.text}
                    className="w-full h-[100px] rounded-[10px] overflow-hidden"
                  >
                    <Image
                      className="object-cover w-full h-full"
                      src={img.photo}
                      alt="product"
                      width={150}
                      height={100}
                    />
                  </a>
                ))}

                {el.images.length > 3 && (
                  <div className="w-full h-[100px] rounded-[10px] overflow-hidden bg-black flex justify-center items-center cursor-pointer text-white text-[22px] font-bold">
                    +{el.images.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Контент с описанием */}
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <div className="w-full flex flex-col justify-between rounded-[10px] gap-4 bg-white border border-gray-200 p-3 shadow-md">
                <div className="flex flex-col gap-2">
                  <h1 className="text-[24px]">{el.text}</h1>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Цена:</span> {el.price} сом
                  </p>
                  <h2>
                    <span className="text-gray-500">Гарантия:</span>{" "}
                    {el.garantee} месяцев
                  </h2>
                  <Description className="text-gray-600">
                    {el.description}
                  </Description>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-[1px] bg-slate-400"></div>
                  <div className="flex gap-2 mt-2">
                    <button className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                      <MdFavoriteBorder /> В понравившие
                    </button>
                    <button className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                      <IoCartOutline /> Купить
                    </button>
                  </div>
                </div>
              </div>

              {/* Характеристики */}
              <div className="w-full flex flex-col rounded-[10px] gap-2 md:bg-white bg-transparent md:border border-none border-gray-200 p-3 md:shadow-md">
                <div>
                  <h1 className="text-[16px] font-[600]">
                    Основные характеристики
                  </h1>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Экран:</span> 16&quot; IPS
                    1920x1200 (WUXGA)
                  </p>
                  <p>
                    <span className="text-gray-500">ОС:</span> нет
                  </p>
                </div>

                <div>
                  <h1 className="text-[16px] font-[600]">Процессор</h1>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Модель:</span> Intel Core
                    i3-1305U
                  </p>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Ядер/потоков:</span> 5/6
                  </p>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Частота:</span> 4500 МГц
                  </p>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Кэш:</span> 10 Мб
                  </p>
                </div>

                <div>
                  <h1 className="text-[16px] font-[600]">Видеокарта</h1>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Модель:</span> Intel
                    Graphics
                  </p>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Видео память:</span> SMA
                  </p>
                </div>

                <div>
                  <h1 className="text-[16px] font-[600]">Интерфейсы и порты</h1>
                  <p className="text-[16px]">3 x USB Type-A</p>
                  <p className="text-[16px]">1 x USB Type-C</p>
                  <p className="text-[16px]">1 x HDMI</p>
                  <p className="text-[16px]">1 x Audio 3.5 мм</p>
                </div>

                <div>
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
                    </span>{" "}
                    нет
                  </p>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Батарея:</span> 58 ВтЧ
                  </p>
                </div>

                <div>
                  <h1 className="text-[16px] font-[600]">
                    Физические параметры
                  </h1>
                  <p className="text-[16px]">
                    <span className="text-gray-500">Размеры:</span> 358 x 247 x
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
      ))}
    </div>
  );
};

export default Detail;
