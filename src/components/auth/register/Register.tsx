"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRegisterUserMutation } from "@/redux/api/auth";
import { ToastContainer, toast } from "react-toastify";
import { Title } from "../../ui/text/Title";
import { TitleComponent } from "../../ui/text/TitleComponent";
import { Description } from "../../ui/text/Description";
import { useRouter } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";

interface RegisterForm {
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const { register, handleSubmit, reset } = useForm<RegisterForm>();
	const [registerUserMutation] = useRegisterUserMutation();
	const route = useRouter();

	const success = () => {
		toast.success("🎉 Регистрация прошла успешно!", {
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
		toast.error("❌ Регистрация не удалась. Попробуйте ещё раз.", {
			position: "top-right",
			autoClose: 5000,
			style: {
				background: "#ff0000ff",
				color: "#fff",
			},
		});
	};

	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
		try {
			const response = await registerUserMutation(data).unwrap();
			console.log(response);
			success();
			reset();
			route.push(PAGE.LOGIN);
		} catch (e) {
			console.error(e);
			error();
		}
	};

	return (
		<div className="container">
			<ToastContainer />
			<div className="flex justify-center w-full py-2 md:px-5 px-0">
				<div className="p-0 mt-[14px]">
					<Title>
						<Link href={PAGE.HOME}>Technohub.kg</Link>
					</Title>
				</div>
			</div>
			<div className="w-full flex justify-center md:px-5 px-0 mt-4">
				<div className="md:w-[40%] w-full flex flex-col items-center md:px-5 py-2 gap-5 p-2 rounded-[10px] border border-gray-300 shadow-md">
					<div className="w-full flex flex-col gap-2 items-center text-center">
						<TitleComponent className="text-[20px]">
							Создайте аккаунт
						</TitleComponent>
						<Description>
							Зарегистрируйтесь, чтобы оформлять заказы, сохранять избранные
							товары и получать персональные предложения.
						</Description>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-3">
						<input
							type="text"
							className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
							placeholder="Enter your username"
							{...register("username", { required: true })}
						/>
						<input
							type="email"
							className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
							placeholder="Enter your email address"
							{...register("email", { required: true })}
						/>
						<input
							type="password"
							className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
							placeholder="Enter your password"
							{...register("password", { required: true })}
						/>
						<button
							type="submit"
							className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]">
							Создать
						</button>
					</form>

					<div className="w-full flex justify-center">
						<h1 className="flex gap-1">
							Уже есть аккаунт?
							<span className="text-blue-600">
								<Link href={PAGE.LOGIN}>Войти</Link>
							</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
