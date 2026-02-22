"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

import { useGetBasketQuery, useGetLaptopQuery } from "@/redux/api/laptop";

import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Name } from "@/components/ui/text/Name";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";

import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { FilterState } from "@/components/home/HomePage";

interface HeroProps {
  selectedFilters: FilterState;
}

interface IContact {
  phone_number: string;
  full_name: string;
  description: string;
}

const Hero = ({ selectedFilters }: HeroProps) => {
  const { data, isLoading } = useGetLaptopQuery();

  const [selectedCard, setSelectedCard] = useState<any>(null);

  const { register, handleSubmit, reset } = useForm<IContact>();

  /* ================= TELEGRAM ================= */

  const onSubmit: SubmitHandler<IContact> = async (formData) => {
    if (!selectedCard) return;

    const message = `
Новая заявка:

👤 Имя: ${formData.full_name}
📞 Телефон: ${formData.phone_number}
📝 Сообщение: ${formData.description}

💻 Ноутбук: ${selectedCard.name}
📑 Артикул: ${selectedCard.articles ?? "Не указан"}
🆔 https://www.technohub.kg/detail/${selectedCard.id}
`;

    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
            text: message,
          }),
        },
      );

      toast.success("Заявка отправлена!");
      reset();
      setSelectedCard(null);
    } catch {
      toast.error("Ошибка отправки");
    }
  };

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    if (!data) return [];
    return [...data].filter((el) => el.discount === 0);
  }, [data]);

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="container">
      <ToastContainer theme="colored" />

      <div className="mt-5">
        <Title>Ноутбуки TechnoHub_kg</Title>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {filteredData.map((el) => (
          <div
            key={el.id}
            className="bg-white border rounded-xl p-3 shadow-sm flex flex-col"
          >
            <Link href={`/detail/${el.slug}`}>
              <div className="relative w-full h-[220px]">
                <Image
                  src={el.laptop_image?.[0]?.image || "/fallback.jpg"}
                  fill
                  alt="product"
                  className="object-cover rounded-lg"
                />
              </div>
            </Link>

            <Name className="mt-2">{el.name}</Name>
            <TitleComponent>{el.price} сом</TitleComponent>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setSelectedCard(el)}
                className="w-full bg-black text-white py-2 rounded-lg"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white w-full max-w-[800px] rounded-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Покупка ноутбука</h2>
              <button onClick={() => setSelectedCard(null)}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="md:w-1/2">
                <div className="relative w-full h-[220px]">
                  <Image
                    src={
                      selectedCard.laptop_image?.[0]?.image || "/fallback.jpg"
                    }
                    fill
                    alt="product"
                    className="object-cover rounded-lg"
                  />
                </div>

                <Name className="mt-2">{selectedCard.name}</Name>
                <TitleComponent>{selectedCard.price} сом</TitleComponent>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:w-1/2 flex flex-col gap-2"
              >
                <input
                  {...register("full_name", { required: true })}
                  placeholder="Имя"
                  className="border rounded-lg px-3 py-2"
                />

                <input
                  {...register("phone_number", { required: true })}
                  placeholder="Телефон"
                  className="border rounded-lg px-3 py-2"
                  defaultValue="+996"
                />

                <textarea
                  {...register("description")}
                  placeholder="Сообщение"
                  className="border rounded-lg px-3 py-2 h-24"
                />

                <button className="bg-black text-white py-2 rounded-lg mt-2">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
