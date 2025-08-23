import React from "react";
import logo from "@/shared/image/logo_techno2.png";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import Image from "next/image";

const HeaderDetail = () => {
	return (
		<div className="flex justify-center items-center z-50 w-full h-[60px] bg-[#141414]">
			<Link
				href={PAGE.HOME}
				className="text-[#999999]  text-[20px] w-[200px]  font-[600] flex items-center gap-1 text-center md:text-start ">
				<Image
					className=" md:w-[120px] w-[60px] rounded-[50px]"
					src={logo}
					alt="img"
				/>
				TechnoHub_kg
			</Link>
		</div>
	);
};

export default HeaderDetail;
