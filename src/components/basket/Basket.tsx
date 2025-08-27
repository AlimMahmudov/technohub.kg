"use client";
import {
	useGetBasketQuery,
	useDeleteBasketMutation,
	useUpdateQuantityMutation,
} from "@/redux/api/laptop";
import { Title } from "../ui/text/Title";
import Image from "next/image";
import img from "@/assets/images/basket-null.png";
import TextSkeleton from "../skeleton/TextSkeleton";
import { useForm, SubmitHandler } from "react-hook-form";
import { TitleComponent } from "../ui/text/TitleComponent";
import { toast, ToastContainer } from "react-toastify";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useState, useEffect } from "react";

interface IMessage {
	phone_number: string;
	full_name: string;
	email: string;
	description: string;
	total_sum: number;
	products: {
		id: number | string | null; // Изменено: может быть number, string или null
		quantity: number;
		name: string;
		articles: string | null;
	}[];
}

interface BasketItem {
	id: number;
	quantity: number;
	product: {
		id: number;
		name: string;
		price: number;
		discount: number;
		articles: number | string | null; // Добавлено поле articles
		laptop_image: { image: string }[];
	};
}

const Basket = () => {
	const { data, isLoading, error } = useGetBasketQuery();
	const [deleteItem] = useDeleteBasketMutation();
	const [updateQuantity] = useUpdateQuantityMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [localBasket, setLocalBasket] = useState<BasketItem[]>([]);

	// Синхронизируем локальное состояние с данными из API
	useEffect(() => {
		if (data && localBasket.length === 0) {
			const mappedData: BasketItem[] = data.map((item) => ({
				...item,
				product: {
					...item.product,
					articles:
						item.product.articles !== null
							? String(item.product.articles)
							: null,
				},
			}));
			setLocalBasket(mappedData);
		}
	}, [data]);
	

	const { register, handleSubmit, reset } =
		useForm<Omit<IMessage, "products">>();

	const onSubmit: SubmitHandler<Omit<IMessage, "products">> = async (
		formData
	) => {
		if (!localBasket || localBasket.length === 0) return;

		setIsSubmitting(true);

		const products = localBasket.map((item) => {
			return {
				id: item.product.id,
				quantity: item.quantity,
				name: item.product?.name || "Название недоступно",
				articles:
					item.product?.articles !== null &&
					item.product?.articles !== undefined
						? String(item.product.articles)
						: null, // соответствует типу string | null
			};
		});

		const payload: IMessage = {
			...formData,
			total_sum: total,
			products,
		};

		try {
			// Выводим все данные в консоль
			console.log("Данные для отправки:", {
				phone_number: payload.phone_number,
				full_name: payload.full_name,
				email: payload.email,
				description: payload.description,
				total_sum: payload.total_sum,
				products: payload.products.map((product) => ({
					id: product.id,
					quantity: product.quantity,
					name: product.name,
				})),
			});

			// Отправка в Telegram
			const token = process.env.NEXT_PUBLIC_TG_TOKEN;
			const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID;

			// Форматируем список товаров
			const productsText = payload.products.map(
				(product) =>
					`\n \n 💻${product.name} 
				 \n📑 Артикул: ${product.articles ?? "Не указан"}
				  \n страница: https://www.technohub.kg/detail/${product.id}
					 \n количество: ${product.quantity} шт.
					 \n ____________________________________________`
			);

			const text = `
		🛒 Новая заявка из корзины: \n
		👤 Имя: ${payload.full_name}
		📞 Телефон: ${payload.phone_number}
		📧 Email: ${payload.email || "Не указан"}
		💬 Сообщение: ${payload.description}
		💰 Общая сумма: ${payload.total_sum} сом\n
		 Товары: 

		${productsText}
				`;

			const res = await fetch(
				`https://api.telegram.org/bot${token}/sendMessage`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chat_id: chatId,
						text: text,
						parse_mode: "HTML",
					}),
				}
			);

			if (!res.ok) throw new Error("Ошибка при отправке в Telegram");

			reset();
			toast.success("Заявка успешно отправлена!", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		} catch (error) {
			console.error("Ошибка при обработке формы:", error);
			toast.error("Произошла ошибка при отправке заявки.", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) return <TextSkeleton />;

	if (!isLoading && (error || !localBasket.length))
		return (
			<div className="w-full h-[100vh] justify-center items-center py-10">
				<div className="container flex flex-col justify-center items-center">
					<Image className="w-[400px] h-full" src={img} alt="img" />
					<h1 className="text-[40px] text-gray-500">Корзина пуста</h1>
				</div>
			</div>
		);

	const total = localBasket.reduce((sum, item) => {
		const hasDiscount = item.product.discount > 0;
		const price = hasDiscount
			? Math.round(item.product.price * (1 - item.product.discount / 100))
			: item.product?.price ?? 0;
		return sum + price * item.quantity;
	}, 0);

	const handleIncrement = async (
		id: number,
		currentQuantity: number,
		productId: number
	) => {
		try {
			// Обновляем на бэкенде
			await updateQuantity({
				id,
				quantity: currentQuantity + 1,
				product_id: productId,
			}).unwrap();

			// Обновляем локальное состояние
			setLocalBasket((prevBasket) =>
				prevBasket.map((item) =>
					item.id === id ? { ...item, quantity: currentQuantity + 1 } : item
				)
			);
		} catch (error) {
			console.error("Ошибка при увеличении количества:", error);
			toast.error("Ошибка при обновлении количества", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		}
	};

	const handleDecrement = async (
		id: number,
		currentQuantity: number,
		productId: number
	) => {
		if (currentQuantity > 1) {
			try {
				// Обновляем на бэкенде
				await updateQuantity({
					id,
					quantity: currentQuantity - 1,
					product_id: productId,
				}).unwrap();

				// Обновляем локальное состояние
				setLocalBasket((prevBasket) =>
					prevBasket.map((item) =>
						item.id === id ? { ...item, quantity: currentQuantity - 1 } : item
					)
				);
			} catch (error) {
				console.error("Ошибка при уменьшении количества:", error);
				toast.error("Ошибка при обновлении количества", {
					position: "top-right",
					autoClose: 3000,
					theme: "colored",
				});
			}
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteItem(id).unwrap();
			setLocalBasket((prevBasket) =>
				prevBasket.filter((item) => item.id !== id)
			);
		} catch (error) {
			console.error("Ошибка при удалении товара:", error);
		}
	};

	// const sortedData = [...localBasket].sort((a, b) => a.id - b.id);

	return (
		<div className="container">
			<div className="w-full py-2 md:px-5 px-0">
				<div className="p-3 mt-[14px]">
					<Title>Корзина</Title>
				</div>
			</div>

			<div className="w-full py-5 md:px-5 px-0">
				<div className="flex flex-col gap-[10px] w-full">
					{localBasket.map((el) => (
						<div
							className="bg-white flex flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md"
							key={el.id} >
							<div className="flex md:gap-10 gap-3">
								<div className="w-[180px] h-[80px] rounded-[10px] overflow-hidden">
									<Image
										className="object-cover w-full h-full"
										src={
											el.product?.laptop_image?.[0]?.image || "/fallback.jpg"
										}
										alt="img"
										width={180}
										height={80}
									/>
								</div>

								<div className="w-full flex md:flex-row flex-col md:gap-2 gap-0">
									<div className="w-full justify-center flex items-center">
										<h1 className="w-full text-[20px] font-[400]">
											{el.product?.name || "Название недоступно"}
										</h1>
									</div>

									<div className="mt-2 md:mt-0 w-full flex items-center">
										<div className="flex items-center w-full justify-between gap-1">
											<div className="flex">
												{el.product.discount > 0 ? (
													<TitleComponent className="text-red-600 flex items-center gap-1">
														<RiDiscountPercentFill />
														{Math.round(
															el.product.price * (1 - el.product.discount / 100)
														) * el.quantity}{" "}
														сом
													</TitleComponent>
												) : (
													<h2 className="flex w-full max-w-[200px] text-[18px] font-[500] text-black">
														{(el.product?.price ?? 0) * el.quantity} сом
													</h2>
												)}
											</div>

											<div className="md:flex  gap-[50px] hidden">
												<div className="flex items-center justify-center gap-2 px-2">
													<button
														onClick={() =>
															handleDecrement(el.id, el.quantity, el.product.id)
														}
														className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded">
														–
													</button>

													<span className="min-w-[20px] text-center">
														{el.quantity}
													</span>

													<button
														onClick={() =>
															handleIncrement(el.id, el.quantity, el.product.id)
														}
														className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded">
														+
													</button>
												</div>

												<button
													className="px-2 py-1 rounded-[5px] text-white bg-red-500 font-normal"
													onClick={() => handleDelete(el.id)}>
													Удалить
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex gap-[20px] md:hidden">
								<div className="flex items-center   justify-center gap-2 px-2">
									<button
										onClick={() =>
											handleDecrement(el.id, el.quantity, el.product.id)
										}
										className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded">
										–
									</button>

									<span className="min-w-[20px] text-center">
										{el.quantity}
									</span>

									<button
										onClick={() =>
											handleIncrement(el.id, el.quantity, el.product.id)
										}
										className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded">
										+
									</button>
								</div>

								<button
									className="px-2 py-1 w-full rounded-[5px] text-white bg-red-500 font-normal"
									onClick={() => handleDelete(el.id)}>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="w-full md:px-5 px-0">
				<div className="p-3 mt-[14px]">
					<h1 className="flex items-center gap-1 text-[23px] font-semibold">
						<span className="text-[16px]">Итого:</span> {total} сом
					</h1>
				</div>
			</div>

			{/* Форма заказа */}
			<div className="w-full flex justify-center pb-10">
				<div className="w-full md:w-[60%] h-fit flex flex-col gap-1 bg-white rounded-[10px]">
					<div className="w-full h-full bg-white rounded-[10px] flex flex-col items-center gap-4 justify-between border border-gray-300 p-3">
						<div className="w-full flex text-center flex-col items-center">
							<TitleComponent>Оставьте заявку!</TitleComponent>
							<p className="text-gray-500">
								Наши менеджеры свяжутся с вами в ближайшее время
							</p>
						</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full flex flex-col items-center gap-2">
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
							<input
								className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
								type="email"
								placeholder="Email"
								{...register("email")}
							/>
							<textarea
								className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
								placeholder="Сообщение"
								{...register("description", { required: true })}></textarea>
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px] disabled:bg-gray-400 disabled:cursor-not-allowed">
								{isSubmitting ? "Отправка..." : "Отправить"}
							</button>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Basket;
