import React from "react";
import { IDetail } from "./types";

const Specs = ({ data }: { data: IDetail }) => {
  return (
    <>
      <div className="w-full flex flex-col rounded-[10px] gap-2 md:bg-white bg-transparent md:border border-none border-gray-200 p-3 md:shadow-md">
        <div>
          <h1 className="text-[16px] font-[600]">Основные характеристики</h1>

          {data.brand && (
            <p className="text-[16px]">
              <span className="text-gray-500">Бренд:</span> {data.brand}
            </p>
          )}

          {data.screen_size && (
            <p className="text-[16px]">
              <span className="text-gray-500">Размер экрана (дюймы):</span>{" "}
              {data.screen_size}
            </p>
          )}
        </div>

        <div>
          <h1 className="text-[16px] font-[600]">Память</h1>
          {data.ram_size_gb && (
            <p className="text-[16px]">
              <span className="text-gray-500">Оперативная память (ГБ):</span>{" "}
              {data.ram_size_gb} ГБ
            </p>
          )}

          {data.storage_size_gb && (
            <p className="text-[16px]">
              <span className="text-gray-500">Объем SSD (ГБ):</span>{" "}
              {data.storage_size_gb} ГБ
            </p>
          )}
        </div>

        <div>
          <h1 className="text-[16px] font-[600]">Процессор</h1>
          {data.cpu_model && (
            <p className="text-[16px]">
              <span className="text-gray-500">Модель процессора:</span>{" "}
              {data.cpu_model}
            </p>
          )}

          {data.cpu_cores && (
            <p className="text-[16px]">
              <span className="text-gray-500">Количество ядер:</span>{" "}
              {data.cpu_cores}
            </p>
          )}

          {data.cpu_threads && (
            <p className="text-[16px]">
              <span className="text-gray-500">Количество потоков:</span>{" "}
              {data.cpu_threads}
            </p>
          )}
        </div>

        <div>
          <h1 className="text-[16px] font-[600]">Видеокарта</h1>
          {data.gpu_model && (
            <p className="text-[16px]">
              <span className="text-gray-500">Модель видеокарты:</span>{" "}
              {data.gpu_model}
            </p>
          )}
        </div>

        <div>
          <h1 className="text-[16px] font-[600]">Дополнительно</h1>
          {data.keyboard_backlight && (
            <p className="text-[16px]">
              <span className="text-gray-500">Подсветка клавиатуры:</span>{" "}
              {data.keyboard_backlight ? "Есть" : "Нет"}
            </p>
          )}

          {data.operating_system && (
            <p className="text-[16px]">
              <span className="text-gray-500">Операционная система:</span>{" "}
              {data.operating_system}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Specs;
