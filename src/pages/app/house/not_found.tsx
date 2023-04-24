// Next
import Head from "next/head";
import Image from "next/image";

// React
import * as React from "react";

// Styles
import { Inter } from "next/font/google";


const NotFoundError = () => {
	return (
		<>
			<Head>
				<title>Not Found Error</title>
				<meta name="description" content="Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-[#FAFDFD] h-screen">
				<div className="flex flex-col items-center justify-center h-full">
					<Image src="/404_house.webp" alt="Not Found" width={500} height={500} />
					<h1 className="text-5xl font-bold">404</h1>
					<h2 className="text-2xl font-bold">Casa no encontrada. </h2>
					<h2 className="text-xl font-semibold italic text-neutral-30">
						No perteneces a esta casa, o la casa no existe.
					</h2>
				</div>
			</main>
		</>
	);
};

export default NotFoundError;
