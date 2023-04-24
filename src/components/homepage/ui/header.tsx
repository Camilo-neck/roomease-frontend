"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import Dropdown from "@/components/homepage/utils/dropdown";
import MobileMenu from "./mobile-menu";
import { Avatar, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { logoutUser } from "@/controllers/auth.controllers";

export default function Header() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [top, setTop] = useState<boolean>(true);

	// detect whether user has scrolled the page down by 10px
	const scrollHandler = () => {
		window.pageYOffset > 10 ? setTop(false) : setTop(true);
	};

	useEffect(() => {
		scrollHandler();
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [top]);

	return (
		<header
			className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
				!top ? "bg-white backdrop-blur-sm shadow-lg" : ""
			}`}
		>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Site branding */}
					<div className="shrink-0 mr-4">
						<Logo />
					</div>

					{/* Desktop navigation */}
					{!user._id ? (
						<>
							<nav className="hidden md:flex md:grow">
								{/* Desktop sign in links */}
								<ul className="flex grow justify-end flex-wrap items-center">
									<li>
										<Link
											href="/auth/login"
											className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
										>
											<Button
												variant="outlined"
												className="text-primary-0 hover:bg-secondary-90 hover:bg-[#D0BCFF]/5 rounded-xl border hover:border-[#938F99] border-[#938F99] normal-case"
											>
												Inicia sesión
											</Button>
										</Link>
									</li>
									<li>
										<Link
											href="/auth/register"
											className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
										>
											<Button
												variant="outlined"
												className="bg-tertiary-50 text-primary-100 hover:bg-tertiary-40 rounded-xl border hover:border-[#6F797A] border-[#6F797A] capitalize"
											>
												<span>Regístrate</span>
												<ArrowForwardIcon className="ml-1" />
											</Button>
										</Link>
									</li>
								</ul>
							</nav>
							<MobileMenu />
					</>
				):
				(
					<nav className="flex flex-row items-center gap-2">
						<p className="text-md sm:text-lg font-semibold text-primary-30 ">Hola, {user.name}</p>
						<Avatar alt={user.name} className="cursor-pointer" />
						<Button
							onClick={async () => {
								await dispatch(logoutUser());
							}}
							variant="outlined"
							className="bg-tertiary-50 text-primary-100 hover:bg-tertiary-40 rounded-xl border hover:border-[#6F797A] border-[#6F797A] capitalize"
						>
							<span>Cerrar Sesión</span>
						</Button>
					</nav>
				)
				}
				</div>
			</div>
		</header>
	);
}
