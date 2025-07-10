import Image from "next/image";
import React from "react";
import laptop from "@/shared/image/laptop.jpeg";

const Detail = () => {
  return (
    <div className="container">
      <div className="w-full py-5 px-5 mt-[80px] flex gap-4">
        <div className="w-full h-[425px] flex flex-col gap-1 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md">
          <div className="w-full h-[300px] rounded-[10px] overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={laptop}
              alt="product"
            />
          </div>
          <div className="flex gap-1">
            <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={laptop}
                alt="product"
              />
            </div>
            <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={laptop}
                alt="product"
              />
            </div>
            <div className="w-full h-[100px] rounded-[10px] overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={laptop}
                alt="product"
              />
            </div>
            <div className="w-full h-[100px] rounded-[10px] overflow-hidden bg-black flex justify-center items-center">
              <h1 className="text-[22px] text-white">+5</h1>
            </div>
          </div>
        </div>
        {/* <div className="w-full flex flex-col gap-2 bg-white border border-gray-200 p-3 shadow-md">
          <div className="">
            <h1>Ноутбук Acer Aspire Lite AL16-52P-31UT Intel</h1>
            <h2>Цена: 45200 сом</h2>
          </div>
          <div className="">
            <h1 className="text-[16px] font-[600]">Основные характеристики</h1>
            <p>Экран: 16" IPS 1920x1200 (WUXGA)</p>
            <p>Операционная система: нет</p>
          </div>
          <div className="">
            <h1>Память</h1>
            <p>Оперативная память: 64GB DDR5</p>
            <p>Накопительная память: 256GB SSD NVMe</p>
          </div>
          <div className="">
            <h1>Процессор</h1>
            <p>Модель: Intel Core i3-1305U</p>
            <p>Количество ядер/потоков: 5/6</p>
            <p>Максимальная тактовая частота: 4500 МГц</p>
            <p>Объем кэша: 10 Мб</p>
          </div>
          <div className="">
            <h1>Видеокарта</h1>
            <p>Модель: Intel Graphics</p>
            <p>Объем видеопамяти: SMA</p>
          </div>
          <div className="">
            <h1>Интерфейсы и порты</h1>
            <p>3 x USB Type-A</p>
            <p>1 x USB Type-С</p>
            <p>1 х HDMI</p>
            <p>1 x Audio 3.5 mm</p>
          </div>
          <div className="">
            <h1>Дополнительные спецификации</h1>
            <p>Подсветка клавиатуры: нет</p>
            <p>Емкость аккумулятора: 58 ВтЧ</p>
          </div>
          <div className="">
            <h1>Физические характеристики</h1>
            <p>Размеры: 358 х 247 х 18.9 мм</p>
            <p>Вес: от 1.7 кг</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Detail;
