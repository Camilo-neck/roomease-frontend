"use client";

import { useState, useRef, useEffect } from "react";

export default function Features() {
	const [tab, setTab] = useState<number>(1);

	const tabs = useRef<HTMLDivElement>(null);

	const heightFix = () => {
		if (tabs.current && tabs.current.parentElement)
			tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
	};

	useEffect(() => {
		heightFix();
	}, []);

	return (
		<section className="relative">
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-12 md:pt-20">
					{/* Section header */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
						<p className="text-xl text-gray-600">
							RoomEase es la solución perfecta para mantener la armonía en tu hogar compartido. Con RoomEase, nunca más
							tendrás que preocuparte por quién hizo qué tarea o cuándo se debe limpiar el baño. ¡Haz que la convivencia
							en casa sea más fácil y feliz con RoomEase!
						</p>
					</div>
					<div className="w-full h-[10vh]"></div>
				</div>
			</div>
		</section>
	);
}
