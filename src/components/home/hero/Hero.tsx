"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSortAlt2 } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import {
  useGetBasketQuery,
  useGetLaptopQuery,
  usePostBasketMutation,
  useUpdateQuantityMutation,
} from "@/redux/api/laptop";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Name } from "@/components/ui/text/Name";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FilterState } from "@/components/home/HomePage";

interface HeroProps {
  selectedFilters: FilterState;
}

interface IContact {
  link: string;
  phone_number: string;
  full_name: string;
  description: string;
}

export type PostBasketReq = {
  product_id: number;
  quantity: number;
};

const Hero = ({ selectedFilters }: HeroProps) => {
  const { data, isLoading } = useGetLaptopQuery();
  const [addToCart] = usePostBasketMutation();
  const { data: basketData } = useGetBasketQuery();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [sortAscending, setSortAscending] = useState(false);
  const [sortDescending, setSortDescending] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<
    null | NonNullable<typeof data>[0]
  >(null);

  const { register, handleSubmit, reset } = useForm<IContact>();

  const onSubmit: SubmitHandler<IContact> = async (formData) => {
    const dataWithLink = {
      ...formData,
      link: "https://github.com/AlimMahmudov/technohub.kg",
    };

    try {
      await axios.post("https://api.technohub.kg/store/order/", dataWithLink);
      reset();
      toast.success("Форма успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setSelectedCard(null);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Произошла ошибка при отправке формы.");
    }
  };

  const error = () => {
    toast.error("⚠️ Пожалуйста, авторизуйтесь перед добавлением в корзину", {
      position: "top-right",
      autoClose: 5000,
      style: {
        background: "#ff0000ff",
        color: "#fff",
      },
    });
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result = [...data].filter((el) => el.discount === 0);

    (
      Object.entries(selectedFilters) as [string, (string | number)[]][]
    ).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((el) => {
          const elValue = el[key as keyof typeof el];
          return values.includes(elValue as string | number);
        });
      }
    });

    if (showInStock) {
      result = result.filter((el) => el.in_stock === true);
    } else if (showOutOfStock) {
      result = result.filter((el) => el.in_stock === false);
    }

    if (sortAscending) {
      result.sort((a, b) => a.price - b.price);
    } else if (sortDescending) {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    data,
    selectedFilters,
    sortAscending,
    sortDescending,
    showInStock,
    showOutOfStock,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div className="container">
      <ToastContainer theme="colored" />        
      <div className="w-full md:px-5 px-0 mt-[20px] relative">
        <div className="w-full gap-1 rounded-[10px] p-0 md:p-3 flex items-center justify-between flex-wrap">
          <Title>Ноутбуки TechnoHub_kg</Title>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-[10px] md:mt-0 mt-2 bg-[#141414] text-white shadow-sm text-[14px] px-3 flex items-center gap-1"
            >
              Сортировка
              <BiSortAlt2
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div
                ref={ref}
                className="absolute md:right-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-md rounded-[10px] z-50 p-3 text-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Сортировка</span>
                  <button
                    onClick={() => {
                      setSortAscending(false);
                      setSortDescending(false);
                      setShowInStock(false);
                      setShowOutOfStock(false);
                    }}
                    className="text-blue-500 text-xs"
                  >
                    Очистить
                  </button>
                </div>

                <div className="flex flex-col items-start">
                  <p className="font-[600]">Цена</p>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={sortAscending}
                      onChange={() => {
                        setSortAscending(true);
                        setSortDescending(false);
                      }}
                    />
                    <h1>По возрастанию</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={sortDescending}
                      onChange={() => {
                        setSortDescending(true);
                        setSortAscending(false);
                      }}
                    />
                    <h1>По убыванию</h1>
                  </div>
                </div>

                <div className="flex flex-col items-start mt-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={showOutOfStock}
                      onChange={() => {
                        const newValue = !showOutOfStock;
                        setShowOutOfStock(newValue);
                        setShowInStock(false);
                      }}
                    />
                    <h1>Нет в наличии</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={showInStock}
                      onChange={() => {
                        const newValue = !showInStock;
                        setShowInStock(newValue);
                        setShowOutOfStock(false);
                      }}
                    />
                    <h1>Есть в наличии</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="w-full py-5 md:px-5 px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-[10px] w-full">
          {filteredData
            ?.filter((el) => el.discount === 0)
            .map((el) => (
              <div
                key={el.id}
                className="bg-white flex flex-col gap-1 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md"
              >
                <Link href={`/detail/${el.id}`} className="flex flex-col gap-2">
                  <div className="relative flex justify-start w-full h-[240px] rounded-[10px] overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={el.laptop_image[0]?.image}
                      width={300}
                      height={200}
                      alt="product"
                    />
                    <div className="absolute mt-1 ml-1 flex gap-1">
                      {!el.in_stock && (
                        <div className=" bg-black text-white rounded-[7px] px-1">
                          <h1>Есть в наличии</h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Name className="text-gray-800">{el.name}</Name>
                    <div className="flex justify-between">
                      <TitleComponent>{el.price} сом</TitleComponent>
                    </div>
                    <div className="flex justify-between">
                      {!el.in_composition && <h1>Есть на складе</h1>}
                      <p>
                        <span className=" text-gray-500">Артикул:</span>{" "}
                        {el.articles}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedCard(el)}
                    className="w-full py-2 p-1 mt-2   text-[14px] bg-black text-white rounded-[10px]"
                  >
                    Оставить заявку
                  </button>
                  <button
                    onClick={() => {
                      const isAuthenticated =
                        typeof window !== "undefined" &&
                        localStorage.getItem("access");

                      if (!isAuthenticated) {
                        error();
                        return;
                      }

                      const existingItem = basketData?.find(
                        (item) => item.product.id === el.id
                      );

                      if (existingItem) {
                        updateQuantity({
                          id: existingItem.id,
                          product_id: el.id,
                          quantity: existingItem.quantity + 1,
                        });
                      } else {
                        addToCart({ product_id: el.id, quantity: 1 });
                      }
                    }}
                    className="w-[20%] flex items-center justify-center py-2 p-1 mt-2 text-[20px] bg-black text-white rounded-[10px]"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Модальное окно */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white flex flex-col items-end rounded-lg p-4 w-full max-w-[800px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-semibold">Покупка ноутбука</h2>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-[20px]"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
              <div className="md:w-1/2 flex flex-col gap-3">
                <div className="relative w-full h-[240px] rounded-[10px] overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={selectedCard.laptop_image[0]?.image || "/fallback.jpg"}
                    width={300}
                    height={200}
                    alt="product"
                  />
                </div>
                <Name className="text-gray-800">{selectedCard.name}</Name>
                <TitleComponent>{selectedCard.price} сом</TitleComponent>
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
                  className="md:w-[30%] w-full bg-[#141414] text-white py-2 mt-2 rounded-[10px]"
                >
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
