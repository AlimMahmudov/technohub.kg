"use client";

import React, { useState } from "react";
import Hero from "./hero/Hero";
import Menu from "../navbar/menu/Menu";
import Discount from "./discount/Discount";
import Header from "../navbar/header/Header";
import { usePathname } from "next/navigation";
import { useGetLaptopQuery } from "@/redux/api/laptop";

export interface FilterState {
  [key: string]: (string | number)[];
}

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
  const pathname = usePathname();
  const { data } = useGetLaptopQuery();
  const hasDiscount = data?.some((laptop) => laptop.discount > 0);
  return (
    <div className="w-full">
      {pathname === "/" && (
        <Header
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      )}
      <div className="flex w-full">
        <Menu
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="w-full overflow-hidden">
          {hasDiscount && <Discount />}
          <Hero selectedFilters={selectedFilters} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
