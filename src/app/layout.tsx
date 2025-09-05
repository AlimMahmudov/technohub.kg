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
	description:
		"Technohub.kg - магазин электроники в Кыргызстане. Ноутбуки, телефоны, техника по выгодным ценам.",
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
				{/* Yandex.Metrika */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {
									if (document.scripts[j].src === r) { return; }
								}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],
								k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104026442', 'ym');

							ym(104026442, 'init', {
								ssr:true,
								webvisor:true,
								clickmap:true,
								ecommerce:"dataLayer",
								accurateTrackBounce:true,
								trackLinks:true
							});
						`,
					}}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>

				{/* Yandex noscript */}
				<noscript>
					<div>
						<img
							src="https://mc.yandex.ru/watch/104026442"
							style={{ position: "absolute", left: "-9999px" }}
							alt=""
						/>
					</div>
				</noscript>
			</body>
		</html>
	);
}
