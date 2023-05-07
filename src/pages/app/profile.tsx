// Next
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// React
import { useState } from "react";

// Material UI
import { Stack } from "@mui/material";

// Components
import AppNavbar from "@/components/appNavbar";

import jwt from "jsonwebtoken";
import { fetchUserData } from "@/helpers/user.helpers";
import { UserI } from "@/dtos";
import ProfileCard from "@/components/profileCard";

const Profile = ({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [userInfo, setUserInfo] = useState<UserI>(userData ? userData : ({} as UserI));

	return (
		<>
			<Head>
				<title>Houses</title>
				<meta name="description" content="Houses dashboard for the app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="bg-[#FAFDFD] min-h-screen h-full items-center">
					<AppNavbar />
					<div className="w-full h-full  p-10">
						<div className="flex flex-col w-full h-full p-3 gap-8 items-center">
							<Stack justifyContent={"space-between"} className="w-[full] md:w-[40%] min-w-[450px] min-h-[750px] h-full flex items-center justify-center">
								<ProfileCard
									name={userInfo.name}
									email={userInfo.email}
									description={userInfo.description}
									birthDate={userInfo.birth_date}
									phone={userInfo.phone}
									tags={userInfo.tags}
								></ProfileCard>
							</Stack>
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
			userData,
		},
	};
};

export default Profile;
