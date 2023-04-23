// Next
import Head from "next/head";
import Image from "next/image";

// React
import * as React from "react";
import { useState } from "react";

// Material UI
import {
	Button,
	Drawer,
	Box,
	useMediaQuery,
	FormGroup,
	FormControlLabel,
	Checkbox,
	LinearProgress,
} from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import MediaCard from "@/components/mediaCard";
import PeopleCard from "@/components/peopleCard";
import { getHouse } from "@/controllers/houses.controllers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import AppNavbar from "@/components/appNavbar";
import { useAuth } from "@/hooks/useAuth";
import { HouseI, TaskI } from "@/lib/interfaces";
import MyScheduler from "@/components/scheduler";

import jwt from "jsonwebtoken";
import { getUserTasks } from "@/controllers/tasks.controllers";

const sidebarWidth = 290;

const House = ({ house, tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useAuth();
	const user = useSelector(selectUser);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const dispatch = useDispatch();
	const [view, setView] = useState("grid");
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [container, setContainer] = useState<undefined | HTMLElement>(undefined);

	useEffect(() => {
		setContainer(window ? () => document.body : undefined);
	}, []);

	return (
		<>
			<Head>
				<title>Dashboard - {house.house_code}</title>
				<meta name="description" content="Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-[#FAFDFD] h-screen">
				<div className="bg-primary-40/5 h-screen flex flex-col items-center">
					{/* Upper bar*/}
					<AppNavbar sidebarWidth={isMobile ? 0 : sidebarWidth} />
					<hr className="border border-neutral_variant-80 w-full" />
					{/*Main*/}
					<div className="flex flex-row w-full h-full">
						{/* Sidebar */}
						<nav className={`md:w-[270px] md:flex-shrink-0`}>
							<Drawer
								sx={{
									"& .MuiDrawer-paper": {
										boxSizing: "border-box",
										width: sidebarWidth,
									},
								}}
								variant="permanent"
								className="bg-primary-95 hidden md:block"
							>
								<div className="bg-primary-40/10 h-full">
									{/* House card */}
									<div className="p-5 items-center">
										<MediaCard
											name={house.name}
											address={house.address}
											description={house.description}
											picture={house.house_picture}
										/>
									</div>
									{/* House members */}
									<div className="p-5 pt-0">
										<PeopleCard users={house.users} pending_users={house.pending_users} house_id={house._id} />
									</div>
								</div>
							</Drawer>
							<Drawer
								sx={{
									"& .MuiDrawer-paper": {
										boxSizing: "border-box",
										width: sidebarWidth,
									},
								}}
								anchor="left"
								open={mobileSidebarOpen}
								onClose={() => setMobileSidebarOpen(false)}
								container={container}
								ModalProps={{
									keepMounted: true, // Better open performance on mobile.
								}}
								className="bg-primary-95 block md:hidden"
							>
								<div className="bg-primary-40/10 h-full">
									<Button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="block md:hidden">
										Toggle
									</Button>
									{/* House card */}
									<div className="p-5 items-center">
										<MediaCard
											name={house.name}
											address={house.address}
											description={house.description}
											picture={house.house_picture}
										/>
									</div>
									{/* House members */}
									<div className="p-5 pt-0">
										<PeopleCard users={house.users} pending_users={house.pending_users} house_id={house._id} />
									</div>
								</div>
							</Drawer>
						</nav>
						{/* Content */}
						<Box
							sx={{
								flexGrow: 1,
								p: 4,
								width: { md: `calc(100% - ${sidebarWidth}px)` },
							}}
							component="main"
							className="h-[90vh]"
						>
							<Button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="block md:hidden">
								Toggle
							</Button>
							<div className="flex flex-col">
								<div className="flex flex-row">
									<div className="w-[30%]">
										<p className="text-lg font-semibold">Mis tareas:</p>
										<FormGroup className="flex flex-col gap-2">
											{tasks
												.filter((task) => task.users_id.includes(user._id))
												.map((task) => (
													<FormControlLabel
														control={<Checkbox checked={task.done} />}
														key={task._id}
														label={task.name}
													/>
												))}
										</FormGroup>
									</div>
									<div className="overflow-y-auto h-[70vh] w-full">
									<MyScheduler />
									</div>
								</div>
								<div>
									<p className="text-xl">Progresos</p>
									<div className="flex flex-row items-center gap-2">
										<p className="font-semibold">Mi progreso:</p>
										<LinearProgress
											variant="determinate"
											className="flex-grow rounded-lg h-2"
											value={
												(tasks.filter((task) => task.users_id.includes(user._id)).filter((task) => task.done).length *
													100) /
												tasks.filter((task) => task.users_id.includes(user._id)).length
											}
										/>
									</div>
									<div className="flex flex-row items-center gap-2">
										<p className="font-semibold">Progreso de la casa:</p>
										<LinearProgress
											variant="determinate"
											className="flex-grow rounded-lg h-2"
											value={tasks.filter((task) => task.done).length * 100 / tasks.length}
										/>
									</div>
								</div>
							</div>
						</Box>
					</div>
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<{ house: HouseI; tasks: TaskI[] }> = async (
	ctx: GetServerSidePropsContext,
) => {
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
	ctx.res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
	const house = await getHouse(ctx.query.hid as string, cookie);

	if (house.message === "User not belongs to this house or the house doesn't exist" || !house) {
		return {
			redirect: {
				destination: "/app/house/not_found",
				permanent: false,
			},
		};
	}
	const tasks: TaskI[] = await getUserTasks(ctx.query.hid as string, decodedToken._id, cookie);
	console.log(tasks);
	return {
		props: {
			house,
			tasks,
		},
	};
};

export default House;
