"use client";
import React, { useEffect } from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import Link from "next/link";
import { useGetContactQuery } from "@/redux/api/contact";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
const BASE_URL = process.env.NEXT_PUBLIC_API || "";

interface IContact {
  phone_number: string;
  full_name: string;
  description: string;
}

const Contact = () => {
  const { data } = useGetContactQuery();
  console.log(data, "datacontact");

  const { register, handleSubmit, reset } = useForm<IContact>();

  const onSubmit: SubmitHandler<IContact> = async (data) => {
    try {
      await axios.post("https://api.technohub.com.kg/store/callback/", data);
      reset();
      toast.success("Форма успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      toast.error("Произошла ошибка при отправке формы.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
  }, [data]);

  const processedDescription = data?.[0]?.work_schedule?.replace(
    /<img(.*?)src="\/media\/(.*?)"(.*?)>/g,
    `<a data-fancybox="gallery" href="${BASE_URL}/media/$2"><img$1src="${BASE_URL}/media/$2"$3 class="custom-image" /></a>`
  );

  return (
    <>
    <ToastContainer theme="colored" />
      <section className="pb-10">
        <div className="container">
          <div className="w-full py-2 md:px-5 px-0 md:py-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  <p>свяжитесь с нами</p>
                  <Title>
                    мы всегда готовы помочь вам и ответить на ваши вопросы
                  </Title>
                </div>

                <style jsx global>{`
                  .custom-image {
                    max-width: 100%;
                    height: 400px;
                    object-fit: cover;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    transition: transform 0.3s ease;
                  }
                  .custom-image:hover {
                    transform: scale(1.02);
                  }
                `}</style>

                {data?.map((el) => (
                  <div key={el.id} className="flex ">
                    <div className="flex">
                      <div className="flex flex-col items-start gap-1 px-3">
                        <TitleComponent>Наши контакты</TitleComponent>
                        {el.phone_number?.map((item) => (
                          <button key={item.id}>{item.phone_number}</button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-1 px-3">
                        <TitleComponent>Адрес офиса</TitleComponent>
                        <p>{el.address}</p>
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
                  </div>
                ))}
                <div className="w-full flex flex-col gap-1 rounded-[10px] p-3">
                  {processedDescription && (
                    <div
                      dangerouslySetInnerHTML={{ __html: processedDescription }}
                    />
                  )}
                </div>
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
                    type="tel"
                    placeholder="Телефон"
                    {...register("phone_number", {
                      required: true,
                      pattern: /^\+996\d{9}$/, // проверка на формат
                    })}
                    defaultValue="+996"
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
