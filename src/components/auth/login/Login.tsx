"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Title } from "../../ui/text/Title";
import { TitleComponent } from "../../ui/text/TitleComponent";
import { Description } from "../../ui/text/Description";
import { useLoginUserMutation } from "@/redux/api/auth";
import { toast, ToastContainer } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { PAGE } from "@/config/pages/public-page.config";

interface LoginFormData {
	username: string;
	password: string;
}

const Login = () => {
	const [loginUser] = useLoginUserMutation();

	const { register, handleSubmit } = useForm<LoginFormData>();
	const route = useRouter();

	const success = () => {
		toast.success("👋 Авторизация выполнена успешно!", {
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
		toast.error("⚠️ Имя пользователя или пароль неверны.", {
			position: "top-right",
			autoClose: 5000,
			style: {
				background: "#ff0000ff",
				color: "#fff",
			},
		});
	};

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		try {
			const response = await loginUser(data).unwrap();

			localStorage.setItem("access", response.access_token);
			localStorage.setItem("refresh", response.refresh_token);

			console.log("✅ TOKENS SAVED");
			success();
			 window.location.href = PAGE.HOME;
		} catch (e) {
			console.error("❌ Login error:", e);
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

			<div className="w-full flex justify-center md:px-5 px-0 mt-[70px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className=" max-w-[500px] w-full flex flex-col items-center md:px-5 py-2 p-2 gap-5 rounded-[10px] border border-gray-300 shadow-md">
					<div className="w-full flex flex-col gap-2 items-center text-center">
						<TitleComponent className="text-[20px]">
							Войдите в свой аккаунт
						</TitleComponent>
						<Description>
							Введите свои данные для входа или перейдите к регистрации, если у
							вас ещё нет аккаунта.
						</Description>
					</div>

					<div className="w-full flex flex-col gap-3">
						<input
							className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
							type="text"
							placeholder="Введите свой email адрес"
							{...register("username", { required: true })}
						/>
						<input
							type="password"
							className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
							placeholder="Введите пароль"
							{...register("password", { required: true })}
						/>
						<button
							type="submit"
							className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px] hover:bg-gray-900 transition">
							Войти
						</button>
					</div>

					<Link
						href={PAGE.FORGOT}
						className="text-blue-600 text-sm hover:underline">
						Забыли пароль?
					</Link>

					<div className="w-full flex justify-center">
						<h1 className="flex gap-1">
							Нет аккаунта?
							<span className="text-blue-600">
								<Link href={PAGE.REGISTER}>Зарегистрируйтесь</Link>
							</span>
						</h1>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
