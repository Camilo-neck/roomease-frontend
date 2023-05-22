// Next
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// React
import { useState } from "react";

// Components
import CreateHouseModal from "@/components/house/createHouseModal";
import HousesHeader from "@/components/housesHeader";
import LayoutGroupButtons from "@/components/layoutGroupButtons";
import HousesGrid from "@/components/housesGrid";
import JoinHouseModal from "@/components/house/joinHouseModal";
import AppNavbar from "@/components/appNavbar";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Others
import { selectUser } from "@/redux/slices/user.slice";
import { getCookie } from "@/utils/cookie";
import { fetchHouses, createHouse, joinHouse } from "@/helpers/houses.helpers";
import { HouseI } from "@/dtos";

import jwt from "jsonwebtoken";
import EmptyHouses from "@/components/emptyHouses";
import { Toaster, toast } from "react-hot-toast";

const Houses = ({ startHouses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [view, setView] = useState("list");
	const [houses, setHouses] = useState<HouseI[]>(startHouses);
	const [addPopoverAnchorEl, setAddPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [createHouseModalOpen, setCreateHouseModalOpen] = useState<boolean>(false);
	const [joinHouseModalOpen, setJoinHouseModalOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Create House Modal
	const openCreateHouseModal = () => {
		setCreateHouseModalOpen(true);
	};

	const closeCreateHouseModal = () => {
		setCreateHouseModalOpen(false);
	};

	const onCreateHouseModalSubmit = async (data: HouseI) => {
		const token = getCookie("auth-token");
		const res = await createHouse(token as string, data);
		if (!res.ok) {
			if (res.status === 400) {
				toast.error(res.message);
				return;
			}
			toast.error("Error al crear la casa");
			return;
		}
		setHouses((prev) => [...prev, data]);
		toast.success("Casa creada satisfactoriamente!");
	};

	// Join House Modal
	const openJoinHouseModal = () => {
		setJoinHouseModalOpen(true);
	};

	const closeJoinHouseModal = () => {
		setJoinHouseModalOpen(false);
	};

	const onJoinHouseModalSubmit = async (data: { houseCode: string }) => {
		const token = getCookie("auth-token");
		const refreshToken = getCookie("refresh-token");
		const res = await joinHouse(token, data.houseCode);
		if (!res.ok) {
			if (res.status === 400 || res.status === 404) {
				const error = await res.json();
				toast.error(error.message);
				return;
			}
			toast.error("Ha ocurrido un error inesperado.");
			return;
		}
		setHouses(await fetchHouses(user._id, token, refreshToken));
		toast.success("Se ha enviado la solicitud satisfactoriamente!");
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
			<Toaster />
			<JoinHouseModal onSubmit={onJoinHouseModalSubmit} onClose={closeJoinHouseModal} isOpen={joinHouseModalOpen} />
			<main>
				<div className="bg-[#FAFDFD] h-full min-h-screen flex flex-col items-center">
					<AppNavbar />
					<div className="flex w-[100vw] lg:w-[80vw] h-full items-center justify-center p-5">
						<div className="flex flex-col w-full h-full p-3 gap-3">
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
								{houses.length === 0 ? (
									<EmptyHouses />
								) : (
									<>
										<LayoutGroupButtons view={view} onChange={setView} />
										<HousesGrid houses={houses} view={view} />
									</>
								)}
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
				destination: "/auth/login",
				permanent: false,
			},
		};
	}
	const decodedToken = jwt.decode(cookie) as { _id: string };
	const uid = decodedToken?._id;
	const refreshToken = ctx.req.cookies["refresh-token"];
	const startHouses = await fetchHouses(uid, cookie, refreshToken);
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
