// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
