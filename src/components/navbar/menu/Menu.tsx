import { navbar } from "@/lib/data";
import Link from "next/link";
import React from "react";

const Menu = () => {
	return (
		<div className=" w-[200px] bg-gray-600 min-h-[100vh] text-white py-20 p-2">
			<div className="gap-6    w-full flex flex-col">
				{navbar.map((el, index) => (
					<Link
						key={index}
						href={el.href}
						className="text-[18px] text-white  font-[400]">
						{el.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
