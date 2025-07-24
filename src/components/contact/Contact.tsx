"use client";
import React from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import Link from "next/link";
import { useGetContactQuery } from "@/redux/api/contact";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface IContact {
  phone_number: string;
  full_name: string;
  email: string;
  description: string;
}

const Contact = () => {
  const { data } = useGetContactQuery();
  const { register, handleSubmit, reset } = useForm<IContact>();

  const onSubmit: SubmitHandler<IContact> = async (data) => {
    try {
      await axios.post("http://16.170.143.10/store/service-callback/", data);
      reset();
      alert("Форма успешно отправлена!");
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Произошла ошибка при отправке формы.");
    }
  };
  return (
    <>
      <section className="pb-10">
        <div className="container">
          <div className="w-full py-2 md:px-5 px-0 md:py-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  <p>свяжитесь с нами</p>
                  <Title>
                    мы всегда готовы помочь вам и ответить на ваши вопросы
                  </Title>
                </div>

                {data?.map((el) => (
                  <div
                    key={el.id}
                    className="grid grid-cols-2 md:grid-cols-2 gap-4"
                  >
                    <div className="flex flex-col items-start gap-1 px-3">
                      <TitleComponent>Наши контакты</TitleComponent>
                      <button>{el.phone_number[0]?.phone_number}</button>
                    </div>

                    <div className="flex flex-col gap-1 px-3">
                      <TitleComponent>Адрес офиса</TitleComponent>
                      <p>{el.address}</p>
                    </div>

                    <div className="flex flex-col gap-1 px-3">
                      <TitleComponent>Email</TitleComponent>
                      <p>{el.email}</p>
                    </div>

                    <div className="flex flex-col gap-1 px-3">
                      <TitleComponent>Соц. сети</TitleComponent>
                      <div className="flex gap-2 text-[22px]">
                        <Link
                          target="_blank"
                          href={el.whatsapp[0]?.whatsapp || "#"}
                        >
                          <FaWhatsapp />
                        </Link>
                        <Link
                          target="_blank"
                          href={el.instagram[0]?.instagram || "#"}
                        >
                          <FaInstagram />
                        </Link>
                        <Link
                          target="_blank"
                          href={el.telegram[0]?.telegram || "#"}
                        >
                          <PiTelegramLogo />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full h-full bg-white rounded-[10px] flex flex-col items-center gap-4 justify-between border border-gray-300 p-3">
                <div className="w-full flex text-center flex-col items-center">
                  <TitleComponent>Оставьте заявку!...</TitleComponent>
                  <p className="text-gray-500">
                    Наши менеджеры свяжутся с вами в ближайшее время
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col items-center gap-2"
                >
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Имя"
                    {...register("full_name", { required: true })}
                  />
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Телефон"
                    {...register("phone_number", { required: true })}
                  />
                  <input
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <textarea
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    placeholder="Сообщения"
                    {...register("description", { required: true })}
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="w-full py-1 md:px-5 px-0">
            <div className="p-1 mt-[14px] bg-[#b4b4b4] rounded-xl">
              <div className="map">
                <iframe
                  src="/map.html"
                  frameBorder="0"
                  scrolling="no"
                  title="Map on 2GIS"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
