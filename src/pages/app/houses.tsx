// Next
import Head from "next/head";

// React
import { useEffect, useState } from "react";

// Styles

// Material UI
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Components
import CreateHouseModal from "@/components/createHouseModal";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { getCookie } from "@/utils/cookie";
import { fetchHouses, createHouse, joinHouse } from "@/helpers/houses.helpers";
import JoinHouseModal from "@/components/joinHouseModal";
import AppNavbar from "@/components/appNavbar";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { HouseI } from "@/utils/interfaces";
import HousesHeader from "@/components/housesHeader";
import LayoutGroupButtons from "@/components/layoutGroupButtons";
import HousesGrid from "@/components/housesGrid";

import jwt from "jsonwebtoken";

const Houses = ({ startHouses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [view, setView] = useState("grid");
	const [houses, setHouses] = useState<HouseI[]>(startHouses);
	const [addPopoverAnchorEl, setAddPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [createHouseModalOpen, setCreateHouseModalOpen] = useState<boolean>(false);
	const [joinHouseModalOpen, setJoinHouseModalOpen] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Create House Modal
	const openCreateHouseModal = () => {
		setCreateHouseModalOpen(true);
	};

	const closeCreateHouseModal = () => {
		setCreateHouseModalOpen(false);
	};

	const onCreateHouseModalSubmit = async (data: HouseI) => {
		const res = await createHouse(data);
		if (!res.ok) {
			if (res.status === 400) {
				setErrorMessage(res.message);
				return;
			}
			setErrorMessage("Ha ocurrido un error inesperado.");
			return;
		}
		setSuccessMessage("Casa creada satisfactoriamente!");
		setErrorMessage(null);
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
		const res = await joinHouse(data.houseCode);
		console.log(res);
		if (!res.ok) {
			console.log("not ok");
			if (res.status === 400 || res.status === 404) {
				const error = await res.json();
				console.log(error);
				setErrorMessage(error.message);
				return;
			}
			setErrorMessage("Ha ocurrido un error inesperado.");
			return;
		}
		setSuccessMessage("Se ha enviado la solicitud satisfactoriamente!");
		setErrorMessage(null);
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
			<Snackbar
				open={!!successMessage}
				autoHideDuration={6000}
				onClose={() => setSuccessMessage(null)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity="success">{successMessage}</Alert>
			</Snackbar>
			<Snackbar
				open={!!errorMessage}
				autoHideDuration={6000}
				onClose={() => setErrorMessage(null)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
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
