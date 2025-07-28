"use client";

import React, { useState } from "react";
import Hero from "./hero/Hero";
import Menu from "../navbar/menu/Menu";
import Discount from "./discount/Discount";

export interface FilterState {
  [key: string]: (string | number)[];
}

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});

  return (
    <div className="flex w-full">
      <Menu
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-full">
        <Discount />
        <Hero selectedFilters={selectedFilters} />
      </div>
    </div>
  );
};

export default HomePage;
