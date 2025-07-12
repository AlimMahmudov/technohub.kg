import Image from "next/image";
import React from "react";
import { useCard } from "../ui/card/Card";

const Basket = () => {
  const { card } = useCard();

  return (
    <div className="container">
      <div className="w-full py-2 md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <h1 className="text-[23px] font-semibold">Корзина</h1>
        </div>
      </div>
      <div className="w-full py-5 md:px-5 px-0">
        <div className="flex flex-col gap-[10px] w-full">
          {card.map((el) => (
            <div
              key={el.id}
              className="bg-white flex gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md"
            >
              <div className="w-[180px] h-[80px] rounded-[10px] overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={el.image}
                  alt="product"
                />
              </div>
              <div className="w-full flex md:flex-row flex-col">
                <div className="w-full justify-center flex items-center">
                  <h1 className="w-full text-[20px] font-[600]">{el.text}</h1>
                </div>

                <div className="md:w-[40%] mt-2 md:mt-0 w-full flex items-center">
                  <div className="flex items-center w-full justify-between gap-1">
                    <h2 className="flex text-[18px] font-[600] text-black">
                      {el.price} сом
                    </h2>
                    <div className="flex py-1 text-[18px] gap-1 font-[600] bg-gray-200 rounded-[10px]">
                      <button className="px-2">+</button>
                      <div className="px-2">10</div>
                      <button className="px-2">-</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <h1 className="flex items-center gap-1 text-[23px] font-semibold">
            <span className=" text-[16px]">Итого:</span> 29922 сом
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center py-2 md:px-5 mb-5 px-0">
        <div className="flex flex-col items-center rounded-[10px] md:w-[60%] w-[100%] h-full gap-2 bg-white border border-gray-200 p-3 shadow-md">
          <h1 className="text-[23px] font-semibold">
            Заполните пожалуйста Ваши данные для заказа
          </h1>
          <input
            className="bg-white mt-5 rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
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
            placeholder="Эмайл"
          />
          <textarea
            className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
            placeholder="Сообщения"
          ></textarea>
          <button className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
