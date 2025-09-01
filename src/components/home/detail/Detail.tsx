"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
	useDetailLaptopQuery,
	useGetBasketQuery,
	usePostBasketMutation,
	useUpdateQuantityMutation,
} from "@/redux/api/laptop";
import Gallery from "./Gallery";
import Info from "./Info";
import Specs from "./Specs";
import BuyModal from "./BuyModal";
import { Title } from "@/components/ui/text/Title";
import { IoCartOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const Detail = () => {
	const params = useParams();
	const slug = params?.slug as string;
	const { data } = useDetailLaptopQuery(slug);
	const { data: basketData } = useGetBasketQuery();

	console.log(data, "data");

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [addToCart] = usePostBasketMutation();
	const [updateQuantity] = useUpdateQuantityMutation();

	if (!data) return null;

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

	return (
		<div className="container">
			<ToastContainer theme="colored" />
			<div className="w-full py-5 md:px-5 mt-[20px] flex flex-col gap-4 md:mb-[60px]">
				<Title>Подробнее о ноутбуке</Title>
				<div className="w-full mt-3 flex md:flex-row flex-col gap-4">
					{/* Галерея */}
					<Gallery images={data.laptop_image} name={data.name} />

					{/* Инфо + кнопки */}
					<div className="md:w-1/2 w-full flex flex-col gap-4">
						<Info data={data} />
						<div className="flex gap-2">
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
										(item) => item.product.id === data.id
									);

									if (existingItem) {
										updateQuantity({
											id: existingItem.id,
											product_id: data.id,
											quantity: existingItem.quantity + 1,
										});
									} else {
										addToCart({ product_id: data.id, quantity: 1 });
									}
								}}
								className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
								<IoCartOutline /> В корзину
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

									setIsModalOpen(true);
								}}
								className="py-2 px-1 rounded-[10px] w-full border border-gray-200 flex items-center justify-center gap-1 bg-[#141414] text-white">
								Купить сейчас
							</button>
						</div>
						<Specs data={data} />
					</div>
				</div>
			</div>

			{/* Модалка */}
			{isModalOpen && (
				<BuyModal data={data} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default Detail;
