"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRegisterUserMutation, useLoginUserMutation } from "@/redux/api/auth";
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
  const [loginUser] = useLoginUserMutation();
  const route = useRouter();

  const success = () => {
    toast.success("🎉 Регистрация и вход выполнены!", {
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
    toast.error("❌ Не удалось зарегистрироваться. Попробуйте ещё раз.", {
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
      await registerUserMutation(data).unwrap();

      // Автоматическая авторизация после регистрации
      const loginResponse = await loginUser({
        username: data.email, // или email, зависит от API
        password: data.password,
      }).unwrap();

      // Сохраняем токены
      localStorage.setItem("access", loginResponse.access_token);
      localStorage.setItem("refresh", loginResponse.refresh_token);

      success();
      reset();
      route.push(PAGE.HOME); // или любое другое нужное направление
    } catch (e) {
      console.error("❌ Ошибка при регистрации или логине:", e);
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
      <div className="w-full flex justify-center md:px-5 px-0 mt-[70px]">
        <div className="md:w-[40%] w-full flex flex-col items-center md:px-5 py-2 gap-5 p-2 rounded-[10px] border border-gray-300 shadow-md">
          <div className="w-full flex flex-col gap-2 items-center text-center">
            <TitleComponent className="text-[20px]">Создайте аккаунт</TitleComponent>
            <Description>
              Зарегистрируйтесь, чтобы оформлять заказы, сохранять избранные товары и получать персональные предложения.
            </Description>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
            <input
              type="text"
              className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
              placeholder="Введите свое имя"
              {...register("username", { required: true })}
            />
            <input
              type="email"
              className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
              placeholder="Введите свой email адрес"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
              placeholder="Введите пароль"
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
