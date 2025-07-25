"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResertUserMutation } from "@/redux/api/auth";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";

interface ResetFormData {
	email: string;
}

const ResetPassword = () => {
	const { register, handleSubmit, reset } = useForm<ResetFormData>();
	const [resertUser] = useResertUserMutation();
	const route = useRouter();

	const onSubmit: SubmitHandler<ResetFormData> = async (data) => {
		try {
			await resertUser(data).unwrap();

			toast.success("📧 Проверьте почту для сброса пароля", {
				position: "top-right",
				autoClose: 5000,
			});
			reset();
			route.push(PAGE.CONFIRM);
		} catch (e) {
			toast.error("❌ Ошибка при отправке письма", {
				position: "top-right",
				autoClose: 5000,
			});
			console.error("Reset password error:", e);
		}
	};

	return (
		<div className="container py-5">
			<div className="flex justify-center w-full py-2 md:px-5 px-0">
				<div className="p-0 mt-[14px]">
					<Title>
						<Link href={PAGE.HOME}>Technohub.kg</Link>
					</Title>
				</div>
			</div>

			<ToastContainer />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-[500px] mx-auto flex flex-col gap-4   mt-[70px] border border-gray-300 p-4 rounded-lg shadow-md">
				<TitleComponent>Восстановление пароля</TitleComponent>
				<Description>
					Введите вашу почту, и мы отправим ссылку для сброса пароля.
				</Description>
				<input
					type="email"
					placeholder="Введите email"
					{...register("email", { required: true })}
					className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
				/>
				<button
					type="submit"
					className="bg-black text-white py-2 rounded-md hover:bg-gray-900">
					Отправить письмо
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
