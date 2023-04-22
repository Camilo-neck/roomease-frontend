// Next
import Head from "next/head";

// React
import { useState } from "react";
import { stringAvatar } from "../../utils/stringAvatar";

// Material UI
import {
	ToggleButton,
	ToggleButtonGroup,
	IconButton,
	Menu,
	MenuItem,
	Grid,
	Card,
	CardContent,
	Paper,
	Stack,
	Typography,
	Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

// Components
import ProfileCard from "@/components/profileCard";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchHouses, createHouse, joinHouse } from "@/controllers/houses.controllers";
import AppNavbar from "@/components/appNavbar";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { HouseI } from "@/lib/interfaces";
import { useAuth } from "@/hooks/useAuth";
import { stringToColor } from "@/utils/stringToColor";
import { getAge } from "@/utils/getAge";

const getUserData = () => {
	const userData = {
		name: "Juan Perez",
		email: "juanPerez@gmail.com",
		description:
			"Hola amigos me llamo Juan y me gusta la aplicación RoomEase, es la mejor app que he usado en mi vida y mira que he usado muchas",
		birthDate: "2001-02-07T05:00:00.000+00:00",
		phone: "32456523",
		tags: ["ordenado", "limpio", "madrugador", "divertido"],
		tasks: ["644313795f5e99855a7af73d"],
	};
	return userData;
};

const Profile = ({ startHouses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useAuth();
	//const user = useSelector(selectUser);
	const user = getUserData();
	const dispatch = useDispatch();
	const [view, setView] = useState("grid");
	const [houses, setHouses] = useState<HouseI[]>(startHouses);
	const [addPopoverAnchorEl, setAddPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [createHouseModalOpen, setCreateHouseModalOpen] = useState<boolean>(false);
	const [joinHouseModalOpen, setJoinHouseModalOpen] = useState<boolean>(false);

	return (
		<>
			<Head>
				<title>Houses</title>
				<meta name="description" content="Houses dashboard for the app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-[#FAFDFD] h-screen">
				<div className="bg-primary-40/5 h-screen flex flex-col items-center">
					<AppNavbar />
					<hr className="border border-neutral_variant-80 w-full" />
					<div className="flex w-[80vw] h-screen items-center justify-center p-10">
						<div className="flex flex-col w-full h-[80vh] p-3 gap-8">
							<Grid className="h-full" container spacing={2}>
								<Grid container className="flex justify-between h-full" item xs={3}>
									<Stack justifyContent={"space-between"} className="w-full">
										<ProfileCard
											name={user.name}
											email={user.email}
											description={user.description}
											birthDate={user.birthDate}
											phone={user.phone}
											tags={user.tags}
										></ProfileCard>
										<Card className="w-full h-[49%] rounded-md">
											<div className="flex items-center justify-center h-[90%] w-[90%]">Progreso</div>
										</Card>
									</Stack>
								</Grid>
								<Grid item xs={9}>
									<Card className="h-full rounded-md">
										<div className="flex items-center justify-center h-[90%] w-[90%]">Mis tareas</div>
									</Card>
								</Grid>
							</Grid>
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
	const startHouses = await fetchHouses(ctx.query._id as string, cookie);
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

export default Profile;
