"use client";
import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Name } from "@/components/ui/text/Name";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IDetail } from "./types";

interface IContact {
  phone_number: string;
  full_name: string;
  description: string;
  link: string;
}

const BuyModal = ({ data, onClose }: { data: IDetail; onClose: () => void }) => {
  const { register, handleSubmit, reset } = useForm<IContact>();

  const onSubmit: SubmitHandler<IContact> = async (formData) => {
    try {
      await axios.post("https://api.technohub.kg/store/order/", {
        ...formData,
        link: window.location.href,
      });
      toast.success("Заявка отправлена!");
      reset();
      onClose();
    } catch {
      toast.error("Ошибка при отправке");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-4 w-full max-w-[800px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Покупка ноутбука</h2>
          <button onClick={onClose}><IoClose size={22} /></button>
        </div>
        <div className="flex flex-col md:flex-row mt-2 gap-4">
          <div className="md:w-1/2 flex flex-col gap-3">
            <Image src={data.laptop_image?.[0]?.image ?? "/fallback.jpg"} width={600} height={400} alt="product" />
            <Name>{data.name}</Name>
            <TitleComponent>{data.price} сом</TitleComponent>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col gap-2">
            <input {...register("full_name", { required: true })} placeholder="Имя" className="border p-2 rounded" />
            <input {...register("phone_number", { required: true })} placeholder="Телефон" className="border p-2 rounded" />
            <textarea {...register("description")} placeholder="Комментарий" className="border p-2 rounded h-24" />
            <button type="submit" className="bg-[#141414] text-white py-2 rounded">Отправить!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
