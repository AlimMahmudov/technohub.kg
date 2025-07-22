"use client";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Name } from "@/components/ui/text/Name";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useGetLaptopQuery } from "@/redux/api/laptop";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Hero = () => {
	const { data, isLoading } = useGetLaptopQuery();
	console.log(data, "data data");

	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const [selectedCard, setSelectedCard] = useState<
		null | NonNullable<typeof data>[0]
	>(null);

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
			{/* Верхняя часть с заголовком и сортировкой */}
			<div className="w-full md:px-5 px-0 mt-[20px] relative">
				<div className="w-full gap-1 rounded-[10px] p-0 md:p-3 flex items-center justify-between flex-wrap">
					<Title>Ноутбуки в Бишкеке, Кыргызстане</Title>

					<div className="relative">
						<button
							onClick={() => setOpen(!open)}
							className="p-2 rounded-[10px] md:mt-0 mt-2 bg-[#141414] text-white shadow-sm text-[14px] px-3 flex items-center gap-1">
							Сортировка{" "}
							<BiSortAlt2
								className={`transition-transform duration-300 ${
									open ? "rotate-180" : "rotate-0"
								}`}
							/>
						</button>

						{open && (
							<div
								ref={ref}
								className="absolute md:right-0 mt-2 w-[200px] bg-white border border-gray-200 shadow-md rounded-[10px] z-50 p-3 text-sm">
								<div className="flex justify-between items-center mb-2">
									<span className="font-semibold">Сортировка</span>
									<button
										onClick={() => console.log("Очистить сортировку")}
										className="text-blue-500 text-xs">
										Очистить
									</button>
								</div>

								<div className="flex flex-col items-start">
									<p className="font-[600]">Цена</p>
									<div className="flex gap-1">
										<input type="checkbox" />
										<h1>По возрастанию</h1>
									</div>
									<div className="flex gap-1">
										<input type="checkbox" />
										<h1>По убыванию</h1>
									</div>
								</div>

								<div className="flex flex-col items-start mt-2">
									<div className="flex gap-1">
										<input type="checkbox" />
										<h1>Сначала новинки</h1>
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
					{data?.map((el) => (
						<div
							key={el.id}
							className="bg-white flex flex-col gap-1 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md">
							<Link href={`/detail/${el.id}`} className="flex flex-col gap-2">
								<div className="relative flex justify-start w-full h-[240px] rounded-[10px] overflow-hidden">
									<Image
										className="object-cover w-full h-full"
										src={el.laptop_image[0]?.image}
										width={300}
										height={200}
										alt="product"
									/>
									<div className="absolute bg-white rounded-[7px] px-1 ml-1 mt-1">
										<h1>Нет в наличии</h1>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<Name className="text-gray-800">{el.name}</Name>
									<TitleComponent>{el.price} сом</TitleComponent>
								</div>
							</Link>

							<div className="flex gap-1">
								<button
									onClick={() => setSelectedCard(el)}
									className="w-full py-2 p-1 mt-2 text-[14px] bg-black text-white rounded-[10px]">
									Уведомить меня
								</button>
								<button className="w-[20%] flex items-center justify-center py-2 p-1 mt-2 text-[20px] bg-black text-white rounded-[10px]">
									<FaShoppingCart />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* МОДАЛКА */}
			{selectedCard && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2"
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
								<TitleComponent>{selectedCard.price} сом</TitleComponent>
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
							className="md:w-[30%] w-full bg-[#141414] text-white py-2 mt-2 rounded-[10px]">
							Отправить
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Hero;
