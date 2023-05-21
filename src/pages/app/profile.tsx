// Next
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// React
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

// Material UI
import { Stack } from "@mui/material";

// Components
import AppNavbar from "@/components/appNavbar";

import jwt from "jsonwebtoken";
import { editUserData, fetchUserData } from "@/helpers/user.helpers";
import { UserI } from "@/dtos";
import ProfileCard from "@/components/profile/profileCard";
import { edgeRefreshToken } from "@/helpers/auth.helpers";
import { getCookie } from "@/utils/cookie";
import EditProfileModal from "@/components/profile/editProfileModal";
import dayjs from "dayjs";
import { format } from "path";

const Profile = ({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [userInfo, setUserInfo] = useState<UserI>(userData ? userData : ({} as UserI));
	const [editProfileModalOpen, setEditProfileModalOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [notification, setNotification] = useState("");

	const notify = () => toast('Here is your toast.');

	// Edit Profile Modal
	const openEditProfileModal = () => {
		setEditProfileModalOpen(true);
	};

	const closeEditProfileModal = () => {
		setEditProfileModalOpen(false);
	};

	const onEditProfileModalSubmit = async (data: UserI) => {
		const token = getCookie("auth-token");
		const refreshToken = getCookie("refresh-token");
		const res = await editUserData(token as string, data, userInfo?._id);
		if (!res.ok) {
			if (res.status === 400) {
				setErrorMessage(res.message);
				toast.error('Verifica la información e intenta de nuevo.');
				return;
			}
			setErrorMessage("Ha ocurrido un error inesperado.");
			toast.error('Error al actualizar la información');
			return;
		}
		setErrorMessage(null);
		setUserInfo(await fetchUserData(userInfo?._id, token as string, refreshToken));
      	toast.success('¡Información actualizada!');
	};

	return (
		<>
			<Head>
				<title>Houses</title>
				<meta name="description" content="Houses dashboard for the app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<EditProfileModal
				onSubmit={onEditProfileModalSubmit}
				onClose={closeEditProfileModal}
				isOpen={editProfileModalOpen}
				userInfo={{
					name: userInfo.name,
					phone: userInfo.phone,
					description: userInfo.description,
					birth_date: dayjs(userInfo.birth_date),
					tags: userInfo.tags.join(","),
					profile_picture: userInfo.profile_picture,
				}}
			/>
			<Toaster />
			<main>
				<div className="bg-[#FAFDFD] min-h-screen h-full items-center">
					<AppNavbar />
					<div className="w-full h-full  p-10">
						<div className="flex flex-col w-full h-full p-3 gap-8 items-center">
							<Stack
								justifyContent={"space-between"}
								className="w-[full] md:w-[40%] min-w-[450px] min-h-[750px] h-full flex items-center justify-center"
							>
								<ProfileCard
									name={userInfo.name}
									email={userInfo.email}
									description={userInfo.description}
									birthDate={userInfo.birth_date}
									phone={userInfo.phone}
									tags={userInfo.tags}
									profile_picture={userInfo.profile_picture}
									openEditProfileModal={openEditProfileModal}
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
	let cookie = ctx.req.cookies["auth-token"];
	const refreshToken = ctx.req.cookies["refresh-token"];
	if (refreshToken && !cookie) {
		const res = await edgeRefreshToken(refreshToken);
		cookie = res ? (res.newToken as string) : "null";
	}
	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	const decodedToken = jwt.decode(cookie) as { _id: string };
	const uid = decodedToken?._id;
	const userData = await fetchUserData(uid, cookie, refreshToken);
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
function setErrorMessage(message: any) {
	throw new Error("Function not implemented.");
}
