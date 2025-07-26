"use client";

import { FilterState } from "@/components/home/HomePage";
import { useGetLaptopQuery } from "@/redux/api/laptop";
import { useState, useMemo } from "react";
import { FaHdd, FaTags, FaWindows } from "react-icons/fa";
import { GiProcessor, GiVideoCamera } from "react-icons/gi";
import { MdMemory, MdMonitor } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";

interface MenuProps {
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function Menu({
  selectedFilters,
  setSelectedFilters,
}: MenuProps) {
  const { data = [] } = useGetLaptopQuery();

  const handleCheckboxChange = (field: string, value: string | number) => {
    setSelectedFilters((prev) => {
      const current = prev[field] || [];
      const isSelected = current.includes(value);
      const updated = isSelected
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [field]: updated };
    });
  };

  const [openSections, setOpenSections] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev === title ? null : title));
  };

  const filters = useMemo(() => {
    const getUnique = <T,>(key: keyof (typeof data)[0]): T[] =>
      Array.from(new Set(data.map((item) => item[key] as T))).filter(Boolean);

    return [
      {
        title: "brend",
        field: "brand",
        options: getUnique<number>("brand"),
        icon: <FaTags />,
      },
      {
        icon: <MdMonitor />,
        title: "Диагональ экрана",
        field: "screen_size",
        options: getUnique<number>("screen_size"),
      },
      {
        icon: <GiProcessor />,
        title: "Тип процессора",
        field: "cpu_model",
        options: getUnique<number>("cpu_model"),
      },
      {
        icon: <MdMemory />,
        title: "Объём оперативной памяти",
        field: "ram_size_gb",
        options: getUnique<number>("ram_size_gb"),
      },
      {
        icon: <GiVideoCamera />,
        title: "Чипсет видео",
        field: "gpu_model",
        options: getUnique<number>("gpu_model"),
      },
      {
        icon: <FaHdd />,
        title: "Объём жесткого диска",
        field: "storage_size_gb",
        options: getUnique<number>("storage_size_gb"),
      },
      {
        icon: <FaWindows />,
        title: "Предустановленная ОС",
        field: "operating_system",
        options: getUnique<number>("operating_system"),
      },
    ];
  }, [data]);

  return (
    <div className="min-w-[200px] bg-[#e7e6e6] min-h-[100vh] text-black md:flex hidden p-2">
      <div className="gap-3 w-full flex flex-col">
        {filters.map((filter) => {
          const isOpen = openSections === filter.title;

          return (
            <div key={filter.title}>
              <div
                className={`rounded-[6px] px-2 py-1 text-gray-800 flex items-center gap-3 cursor-pointer ${
                  isOpen ? "bg-[#cfcfcf]" : "bg-transparent"
                }`}
                onClick={() => toggleSection(filter.title)}
              >
                <h1 className="font-normal text-[22px]">{filter.icon}</h1>
                <h1 className="font-normal text-[16px]">{filter.title}</h1>
              </div>

              {isOpen && (
                <ul className="px-3 py-1 space-y-1">
                  {filter.options.map((option) => (
                    <li key={option?.toString()}>
                      <label className="flex items-center gap-2 font-normal text-[14px] text-gray-700">
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[filter.field]?.includes(option) ||
                            false
                          }
                          onChange={() =>
                            handleCheckboxChange(filter.field, option)
                          }
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        {Object.values(selectedFilters).some((arr) => arr.length > 0) && (
          <div
            className="rounded-[6px] px-2 py-1 text-gray-800 flex items-center gap-3 cursor-pointer hover:bg-[#d8d8d8]"
            onClick={() => setSelectedFilters({})}
          >
            <h1 className="font-normal text-[22px]">
              <RiResetLeftLine />
            </h1>
            <h1 className="font-normal text-[16px]">Сбросить фильтры</h1>
          </div>
        )}
      </div>
    </div>
  );
}
