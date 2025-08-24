"use client";

import Header from "@/components/navbar/header/Header";
import LayoutPage from "@/components/navbar/LayoutPage";
import { store } from "@/redux/store";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useState } from "react";
import { Provider } from "react-redux";

interface LayoutPageProps {
	children: ReactNode;
}

export interface FilterState {
	[key: string]: (string | number)[];
}

const Providers: FC<LayoutPageProps> = ({ children }) => {
	const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
	const pathname = usePathname();

	const showHeader = pathname !== "/";

	return (
		<div>
			<Provider store={store}>
			{showHeader && (
				<Header
					selectedFilters={selectedFilters}
					setSelectedFilters={setSelectedFilters}
				/>
			)}
				<LayoutPage>{children}</LayoutPage>
			</Provider>
		</div>
	);
};

export default Providers;
