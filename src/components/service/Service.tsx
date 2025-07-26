"use client";
import { useEffect } from "react";
import { useGetGaranteeQuery } from "@/redux/api/text";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import TextSkeleton from "../skeleton/TextSkeleton";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { TitleComponent } from "../ui/text/TitleComponent";

interface IContact {
  phone_number: string;
  full_name: string;
  email: string;
  description: string;
}

const Service = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API || "";

  const { data, isLoading } = useGetGaranteeQuery();
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

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
  }, [data]);

  if (isLoading) {
    return <TextSkeleton />;
  }

  const processedDescription = data?.[0]?.description?.replace(
    /<img(.*?)src="\/media\/(.*?)"(.*?)>/g,
    `<a data-fancybox="gallery" href="${BASE_URL}/media/$2"><img$1src="${BASE_URL}/media/$2"$3 class="custom-image" /></a>`
  );

  return (
    <div className="container">
      <div className="w-full h-full min-h-[70vh] py-2 md:px-5 px-0">
        {processedDescription && (
          <div dangerouslySetInnerHTML={{ __html: processedDescription }} />
        )}
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
      <div className="w-full flex justify-center pb-10">
        <div className="w-full md:w-[60%] h-fit md:sticky top-[100px] flex flex-col gap-1 bg-white rounded-[10px]">
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
    </div>
  );
};

export default Service;
