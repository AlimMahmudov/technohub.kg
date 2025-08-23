import React from "react";
import { IDetail } from "./types";

const Specs = ({ data }: { data: IDetail }) => {
	return (
		<>
			<div className="w-full flex flex-col rounded-[10px] gap-2 md:bg-white bg-transparent md:border border-none border-gray-200 p-3 md:shadow-md">
				<div>
					<h1 className="text-[16px] font-[600]">Основные характеристики</h1>

					<p className="text-[16px]">
						<span className="text-gray-500">Бренд:</span> {data.brand}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Размер экрана (дюймы):</span>{" "}
						{data.screen_size}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Тип экрана:</span>{" "}
						{data.screen_type}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Разрешение экрана:</span>{" "}
						{data.resolution}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Частота обновления (Гц):</span>{" "}
						{data.refresh_rate} Гц
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Память</h1>
					<p className="text-[16px]">
						<span className="text-gray-500">Оперативная память (ГБ):</span>{" "}
						{data.ram_size_gb} ГБ
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Объем SSD (ГБ):</span>{" "}
						{data.storage_size_gb} ГБ
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Тип накопителя:</span>{" "}
						{data.storage_type}
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Процессор</h1>
					<p className="text-[16px]">
						<span className="text-gray-500">Модель процессора:</span>{" "}
						{data.cpu_model}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Количество ядер:</span>{" "}
						{data.cpu_cores}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Количество потоков:</span>{" "}
						{data.cpu_threads}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">
							Макс. частота процессора (МГц):
						</span>{" "}
						{data.cpu_frequency_mhz} МГц
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Видеокарта</h1>
					<p className="text-[16px]">
						<span className="text-gray-500">Модель видеокарты:</span>{" "}
						{data.gpu_model}
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Сети</h1>

					<p className="text-[16px]">
						<span className="text-gray-500">Ethernet:</span>{" "}
						{data.ethernet ? "Есть" : "Нет"}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Bluetooth:</span>{" "}
						{data.bluetooth ? "Есть" : "Нет"}
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Порты</h1>

					<p className="text-[16px]">
						<span className="text-gray-500">HDMI:</span>{" "}
						{data.hdmi_count ? "Есть" : "Нет"}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Ethernet-порт:</span>{" "}
						{data.ethernet_port ? "Есть" : "Нет"}
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Аудиоразъём:</span>{" "}
						{data.audio_jack ? "Есть" : "Нет"}
					</p>
				</div>

				<div>
					<h1 className="text-[16px] font-[600]">Дополнительно</h1>
					<p className="text-[16px]">
						<span className="text-gray-500">Подсветка клавиатуры:</span>{" "}
						{data.keyboard_backlight ? "Есть" : "Нет"}
					</p>

					<p className="text-[16px]">
						<span className="text-gray-500">Емкость аккумулятора (Вт·ч):</span>{" "}
						{data.battery_capacity_wh} Вт·ч
					</p>
					<p className="text-[16px]">
						<span className="text-gray-500">Операционная система:</span>{" "}
						{data.operating_system}
					</p>
				</div>
			</div>
		</>
	);
};

export default Specs;
