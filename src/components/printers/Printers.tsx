"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSortAlt2 } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

import { useGetPrintersQuery } from "@/redux/api/printers";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Title } from "@/components/ui/text/Title";
import { Name } from "@/components/ui/text/Name";
import { TitleComponent } from "@/components/ui/text/TitleComponent";

interface IContact {
  phone_number: string;
  full_name: string;
  description: string;
}

interface IBasketItem {
  product_id: number;
  quantity: number;
  product: any;
}

const Printers = () => {
  const { data, isLoading } = useGetPrintersQuery();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [sortAscending, setSortAscending] = useState(false);
  const [sortDescending, setSortDescending] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);
  const [sortOldest, setSortOldest] = useState(false);

  const [selectedCard, setSelectedCard] = useState<
    null | NonNullable<typeof data>[0]
  >(null);

  const { register, handleSubmit, reset } = useForm<IContact>();

  /* =========================
        ADD TO BASKET
     ========================= */
  const handleAddToBasket = (product: any) => {
    const basket: IBasketItem[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );

    const existingIndex = basket.findIndex(
      (item) => item.product_id === product.id
    );

    if (existingIndex !== -1) {
      basket[existingIndex].quantity += 1;
    } else {
      basket.push({
        product_id: product.id,
        quantity: 1,
        product: product,
      });
    }

    localStorage.setItem("basket", JSON.stringify(basket));

    toast.success("Товар добавлен в корзину", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  /* =========================
        TELEGRAM SEND
     ========================= */
  const onSubmit: SubmitHandler<IContact> = async (formData) => {
    if (!selectedCard) return;

    const message = `
<b>Новая заявка на принтер</b>

👤 <b>Имя:</b> ${formData.full_name}
📞 <b>Телефон:</b> ${formData.phone_number}
📝 <b>Сообщение:</b> ${formData.description}

🖨 <b>Принтер:</b> ${selectedCard.name}
💰 <b>Цена:</b> ${selectedCard.price} сом
🆔 https://www.technohub.kg/detail/${selectedCard.slug}
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
            parse_mode: "HTML",
          }),
        }
      );

      reset();
      toast.success("Форма успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setSelectedCard(null);
    } catch {
      toast.error("Ошибка при отправке", { theme: "colored" });
    }
  };

  /* =========================
        SORT
     ========================= */
  const filteredData = useMemo(() => {
    if (!data) return [];

    const result = [...data];

    if (sortAscending) {
      result.sort((a, b) => a.price - b.price);
    } else if (sortDescending) {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortNewest) {
      result.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      );
    } else if (sortOldest) {
      result.sort(
        (a, b) =>
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
      );
    }

    return result;
  }, [data, sortAscending, sortDescending, sortNewest, sortOldest]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="container">
      <ToastContainer theme="colored" />

      {/* TITLE + SORT */}
      <div className="flex justify-between items-center mt-[20px]">
        <Title>Принтеры TechnoHub_kg</Title>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-black text-white px-3 py-2 rounded-[10px] flex items-center gap-1"
          >
            Сортировка
            <BiSortAlt2
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div
              ref={ref}
              className="absolute right-0 mt-2 w-[220px] bg-white border shadow-md rounded-[10px] p-3 z-50"
            >
              <button
                onClick={() => {
                  setSortAscending(false);
                  setSortDescending(false);
                  setSortNewest(false);
                  setSortOldest(false);
                }}
                className="text-blue-500 text-xs mb-2"
              >
                Очистить
              </button>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sortAscending}
                  onChange={() => {
                    setSortAscending(true);
                    setSortDescending(false);
                    setSortNewest(false);
                    setSortOldest(false);
                  }}
                />
                По возрастанию
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sortDescending}
                  onChange={() => {
                    setSortDescending(true);
                    setSortAscending(false);
                    setSortNewest(false);
                    setSortOldest(false);
                  }}
                />
                По убыванию
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sortNewest}
                  onChange={() => {
                    setSortNewest(true);
                    setSortOldest(false);
                    setSortAscending(false);
                    setSortDescending(false);
                  }}
                />
                Сначала новые
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sortOldest}
                  onChange={() => {
                    setSortOldest(true);
                    setSortNewest(false);
                    setSortAscending(false);
                    setSortDescending(false);
                  }}
                />
                Сначала старые
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5">
        {filteredData.map((el) => (
          <div
            key={el.id}
            className="bg-white flex flex-col justify-between rounded-[10px] border p-3 shadow-md"
          >
            <Link href={`/detail/${el.slug}`}>
              <div className="relative w-full h-[240px]">
                <Image
                  src={el.printer_image?.[0]?.image || "/fallback.jpg"}
                  fill
                  alt="printer"
                  className="object-cover rounded-lg"
                />
              </div>

              <Name className="mt-2">{el.name}</Name>
              <TitleComponent>{el.price} сом</TitleComponent>
            </Link>

            <div className="flex gap-1 mt-2">
              <button
                onClick={() => setSelectedCard(el)}
                className="w-full py-2 bg-black text-white rounded-[10px]"
              >
                Оставить заявку
              </button>

              <button
                onClick={() => handleAddToBasket(el)}
                className="w-[20%] flex items-center justify-center bg-black text-white rounded-[10px]"
              >
                <FaShoppingCart />
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
              <h2 className="text-xl font-semibold">
                Покупка принтера
              </h2>
              <button onClick={() => setSelectedCard(null)}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="md:w-1/2">
                <div className="relative w-full h-[220px]">
                  <Image
                    src={
                      selectedCard.printer_image?.[0]?.image ||
                      "/fallback.jpg"
                    }
                    fill
                    alt="printer"
                    className="object-cover rounded-lg"
                  />
                </div>

                <Name className="mt-2">
                  {selectedCard.name}
                </Name>

                <TitleComponent>
                  {selectedCard.price} сом
                </TitleComponent>
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
                  defaultValue="+996"
                  className="border rounded-lg px-3 py-2"
                />

                <textarea
                  {...register("description")}
                  placeholder="Комментарий"
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

export default Printers;
