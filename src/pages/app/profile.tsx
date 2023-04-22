// Next
import Head from "next/head";
import Image from "next/image";

// React
import { useState } from "react";
import { stringAvatar } from "../../utils/stringAvatar";

// Styles
import { Inter } from "next/font/google";

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
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import AddHomeRoundedIcon from "@mui/icons-material/AddHomeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Avatar from "@mui/material/Avatar";

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
import { stringToColor } from "@/utils/stringToColor";
import { getAge } from "@/utils/getAge";

const getUserData = () =>{
	const userData = {
		"name":"Juan Perez",
		"email":"juanPerez@gmail.com",
		"description":"Hola amigos me llamo Juan y me gusta la aplicación RoomEase, es la mejor app que he usado en mi vida y mira que he usado muchas",
		"birth_date":"2001-02-07T05:00:00.000+00:00",
		"phone":"32456523",
		"tags":["ordenado","limpio","madrugador","divertido"],
		"tasks":["644313795f5e99855a7af73d"]
	};
	return userData;
}

const Profile = ({ startHouses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useAuth();
	// const user = useSelector(selectUser);
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
										<Card className="w-full h-[49%] rounded-md">
											<Stack alignItems={"center"} className="w-full h-full"  style={{ position: "relative" }}>
												<div className="bg-sky-500 w-full h-[25%]"></div>
												<Avatar {...stringAvatar(user.name,96,30)} style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", border: "4px solid white" }}></Avatar>
												<div className="h-[15%]"></div>
												<span className="font-semibold text-xl pb-1">{user.name}</span>
												<span className="text-sm"><span className="font-semibold">Correo:</span>{user.email}</span>
												<span className="text-sm"><span className="font-semibold" >Edad:</span>{getAge(user.birth_date)}</span>
												<span className="text-sm"><span className="font-semibold">Teléfono:</span>{user.phone}</span>
												<Divider className="w-[90%] pt-3" />
												<div className="w-[90%] pt-2">
													<Typography className="line-clamp-2 leading-5 text-sm">{user.description}</Typography>
												</div>
												<Divider className="w-[90%] pt-3" />
												<div className="w-[90%] pt-2">
													<Stack className="w-full" justifyContent={"center"} direction="row" spacing={2}>
														{user.tags.map((tag, id) => (
															<Paper className="text-xs p-1" style={{backgroundColor:stringToColor(tag, true)}} key={id}>
																{tag}
															</Paper>
														))}
													</Stack>
												</div>
											</Stack>
										</Card>
										<Card className="w-full h-[49%] rounded-md">
											<div className="flex items-center justify-center h-[90%] w-[90%]">
												Progreso
											</div>
										</Card>
									</Stack>
								</Grid>
								<Grid item xs={9}>
									<Card className="h-full rounded-md">
										<div className="flex items-center justify-center h-[90%] w-[90%]">
											Mis tareas
										</div>
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
