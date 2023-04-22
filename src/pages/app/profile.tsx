// Next
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// React
import { useState } from "react";
import { stringAvatar } from "../../utils/stringAvatar";

// Styles
import { Inter } from "next/font/google";

// Material UI
import {
	Grid,
	Card,
	Paper,
	Stack,
	Typography,
	Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

// Components
import AppNavbar from "@/components/appNavbar";

// Redux
import { useAuth } from "@/hooks/useAuth";
import { stringToColor } from "@/utils/stringToColor";
import { getAge } from "@/utils/getAge";

import jwt from "jsonwebtoken";
import { fetchUserData } from "@/controllers/user.controllers";
import { UserI } from "@/lib/interfaces";

const Profile = ({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useAuth();
	const [userInfo, setUserInfo] = useState<UserI>(userData ? userData : {} as UserI);
	

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
											<Stack alignItems={"center"} className="w-full h-full" style={{ position: "relative" }}>
												<div className="bg-sky-500 w-full h-[25%]"></div>
												<Avatar
													{...stringAvatar(userInfo.name, 96, 30)}
													style={{
														position: "absolute",
														top: "25%",
														left: "50%",
														transform: "translate(-50%, -50%)",
														border: "4px solid white",
													}}
												></Avatar>
												<div className="h-[15%]"></div>
												<span className="font-semibold text-xl pb-1">{userInfo.name}</span>
												<span className="text-sm">
													<span className="font-semibold">Correo:</span>
													{userInfo.email}
												</span>
												<span className="text-sm">
													<span className="font-semibold">Edad:</span>
													{getAge(userInfo.birth_date)}
												</span>
												<span className="text-sm">
													<span className="font-semibold">Teléfono:</span>
													{userInfo.phone}
												</span>
												<Divider className="w-[90%] pt-3" />
												<div className="w-[90%] pt-2">
													<Typography className="line-clamp-2 leading-5 text-sm">{userInfo.description}</Typography>
												</div>
												<Divider className="w-[90%] pt-3" />
												<div className="w-[90%] pt-2">
													<Stack className="w-full" justifyContent={"center"} direction="row" spacing={2}>
														{userInfo.tags.map((tag: string) => (
															<Paper
																className="text-xs p-1"
																style={{ backgroundColor: stringToColor(tag, true) }}
																key={tag}
															>
																{tag}
															</Paper>
														))}
													</Stack>
												</div>
											</Stack>
										</Card>
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
	userData?: UserI;
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
	const userData = await fetchUserData(uid, cookie);
	if (userData.message) {
		return {
			props: {
				message: userData.message,
			},
		};
	}
	return {
		props: {
			userData: userData,
		},
	};
};

export default Profile;
