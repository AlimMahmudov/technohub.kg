"use client";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Name } from "@/components/ui/text/Name";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import {
	useGetBasketQuery,
	useGetLaptopQuery,
	usePostBasketMutation,
	useUpdateQuantityMutation,
} from "@/redux/api/laptop";
import Image from "next/image";
import Link from "next/link";
import {  useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const Discount = () => {
	const { data, isLoading } = useGetLaptopQuery();
	const [addToCart] = usePostBasketMutation();
	const { data: basketData } = useGetBasketQuery();
	const [updateQuantity] = useUpdateQuantityMutation();
	const [selectedCard, setSelectedCard] = useState<
		null | NonNullable<typeof data>[0]
	>(null);
	 
	const discounted = data?.filter((el) => el.discount > 0) || [];

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

	 
	if (isLoading) return <CardSkeleton />;

	return (
		<div className="container">
			<ToastContainer theme="colored" />
			<div className="w-full md:px-5 px-0 mt-[20px] relative">
				<h1 className="text-[23px] font-semibold">Скидки на ноутбуки</h1>
			</div>

			<div className="w-full py-5 md:px-5 px-0 overflow-hidden">
				<div
				 
					className="flex overflow-x-scroll scroll-smooth gap-[10px]"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{discounted.map((el) => (
						<div
							key={el.id}
							className="min-w-[calc(100%/3-10px)] max-w-[calc(100%/3-10px)] flex-shrink-0 bg-white flex flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md">
							<Link href={`/detail/${el.id}`}>
								<div className="relative flex justify-end w-full h-[240px] rounded-[10px] overflow-hidden">
									<Image
										className="object-cover w-full h-full"
										src={el.laptop_image[0]?.image}
										width={300}
										height={200}
										alt="product"
									/>
									<div
										className="w-[50px] flex justify-center items-center h-[200px] mt-[-50px] ml-[-40px] absolute px-2 bg-red-600 text-white text-[18px] font-[600]"
										style={{ transform: "rotate(-45deg)" }}>
										<h1
											className="flex items-center mt-[-40px] text-[20px]"
											style={{ transform: "rotate(45deg)" }}>
											{el.discount}%
										</h1>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<Name className="text-gray-800">{el.name}</Name>
									<div className="flex gap-2">
										<h2 className="text-[16px] font-[600] text-gray-500 line-through">
											{el.price} сом
										</h2>
										<TitleComponent className="text-red-600">
											{Math.round(el.price * (1 - el.discount / 100))} сом
										</TitleComponent>
									</div>
								</div>
							</Link>

							<div className="flex gap-1">
								<button
									onClick={() => setSelectedCard(el)}
									className="w-full py-2 p-1 mt-2 text-[14px] bg-black text-white rounded-[10px]">
									Уведомить меня
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
									className="w-[20%] flex items-center justify-center py-2 p-1 mt-2 text-[20px] bg-black text-white rounded-[10px]">
									<FaShoppingCart />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Модалка */}
			{selectedCard && (
				<div
					className="fixed inset-0 bg-black px-2 bg-opacity-50 flex justify-center items-center z-50"
					onClick={() => setSelectedCard(null)}>
					<div
						className="bg-white flex flex-col items-end rounded-lg p-4 w-full max-w-[800px] relative"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex w-full items-center justify-between">
							<h2 className="text-xl font-semibold">Покупка ноутбука</h2>
							<button
								onClick={() => setSelectedCard(null)}
								className="text-[20px]">
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
								<div className="flex gap-2">
									<h2 className="text-[16px] font-[600] text-gray-500 line-through">
										{selectedCard.price} сом
									</h2>
									<TitleComponent className="text-red-600">
										{Math.round(
											selectedCard.price * (1 - selectedCard.discount / 100)
										)}{" "}
										сом
									</TitleComponent>
								</div>
							</div>

							<div className="md:w-1/2 flex flex-col gap-2">
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
									className="bg-white rounded-[10px] w-full h-[50%] py-2 px-3 outline-none border border-gray-400"
									placeholder="Сообщение"></textarea>
							</div>
						</div>

						<button
							onClick={() => {
								alert("Спасибо за покупку!");
								setSelectedCard(null);
							}}
							className="md:w-[30%] w-[100%] bg-[#141414] text-white py-2 mt-2 rounded-[10px]">
							Отправить
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Discount;
