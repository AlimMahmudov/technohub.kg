"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Props {
	images?: { id: number; image: string | null }[]; // ← Добавьте string | null
	name: string;
}

const Gallery: React.FC<Props> = ({ images = [] }) => {
	useEffect(() => {
		Fancybox.bind('[data-fancybox="gallery"]', {});
		return () => Fancybox.destroy();
	}, []);

	// Фильтруем изображения с null и используем fallback
	const validImages = images.filter((img) => img.image !== null);
	const firstImage = validImages[0]?.image ?? "/fallback.jpg";

	return (
		<div className="md:w-1/2 w-full flex flex-col gap-1 bg-white rounded-[10px] border border-gray-200 p-3 shadow-md md:sticky relative top-0 md:top-[100px] h-fit">
			<div className=" relative w-full max-w-[600px] h-[400px] overflow-hidden">
				<a href={firstImage} data-fancybox="gallery" >
					<Image
						src={firstImage}
						alt=""
						fill
						className="object-cover  md:h-full rounded-[10px]"
					/>
				</a>
			</div>

			<div className="flex gap-1 mt-2">
				{validImages.slice(0, 2).map((img) => (
					<a
						key={img.id}
						href={img.image!} // ← Используем non-null assertion т.к. уже отфильтровали
						data-fancybox="gallery"
						 
						className="block w-full relative md:max-w-[200px] max-w-[150px] h-[100px] rounded-[10px] overflow-hidden">
						<Image
							src={img.image!}
							alt=""
							fill
							className="object-cover w-full h-full"
						/>
					</a>
				))}
				{validImages.length > 2 && (
					<div className="relative w-full h-[100px] rounded-[10px] overflow-hidden">
						<a
							href={validImages[2].image!}
							data-fancybox="gallery"
							 >
							<Image
								src={validImages[2].image!}
								alt=""
								fill
								className="object-cover w-full h-full brightness-50"
							/>
							<div className="absolute inset-0 flex justify-center items-center text-white font-bold text-xl">
								+{validImages.length - 2}
							</div>
						</a>
						{validImages.slice(3).map((img) => (
							<a
								key={img.id}
								href={img.image!}
								data-fancybox="gallery"
								 
								className="hidden"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Gallery;
