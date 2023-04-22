// Next
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// React
import { useState } from "react";

// Material UI
import {
	Grid,
	Card,
	Paper,
	Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

// Components
import AppNavbar from "@/components/appNavbar";

// Redux
import { useAuth } from "@/hooks/useAuth";

import jwt from "jsonwebtoken";
import { fetchUserData } from "@/controllers/user.controllers";
import { UserI } from "@/lib/interfaces";
import ProfileCard from "@/components/profileCard";

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
										<ProfileCard
											name={userInfo.name}
											email={userInfo.email}
											description={userInfo.description}
											birthDate={userInfo.birth_date}
											phone={userInfo.phone}
											tags={userInfo.tags}
										></ProfileCard>
										<Card className="w-full h-[49%] rounded-md">
										<div className="flex items-center justify-center h-[90%] w-[90%]">Mis tareas</div>
										</Card>
									</Stack>
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
