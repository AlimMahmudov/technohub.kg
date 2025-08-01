"use client";

import React, { useState } from "react";
import Hero from "./hero/Hero";
import Menu from "../navbar/menu/Menu";
import Discount from "./discount/Discount";
import Header from "../navbar/header/Header";

export interface FilterState {
  [key: string]: (string | number)[];
}

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});

  return (
    <div className="w-full">
      <Header />
      <div className="flex w-full">
        <Menu
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="w-full overflow-hidden">
          <Discount />
          <Hero selectedFilters={selectedFilters} />z
        </div>
      </div>
    </div>
  );
};

export default HomePage;
