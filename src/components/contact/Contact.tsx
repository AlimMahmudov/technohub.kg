"use client";
import React from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import Link from "next/link";
import { useGetContactQuery } from "@/redux/api/contact";

const Contact = () => {
  const { data } = useGetContactQuery();
  return (
    <>
      <section>
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
                <div className="w-full flex flex-col items-center gap-2">
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
                    className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                    placeholder="Сообщения"
                  ></textarea>
                  <button className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-2 md:px-5 px-0">
            <div className="p-3 mt-[14px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.670201784028!2d74.58255517621372!3d42.879804671149365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9ba3daadfbb%3A0x4e7a5fa037f5fd93!2sMotion%20Web%20IT%20academy!5e0!3m2!1sru!2skg!4v1752249259961!5m2!1sru!2skg"
                loading="lazy"
                className=" w-full h-[300px] rounded-[10px] bg-white border border-gray-200 p-2 shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
