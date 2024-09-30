// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

// Styles
import { Inter } from "next/font/google";
import "aos/dist/aos.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";

// Components
import Features from "@/components/homepage/features";
import FeaturesBlocks from "@/components/homepage/features-blocks";
import Header from "@/components/homepage/ui/header";
import Footer from "@/components/homepage/ui/footer";
import HomePage from "@/components/homepage/home";

// Material UI
import HouseIcon from "@mui/icons-material/House";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function Home() {
	useEffect(()=> {
		async function fn() {
			await fetch("https://krab-documents-qa.s3.us-east-2.amazonaws.com/03e0c0ee-ad29-4d2e-9607-e02d16bd215d.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2A4UUNEKS5INA7X7%2F20240930%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240930T010950Z&X-Amz-Expires=3600&X-Amz-Signature=e72947adc7e290ab4fa52a958be657b5496ce8321c5ae09fe7caa8f77c395dd1&X-Amz-SignedHeaders=host&x-id=GetObject")	
		}
		fn()
	}, [])
	return (
		<div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
			<Head>
				<title>RoomEase</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<HomePage />
				<FeaturesBlocks />
				<Features />
			</main>
			<Footer />
		</div>
	);
}
