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

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IContact {
  link: string;
  phone_number: string;
  full_name: string;
  description: string;
}

const Detail = () => {
  const params = useParams();
  const id = Number(params?.id);
  const { data } = useDetailLaptopQuery(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<IContact>();

  const onSubmit: SubmitHandler<IContact> = async (formData) => {
    const dataWithLink = {
      ...formData,
      link: "https://github.com/AlimMahmudov/technohub.kg",
    };

    try {
      await axios.post("http://16.170.143.10/store/order/", dataWithLink);
      reset(); // сброс формы
      toast.success("Форма успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      closeModal(); // закрыть модалку
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      toast.error("Произошла ошибка при отправке формы.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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
              {data.laptop_image?.slice(0, 2).map((img, index) => {
                const photoUrl = img.image ?? "/fallback.jpg";
                return (
                  <div key={img.id} className="w-full">
                    <a
                      href={photoUrl}
                      data-fancybox="gallery"
                      data-caption={`${data.name} — Фото ${index + 1}`}
                      className="block w-full h-[100px] rounded-[10px] overflow-hidden"
                    >
                      <Image
                        className="object-cover w-full h-full"
                        src={photoUrl}
                        alt={`Фото ${index + 1}`}
                        width={150}
                        height={100}
                      />
                    </a>
                    <p className="text-xs text-center mt-1 text-gray-600">
                      Фото {index + 1}
                    </p>
                  </div>
                );
              })}

              {data.laptop_image && data.laptop_image.length > 2 && (
                <div className="relative w-full h-[100px] rounded-[10px] overflow-hidden cursor-pointer">
                  <a
                    href={data.laptop_image[2].image ?? "/fallback.jpg"}
                    data-fancybox="gallery"
                    data-caption={`${data.name} — Фото 3`}
                    className="block w-full h-full"
                  >
                    <Image
                      className="object-cover w-full h-full brightness-50"
                      src={data.laptop_image[2].image ?? "/fallback.jpg"}
                      alt="Еще фото"
                      width={150}
                      height={100}
                    />
                    <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-xl">
                      +{data.laptop_image.length - 2}
                    </div>
                  </a>

                  {/* Остальные изображения — невидимые, но доступны в Fancybox */}
                  {data.laptop_image.slice(3).map((img, idx) => (
                    <a
                      key={img.id}
                      href={img.image ?? "/fallback.jpg"}
                      data-fancybox="gallery"
                      data-caption={`${data.name} — Фото ${idx + 4}`}
                      className="hidden"
                    />
                  ))}
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
                {data.link && (
                  <h2>
                    <span className="text-gray-500">Ссылка на видео: </span>
                    <Link className=" text-blue-600" href={data.link}>
                      {data.link}
                    </Link>
                  </h2>
                )}
                <h2>
                  <span className="text-gray-500">Артикул:</span>{" "}
                  {data.articles}
                </h2>
                {!data.in_composition && (
                  <h2>
                    <span className="text-gray-500">На складе:</span> Есть
                  </h2>
                )}
                {!data.in_stock && (
                  <h2>
                    <span className="text-gray-500">В наличии:</span> Есть
                  </h2>
                )}
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
                    onClick={openModal}
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
                  <span className="text-gray-500">Бренд:</span> {data.brand}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Размер экрана (дюймы):</span>{" "}
                  {data.screen_size}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Тип экрана:</span>{" "}
                  {data.screen_type}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Разрешение экрана:</span>{" "}
                  {data.resolution}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Частота обновления (Гц):
                  </span>{" "}
                  {data.refresh_rate} Гц
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Память</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Оперативная память (ГБ):
                  </span>{" "}
                  {data.ram_size_gb} ГБ
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Объем SSD (ГБ):</span>{" "}
                  {data.storage_size_gb} ГБ
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Тип накопителя:</span>{" "}
                  {data.storage_type}
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Процессор</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Модель процессора:</span>{" "}
                  {data.cpu_model}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Количество ядер:</span>{" "}
                  {data.cpu_cores}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Количество потоков:</span>{" "}
                  {data.cpu_threads}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Макс. частота процессора (МГц):
                  </span>{" "}
                  {data.cpu_frequency_mhz} МГц
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Видеокарта</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Модель видеокарты:</span>{" "}
                  {data.gpu_model}
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Сети</h1>

                <p className="text-[16px]">
                  <span className="text-gray-500">Ethernet:</span>{" "}
                  {data.ethernet ? "Есть" : "Нет"}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Bluetooth:</span>{" "}
                  {data.bluetooth ? "Есть" : "Нет"}
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Порты</h1>

                <p className="text-[16px]">
                  <span className="text-gray-500">HDMI:</span>{" "}
                  {data.hdmi_count ? "Есть" : "Нет"}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Ethernet-порт:</span>{" "}
                  {data.ethernet_port ? "Есть" : "Нет"}
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Аудиоразъём:</span>{" "}
                  {data.audio_jack ? "Есть" : "Нет"}
                </p>
              </div>

              <div>
                <h1 className="text-[16px] font-[600]">Дополнительно</h1>
                <p className="text-[16px]">
                  <span className="text-gray-500">Подсветка клавиатуры:</span>{" "}
                  {data.keyboard_backlight ? "Есть" : "Нет"}
                </p>

                <p className="text-[16px]">
                  <span className="text-gray-500">
                    Емкость аккумулятора (Вт·ч):
                  </span>{" "}
                  {data.battery_capacity_wh} Вт·ч
                </p>
                <p className="text-[16px]">
                  <span className="text-gray-500">Операционная система:</span>{" "}
                  {data.operating_system}
                </p>
              </div>
            </div>
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

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-1/2 flex flex-col items-end gap-2"
                >
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Имя"
                    {...register("full_name", { required: true })}
                  />

                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="tel"
                    placeholder="Телефон"
                    {...register("phone_number", {
                      required: true,
                      pattern: /^\+996\d{9}$/,
                    })}
                    defaultValue="+996"
                  />

                  <textarea
                    className="bg-white rounded-[10px] w-full h-[50%] py-2 px-3 outline-none border border-gray-400"
                    placeholder="Сообщение"
                    {...register("description", { required: true })}
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#141414] text-white py-2 mt-2 rounded-[10px]"
                  >
                    Отправить!
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Detail;
