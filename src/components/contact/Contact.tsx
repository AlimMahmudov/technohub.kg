import React from "react";
import { LuPhone } from "react-icons/lu";
import whatsapp from "@/shared/image/whatsapp.svg";
import instagram from "@/shared/image/instagram.svg";
import telegram from "@/shared/image/telegram.svg";
import gmail from "@/shared/image/gmail.svg";
import Image from "next/image";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";

const Contact = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="w-full py-2 md:px-5 px-0">
            <div className="p-3 mt-[14px]">
              <Title>Контакты Technohub.kg</Title>
            </div>
          </div>
          <div className="w-full py-2 md:px-5 px-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full h-full rounded-[10px] flex flex-col items-center gap-4 justify-between border border-gray-300 p-3 shadow-md">
                <div className="w-full flex text-center flex-col items-center">
                  <TitleComponent>Оставьте заявку</TitleComponent>
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
                    placeholder="Эмайл"
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
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  <TitleComponent>Адрес офиса:</TitleComponent>
                  <p>Бишкек, Куренкеева 138</p>
                </div>

                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  <TitleComponent>График работы:</TitleComponent>
                  <p>Понедельник - Воскресенье: 09:00 - 21:00</p>
                  <p>обед: 12:00 - 14:00</p>
                  <p>Пятница: Выходной</p>
                </div>

                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  <TitleComponent>Наши контакты:</TitleComponent>
                  <button className="flex items-center gap-2">
                    <LuPhone /> +996 704 000 000
                  </button>
                  <button className="flex items-center gap-2">
                    <LuPhone /> +996 704 000 000
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-2 md:px-5 px-0">
            <div className="w-full flex flex-col gap-3 p-3">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center md:w-[180px] w-[47%] rounded-[10px] gap-2 text-[18px] font-[600] bg-white border border-gray-200 p-2 shadow-md">
                  <Image className="w-[40px]" src={whatsapp} alt="img" />
                  <h1>Whatsapp</h1>
                </div>
                <div className="flex items-center md:w-[180px] w-[47%] rounded-[10px] gap-2 text-[18px] font-[600] bg-white border border-gray-200 p-2 shadow-md">
                  <Image className="w-[40px]" src={telegram} alt="img" />
                  <h1>Telegram</h1>
                </div>
                <div className="flex items-center md:w-[180px] w-[47%] rounded-[10px] gap-2 text-[18px] font-[600] bg-white border border-gray-200 p-2 shadow-md">
                  <Image className="w-[40px]" src={instagram} alt="img" />
                  <h1>Instagram</h1>
                </div>
                <div className="flex items-center md:w-[180px] w-[47%] rounded-[10px] gap-2 text-[18px] font-[600] bg-white border border-gray-200 p-2 shadow-md">
                  <Image className="w-[40px]" src={gmail} alt="img" />
                  <h1>Email</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.670201784028!2d74.58255517621372!3d42.879804671149365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9ba3daadfbb%3A0x4e7a5fa037f5fd93!2sMotion%20Web%20IT%20academy!5e0!3m2!1sru!2skg!4v1752249259961!5m2!1sru!2skg"
          loading="lazy"
          className=" w-full h-[300px] rounded-[10px]"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
