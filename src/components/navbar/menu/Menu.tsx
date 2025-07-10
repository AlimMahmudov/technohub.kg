import { filters } from "@/lib/data";
import { useState } from "react";

export default function Menu() {
  const [openSections, setOpenSections] = useState<string | null>(
    filters[0].title
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev === title ? null : title));
  };

  return (
    <div className="min-w-[200px] bg-[#e7e6e6] min-h-[100vh] text-black   md:flex hidden p-2 ">
      <div className="gap-3 w-full flex flex-col">
        {filters.map((filter) => {
          const isOpen = openSections === filter.title;
          return (
            <div key={filter.title}>
              <div
                className={`rounded-[6px] px-2 py-1 text-gray-800  flex items-center gap-3 cursor-pointer ${
                  isOpen ? "bg-[#cfcfcf]" : "bg-transparent"
                }`}
                onClick={() => toggleSection(filter.title)}
              >
                <h1 className="font-normal text-[22px]">{filter.icon} </h1>
                <h1 className="font-normal leading-[20px] text-[16px]">
                  {filter.title}
                </h1>
              </div>
              {isOpen && (
                <ul className="px-3 py-1 space-y-1">
                  {filter.options.map((option) => (
                    <li key={option}>
                      <label className="flex items-center gap-2 font-normal text-[14px] text-gray-700">
                        <input type="checkbox" />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
