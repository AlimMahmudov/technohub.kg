import React from "react";
import Link from "next/link";
import { Description } from "@/components/ui/text/Description";
import { IDetail } from "./types";


const Info = ({ data }: { data: IDetail  }) => {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md">
      <h1 className="text-[24px]">{data.name}</h1>
      <p className="text-[16px]">
        <span className="text-gray-500">Цена:</span> {data.price} сом
      </p>
      <p>
        <span className="text-gray-500">Гарантия:</span> {data.warranty} мес.
      </p>
      {data.link && (
        <p>
          <span className="text-gray-500">Видео:</span>{" "}
          <Link href={data.link} className="text-blue-600">
            {data.link}
          </Link>
        </p>
      )}
      <p>
        <span className="text-gray-500">Артикул:</span> {data.articles}
      </p>
      <Description>{data.description}</Description>
    </div>
  );
};

export default Info;
