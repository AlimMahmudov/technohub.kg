"use client";

import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { filters, navbar } from "@/lib/data";
import { useState } from "react";
import { RiUserLine } from "react-icons/ri";
import { PAGE } from "@/config/pages/public-page.config";
import { useGetUserQuery, useLoautUserMutation } from "@/redux/api/auth";

const BurgerMenu = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	const [openSections, setOpenSections] = useState<string | null>(null);

	const toggleSection = (title: string) => {
		setOpenSections((prev) => (prev === title ? null : title));
	};

	const { data } = useGetUserQuery();
	const [logoutUser, { isLoading }] = useLoautUserMutation();

	 
	 
	const user = data?.[0];

	const handleLogout = async () => {
		try {
			const refresh_token = localStorage.getItem("refresh");

			if (!refresh_token) {
				console.warn("Refresh token not found");
				return;
			}

			await logoutUser({ refresh_token }).unwrap();

			localStorage.removeItem("access");
			localStorage.removeItem("refresh");

			window.location.reload();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div
			id="menu-overlay"
			className={`fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-[100vh] z-50 transition-opacity duration-700 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				className={`fixed top-0 left-0 w-[90%] h-full bg-[#e7e6e6] overflow-y-scroll scroll p-4 flex flex-col justify-start gap-4 shadow-lg z-50 transition-transform duration-700 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<div className="flex justify-between items-center mt-6">
					{!user ? (
						<button className="text-white flex text-[14px] bg-[#000000] p-1 px-2 justify-center items-center gap-2 rounded-[6px]">
							<Link className="flex items-center gap-1" href={PAGE.LOGIN}>
								Войти <RiUserLine size={16} />
							</Link>
						</button>
					) : (
						<div className="  items-center gap-4 text-white flex   text-[14px] bg-[#000000] p-1 px-1 justify-center rounded-[6px]">
							<h1 className="font-semibold flex items-center justify-center pl-2 gap-2">
								<RiUserLine size={16} />
								{user.username}
							</h1>
							<button
								onClick={handleLogout}
								disabled={isLoading}
								className="bg-[#ec4f4f] hover:bg-red-700 text-[14px] transition px-3 py-1 rounded text-white">
								Выйти
							</button>
						</div>
					)}

					<button
						onClick={() => setIsOpen(false)}
						className="flex items-center text-black justify-center text-[32px] font-[800]">
						<IoCloseOutline />
					</button>
				</div>

				<div className="flex flex-col gap-2 justify-center w-full">
					{navbar.map((el, index) => (
						<Link
							key={index}
							href={el.href}
							className="text-[16px] text-gray-800 font-[400]"
							onClick={() => setIsOpen(false)}>
							{el.name}
						</Link>
					))}
				</div>

				<div className="gap-3 w-full flex flex-col mt-2">
					{filters.map((filter) => {
						const isOpen = openSections === filter.title;
						return (
							<div key={filter.title}>
								<div
									className={`rounded-[6px] px-2 py-1 text-gray-800 flex items-center gap-3 cursor-pointer ${
										isOpen ? "bg-[#cfcfcf]" : "bg-transparent"
									}`}
									onClick={() => toggleSection(filter.title)}>
									<h1 className="font-normal text-[22px]">{filter.icon} </h1>
									<h1 className="font-normal leading-[20px] text-[16px]">
										{filter.title}
									</h1>
								</div>
								{isOpen && (
									<ul className="px-3 py-1 space-y-1">
										{filter.options.map((option) => (
											<li key={option} onClick={() => setIsOpen(false)}>
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
		</div>
	);
};

export default BurgerMenu;
