import React from "react";

const TextSkeleton = () => {
	return (
		<div className="w-full py-2 md:px-5 px-0 flex flex-col gap-2 animate-pulse">
			<div className="skeleton h-10" />
			<div className="skeleton h-40" />
			<div className="skeleton h-10" />
			<div className="skeleton h-10" />

			<style jsx>{`
				.skeleton {
					width: 100%;
					border-radius: 0.5rem;
					background: linear-gradient(
						90deg,
						#b1c0ca 25%,
						#c5d3dc 50%,
						#b1c0ca 75%
					);
					background-size: 200% 100%;
					animation: shimmer 1.2s infinite;
				}

				@keyframes shimmer {
					0% {
						background-position: -200% 0;
					}
					100% {
						background-position: 200% 0;
					}
				}
			`}</style>
		</div>
	);
};

export default TextSkeleton;
