"use client";

import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { navbar } from "@/lib/data";
import { useState, useMemo } from "react";
import { RiResetLeftLine } from "react-icons/ri";
import { useGetUserQuery, useLoautUserMutation } from "@/redux/api/auth";
import { useGetLaptopQuery } from "@/redux/api/laptop";
import { FaHdd, FaMemory, FaTags, FaWindows } from "react-icons/fa";
import { MdMemory, MdMonitor } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { usePathname } from "next/navigation";

interface FilterState {
  [key: string]: (string | number)[];
}

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const BurgerMenu = ({
  isOpen,
  setIsOpen,
  selectedFilters,
  setSelectedFilters,
}: BurgerMenuProps) => {
  const [openSections, setOpenSections] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev === title ? null : title));
  };

  const { data: userData } = useGetUserQuery();
  const [logoutUser, { isLoading }] = useLoautUserMutation();

  const user = userData?.[0];

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh");
      if (!refresh_token) return;
      await logoutUser({ refresh_token }).unwrap();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const { data = [] } = useGetLaptopQuery();

  const filteredData = data.filter((item) => !item.discount);

  const filters = useMemo(() => {
    const getUnique = <T,>(key: keyof (typeof filteredData)[0]): T[] =>
      Array.from(new Set(filteredData.map((item) => item[key] as T))).filter(
        Boolean,
      );

    return [
      {
        icon: <FaTags />,
        title: "Бренд",
        field: "brand",
        options: getUnique<number>("brand"),
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
        icon: <FaMemory />,
        title: "Объём оперативной памяти",
        field: "ram_size_gb",
        options: getUnique<number>("ram_size_gb"),
      },
      {
        icon: <MdMemory />,
        title: "Видеокарта",
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
  }, [filteredData]);

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

  const pathname = usePathname();

  return (
    <div
      id="menu-overlay"
      className={`fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-[100vh] z-50 transition-opacity duration-700 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-0 left-0 w-[90%] h-full bg-[#e7e6e6] overflow-y-scroll p-4 flex flex-col justify-start gap-4 shadow-lg z-50 transition-transform duration-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Верхняя часть: логин/профиль и закрытие меню */}
        <div className="flex justify-between items-center mt-6">
          {/* {!user ? (
            <button className="text-white flex text-[14px] bg-[#000000] p-1 px-2 justify-center items-center gap-2 rounded-[6px]">
              <Link className="flex items-center gap-1" href={PAGE.LOGIN}>
                Войти <RiUserLine size={16} />
              </Link>
            </button>
          ) : (
            <div className="items-center gap-4 text-white flex text-[14px] bg-[#000000] p-1 px-1 justify-center rounded-[6px]">
              <h1 className="font-semibold flex items-center justify-center pl-2 gap-2">
                <RiUserLine size={16} />
                {user.username}
              </h1>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-[#ec4f4f] hover:bg-red-700 text-[14px] transition px-3 py-1 rounded text-white"
              >
                Выйти
              </button>
            </div>
          )} */}
          <div className=""></div>

          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center text-black justify-center text-[32px] font-[800]"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Навигация */}
        <nav className="flex flex-col gap-2 justify-center w-full">
          {navbar.map((el, index) => (
            <Link
              key={index}
              href={el.href}
              className="text-[16px] text-gray-800 font-[400]"
              onClick={() => setIsOpen(false)}
            >
              {el.name}
            </Link>
          ))}
        </nav>

        {/* Фильтры */}
        {pathname === "/" && (
          <div className="gap-3 w-full flex flex-col mt-4">
            {filters.map((filter) => {
              const isSectionOpen = openSections === filter.title;
              return (
                <div key={filter.title}>
                  <div
                    className={`rounded-[6px] px-2 py-1 text-gray-800 flex items-center gap-3 cursor-pointer ${
                      isSectionOpen ? "bg-[#cfcfcf]" : "bg-transparent"
                    }`}
                    onClick={() => toggleSection(filter.title)}
                  >
                    <h1 className="font-normal text-[22px]">{filter.icon}</h1>
                    <h1 className="font-normal text-[16px]">{filter.title}</h1>
                  </div>

                  {isSectionOpen && (
                    <ul className="px-3 py-1 space-y-1">
                      {filter.options.map((option) => (
                        <li key={option?.toString()}>
                          <label className="flex items-center gap-2 font-normal text-[14px] text-gray-700">
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filter.field]?.includes(
                                  option,
                                ) || false
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
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
