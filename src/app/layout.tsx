import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import Providers from "./provider";
import StructuredData from "@/components/StructuredData";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Technohub.kg",
	description: "Technohub.kg - магазин электроники в Кыргызстане. Ноутбуки, телефоны, техника по выгодным ценам.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<StructuredData />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
