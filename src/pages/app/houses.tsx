// Next
import Head from "next/head";
import Image from "next/image";

// React
import { useEffect, useState } from "react";

// Styles
import { Inter } from "next/font/google";

// Material UI
import { ToggleButton, ToggleButtonGroup, IconButton, Menu, MenuItem } from "@mui/material";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import AddHomeRoundedIcon from "@mui/icons-material/AddHomeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

// Components
import GridHouseCard from "@/components/gridHouseCard";
import ListHouseCard from "@/components/listHouseCard";
import CreateHouseModal from "@/components/createHouseModal";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { getCookie } from "@/lib/cookie";
import { fetchHouses, createHouse, joinHouse } from "@/controllers/houses.controllers";
import JoinHouseModal from "@/components/joinHouseModal";
import AppNavbar from "@/components/appNavbar";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { HouseI } from "@/lib/interfaces";
import { useAuth } from "@/hooks/useAuth";
import HousesGrid from "@/components/HousesGrid";
import HousesHeader from "@/components/housesHeader";
import LayoutGroupButtons from "@/components/layoutGroupButtons";

import jwt from 'jsonwebtoken';

const Houses = ({ startHouses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useAuth();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [view, setView] = useState("grid");
	const [houses, setHouses] = useState<HouseI[]>(startHouses);
	const [addPopoverAnchorEl, setAddPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [createHouseModalOpen, setCreateHouseModalOpen] = useState<boolean>(false);
	const [joinHouseModalOpen, setJoinHouseModalOpen] = useState<boolean>(false);

	useEffect(() => {
		console.log(startHouses);
	}, []);

	// Create House Modal
	const openCreateHouseModal = () => {
		setCreateHouseModalOpen(true);
	};

	const closeCreateHouseModal = () => {
		setCreateHouseModalOpen(false);
	};

	const onCreateHouseModalSubmit = async (data: HouseI) => {
		await createHouse(data);
		setHouses((prev) => [...prev, data]);
	};

	// Join House Modal
	const openJoinHouseModal = () => {
		setJoinHouseModalOpen(true);
	};

	const closeJoinHouseModal = () => {
		setJoinHouseModalOpen(false);
	};

	const onJoinHouseModalSubmit = async (data: { houseCode: string }) => {
		await joinHouse(data.houseCode);
		setHouses(await fetchHouses(user._id, getCookie("auth-token")));
	};

	const handleAddPopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAddPopoverAnchorEl(event.currentTarget);
	};

	const handleAddPopoverClose = () => {
		setAddPopoverAnchorEl(null);
	};

	const addPopoverOpen = Boolean(addPopoverAnchorEl);
	const addPopoverId = addPopoverOpen ? "add-popover" : undefined;

	return (
		<>
			<Head>
				<title>Houses</title>
				<meta name="description" content="Houses dashboard for the app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CreateHouseModal
				onSubmit={onCreateHouseModalSubmit}
				onClose={closeCreateHouseModal}
				isOpen={createHouseModalOpen}
			/>
			<JoinHouseModal onSubmit={onJoinHouseModalSubmit} onClose={closeJoinHouseModal} isOpen={joinHouseModalOpen} />
			<main className="bg-[#FAFDFD] h-screen">
				<div className="bg-primary-40/5 h-screen flex flex-col items-center">
					<AppNavbar />
					<hr className="border border-neutral_variant-80 w-full" />
					<div className="flex w-[80vw] h-screen items-center justify-center p-10">
						<div className="flex flex-col w-full h-[80vh] p-3 gap-8">
							<HousesHeader
								addPopoverId={addPopoverId}
								handleAddPopoverClick={handleAddPopoverClick}
								addPopoverOpen={addPopoverOpen}
								addPopoverAnchorEl={addPopoverAnchorEl}
								handleAddPopoverClose={handleAddPopoverClose}
								openCreateHouseModal={openCreateHouseModal}
								openJoinHouseModal={openJoinHouseModal}
							/>
							<div className="flex flex-col gap-3 items-center w-full">
								<LayoutGroupButtons view={view} onChange={setView} />
								<HousesGrid houses={houses} view={view} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<{
	startHouses: HouseI[];
	message?: string;
}> = async (ctx: GetServerSidePropsContext) => {
	const cookie = ctx.req.cookies["auth-token"];
	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	ctx.res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
	const decodedToken = jwt.decode(cookie) as { _id: string };
	const uid = decodedToken?._id;
	const startHouses = await fetchHouses(uid, cookie);
	if (startHouses.message) {
		return {
			props: {
				startHouses: [],
				message: startHouses.message,
			},
		};
	}
	return {
		props: {
			startHouses,
		},
	};
};

export default Houses;
