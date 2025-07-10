import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React from "react";

const Hero = () => {
	return (
		<div className="bg-[red] py-20 p-10 md:flex hidden flex-col gap-2">
			<Title className="">Hello world</Title>
			<TitleComponent>TypeScript</TitleComponent>
			<Description>JavaScript</Description>
		</div>
	);
};

export default Hero;
