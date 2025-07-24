"use client";
import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import { usePathname } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";

interface LayoutPageProps {
	children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
	const pathname = usePathname();

	const isAuthPage =
		pathname === PAGE.LOGIN ||
		pathname === PAGE.REGISTER ||
		pathname === PAGE.FORGOT ||
		pathname === PAGE.CONFIRM;

	return (
		<div className="flex flex-col justify-between min-h-[100vh] bg-[#f3f2f2]">
			{!isAuthPage && <Header />}
			<div className="flex w-full">
				{!isAuthPage && <Menu />}
				<main
					className={`w-full bg-[#f3f2f2] ${
						isAuthPage ? "md:w-[100%]" : "md:w-[80%]"
					}`}>
					{children}
				</main>
			</div>
		</div>
	);
};

export default LayoutPage;
