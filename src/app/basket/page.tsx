import Basket from "@/components/basket/Basket";
import HeaderDetail from "@/components/navbar/header/HeaderDetail";
import React from "react";

const page = () => {
	return (
		<>
			<HeaderDetail />
			<Basket />;
		</>
	);
};

export default page;
