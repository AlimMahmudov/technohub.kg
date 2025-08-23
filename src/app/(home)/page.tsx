import HomePage from "@/components/home/HomePage";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "Technohub.kg",
	description: "Technohub.kg - магазин электроники в Кыргызстане. Ноутбуки, телефоны, техника по выгодным ценам. Гарантия, рассрочка, доставка по Бишкеку и всей стране.",
	url: "https://technohub-kg.vercel.app/",
	image: "https://images.prom.ua/6134218801_w600_h600_6134218801.jpg",
});

const Home = () => {
	return (
		<div>
			<HomePage />
		</div>
	);
};

export default Home;
