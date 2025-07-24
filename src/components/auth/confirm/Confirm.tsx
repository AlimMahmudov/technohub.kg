"use client";

import { useState } from "react";
import { useConfirmResetPasswordMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { Title } from "@/components/ui/text/Title";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { PAGE } from "@/config/pages/public-page.config";

const Confirm = () => {
	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmReset] = useConfirmResetPasswordMutation();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const success = () => {
			toast.success("👋 Пароль успешно изменен!", {
				position: "top-right",
				autoClose: 5000,
				style: {
					background: "#9b5cfb",
					color: "#fff",
					fontSize: "16px",
					borderRadius: "8px",
				},
			});
		};

		const error = () => {
			toast.error("⚠️ Ошибка при сбросе пароля", {
				position: "top-right",
				autoClose: 5000,
				style: {
					background: "#ff0000ff",
					color: "#fff",
				},
			});
		};

		const custom = () => {
			toast.error("⚠️ Пароли не совпадают", {
				position: "top-right",
				autoClose: 5000,
				style: {
					background: "#ff0000ff",
					color: "#fff",
				},
			});
		};

		if (password !== confirmPassword) {
			custom();
			return;
		}

		try {
			await confirmReset({ token, password }).unwrap();
			success();
			router.push(PAGE.LOGIN);
		} catch (err) {
			console.error(err);
			error();
		}
	};

	return (
		<div className="container">
			<ToastContainer theme="colored" />
			<div className="flex justify-center w-full py-2 md:px-5 px-0">
				<div className="p-0 mt-[14px]">
					<Title>
						<Link href={PAGE.HOME}>Technohub.kg</Link>
					</Title>
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className="max-w-[500px] mx-auto flex flex-col gap-4 border mt-4 p-4 rounded-lg shadow-md">
				<h2 className="text-xl font-bold">Сброс пароля</h2>

				<input
					type="text"
					placeholder="Код сброса"
					value={token}
					onChange={(e) => setToken(e.target.value)}
					className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
					required
				/>

				<input
					type="password"
					placeholder="Новый пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
					required
				/>

				<input
					type="password"
					placeholder="Подтвердите пароль"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
					required
				/>

				<button
					type="submit"
					className="bg-black text-white py-2 rounded-md hover:bg-gray-900">
					Сбросить пароль
				</button>
			</form>
		</div>
	);
};

export default Confirm;
