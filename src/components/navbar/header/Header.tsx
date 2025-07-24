"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import BurgerMenu from "./BurgerMenu";

import { AiOutlineMenu } from "react-icons/ai";
import { navbar } from "@/lib/data";
import { IoCartOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { useGetUserQuery, useLoautUserMutation } from "@/redux/api/auth";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleBox = () => setIsOpen((prev) => !prev);

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
		<header className="w-full  bg-transparent ">
			<div className="flex items-center z-50 w-full h-[60px] bg-[#141414]">
				<div className="container">
					<div className="flex justify-between py-2 items-center">
						<div className="flex items-center  justify-between   w-full">
							<div className="md:hidden text-white flex w-full">
								<button
									onClick={toggleBox}
									className="flex items-center justify-center text-[26px] font-[800]">
									<AiOutlineMenu />
								</button>
							</div>

							<Link
								href={PAGE.HOME}
								className="text-[#999999]  text-[24px] w-full  text-center md:text-start ">
								TECHNOHUB
							</Link>

							<div className="md:flex hidden gap-6 justify-center  w-full">
								{navbar.map((el, index) => (
									<Link
										key={index}
										href={el.href}
										className="text-[14px] text-white  font-[400]  ">
										{el.name}
									</Link>
								))}
							</div>

							<div className="flex gap-2 w-full justify-end  ">
								<button className="text-white bg-[#64646469] p-2 text-[20px] rounded-[6px]">
									<Link href={PAGE.BASKET}>
										<IoCartOutline />
									</Link>
								</button>
								{!user ? (
									<button className="text-white md:flex hidden text-[14px] bg-[#64646469] p-1 px-2 justify-center items-center gap-2 rounded-[6px]">
										<Link className="flex items-center gap-1" href={PAGE.LOGIN}>
											Войти <RiUserLine size={16} />
										</Link>
									</button>
								) : (
									<div className="  items-center gap-4 text-white md:flex hidden text-[14px] bg-[#64646469] p-1 px-1 justify-center rounded-[6px]">
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
							</div>
						</div>
					</div>
				</div>
			</div>

			<BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</header>
	);
};

export default Header;
