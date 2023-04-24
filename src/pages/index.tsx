// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Styles
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Material UI
import { Button } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useAuth } from "@/hooks/useAuth";
import Features from "@/components/homepage/features";
import FeaturesBlocks from "@/components/homepage/features-blocks";
import Header from "@/components/homepage/ui/header";
import Footer from "@/components/homepage/ui/footer";
import HomePage from "@/components/homepage/home";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function Home() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Head>
				<title>RoomEase</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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
