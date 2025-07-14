import Link from "next/link";
import React from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { Description } from "../ui/text/Description";

const Login = () => {
  return (
    <div className="container">
      <div className="w-full py-2 md:px-5 px-0">
        <div className="p-0 mt-[14px]">
          <Title>
            <Link href="/">Technohub.kg</Link>
          </Title>
        </div>
      </div>
      <div className="w-full flex justify-center md:px-5 px-0 mt-4">
        <div className="md:w-[40%] w-full flex flex-col items-center md:px-5 py-2 p-2 gap-5 rounded-[10px] border border-gray-300 shadow-md">
          <div className="w-full flex flex-col gap-2 items-center text-center">
            <TitleComponent>Введите номер Войти</TitleComponent>
            <Description>
              Мы отправим код или позвоним. Отвечать на звонок не нужно. Код
              может прийти на почту или в СМС
            </Description>
          </div>
          <div className="w-full flex flex-col gap-3">
            <input
              className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
              type="text"
              placeholder="Имя"
            />
            <input
              className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-300"
              type="text"
              placeholder="Телефон"
            />
            <button className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]">
              Отправить
            </button>
          </div>
          <div className="w-full flex justify-center">
            <h1 className="flex gap-1">
              Нет аккаунта?
              <span className="text-blue-600">
                <Link href="/register">Зарегистрируйтесь</Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
