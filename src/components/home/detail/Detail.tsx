"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { Title } from "@/components/ui/text/Title";
import { Description } from "@/components/ui/text/Description";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Link from "next/link";
import { Name } from "@/components/ui/text/Name";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useDetailLaptopQuery } from "@/redux/api/laptop";
import { useParams } from "next/navigation";

const Detail = () => {
  const params = useParams();
  const id = Number(params?.id);
  const { data } = useDetailLaptopQuery(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!data) return null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <div className="w-full py-5 md:px-5 px-0 mt-[20px] flex flex-col gap-4 md:mb-[60px] mb-[10px]">
        <Title>Подробнее о ноутбуке</Title>
        <div className="w-full mt-3 flex md:flex-row flex-col gap-4">
          <div className="md:w-1/2 w-full h-fit md:sticky top-[100px] flex flex-col gap-1 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md">
            <div className="w-full h-[280px] md:h-full rounded-[10px] overflow-hidden">
              <a
                href={data.laptop_image?.[0]?.image ?? "/fallback.jpg"}
                data-fancybox="gallery"
                data-caption={data.name}
              >
                <Image
                  className="object-cover w-full h-full"
                  src={data.laptop_image?.[0]?.image ?? "/fallback.jpg"}
                  alt="product"
                  width={600}
                  height={400}
                />
              </a>
            </div>

            {/* Миниатюры */}
            <div className="flex gap-1 mt-2">
              {data.laptop_image?.slice(0, 3).map((img) => {
                const photoUrl = img.image ?? "/fallback.jpg";

                return (
                  <a
                    key={img.id}
                    href={photoUrl}
                    data-fancybox="gallery"
                    data-caption={data.name}
                    className="w-full h-[100px] rounded-[10px] overflow-hidden"
                  >
                    <Image
                      className="object-cover w-full h-full"
                      src={photoUrl}
                      alt="product"
                      width={150}
                      height={100}
                    />
                  </a>
                );
              })}

              {data.laptop_image && data.laptop_image.length > 3 && (
                <div className="w-full h-[100px] rounded-[10px] overflow-hidden bg-black flex justify-center items-center cursor-pointer text-white text-[22px] font-bold">
                  +{data.laptop_image.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Контент с описанием */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <div className="w-full flex flex-col justify-between rounded-[10px] gap-4 bg-white border border-gray-200 p-3 shadow-md">
              <div className="flex flex-col gap-2">
                <h1 className="text-[24px]">{data.name}</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Цена:</span> {data.price} сом
                </p>
                <h2>
                  <span className="text-gray-500">Гарантия:</span>{" "}
                  {data.warranty} месяцев
                </h2>
                <h2>
                  <span className="text-gray-500">Ссылка на видео: </span>
                  <Link
                    className=" text-blue-600"
                    href="https://www.instagram.com/p/DDAS6prsbe-/?img_index=1"
                  >
                    https://www.instagram.com/
                  </Link>
                </h2>

                <Description className="text-gray-600">
                  {data.description}
                </Description>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full h-[1px] bg-slate-400"></div>
                <div className="flex gap-2 mt-2">
                  <button className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
                    <IoCartOutline /> В корзину
                  </button>
                  <button
                    onClick={() => {
                      openModal();
                    }}
                    className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white"
                  >
                    Купить сейчас
                  </button>
                </div>
              </div>
            </div>
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
                <h1 className="text-[16px] font-[600]">Память</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Оперативная память:</span>
                  64GB DDR5
                </p>
                <p>
                  <span className="text-gray-500">Накопительная память:</span>
                  256GB SSD NVMe
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
                  <span className="text-gray-500">Модель:</span> Intel Graphics
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
                <h1 className="text-[16px] font-[600]">Физические параметры</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Ширина:</span> {data.width_mm}
                  мм
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Толщина:</span>{" "}
                  {data.thickness_mm} мм
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Вес:</span> от
                  {data.weight_kg} кг
                </p>
              </div>
            </div>
            ;
          </div>
        </div>

        {/* Модальное окно */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black px-2 bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white flex flex-col items-end rounded-lg p-4 w-full max-w-[800px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full items-center justify-between">
                <h2 className="text-xl font-semibold">Покупка ноутбука</h2>
                <button onClick={closeModal} className="text-[20px]">
                  <IoClose />
                </button>
              </div>

              <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
                <div className="md:w-1/2 flex flex-col gap-3">
                  <div className="relative w-full h-[240px] rounded-[10px] overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={data.laptop_image?.[0]?.image ?? "/fallback.jpg"}
                      width={600}
                      height={400}
                      alt="product"
                    />
                  </div>
                  <Name className="text-gray-800">{data.name}</Name>
                  <TitleComponent>{data.price} сом</TitleComponent>
                </div>

                <div className="md:w-1/2 flex flex-col gap-2">
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Имя"
                  />
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Телефон"
                  />
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Email"
                  />
                  <textarea
                    className="bg-white rounded-[10px] w-full h-[50%] py-2 px-3 outline-none border border-gray-400"
                    placeholder="Сообщение"
                  ></textarea>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Спасибо за покупку!");
                  closeModal();
                }}
                className="md:w-[30%] w-[100%] bg-[#141414] text-white py-2 mt-2 rounded-[10px]"
              >
                Отправить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
