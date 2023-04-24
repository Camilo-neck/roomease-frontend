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
	IconButton,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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
import { createTask, getTasksByUser, getTasksByHouse, checkTask } from "@/controllers/task.controllers";
import CreateTaskModal from "@/components/createTaskModal";
import { useCookies } from "@/hooks/useCookie";
import TasksList from "@/components/tasksList";

const sidebarWidth = 290;

const House = ({ house, userTasks, tasks, token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const user = useSelector(selectUser);
	const { getCookie } = useCookies();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const dispatch = useDispatch();
	const [currentUserTasks, setCurrentUserTasks] = useState<TaskI[]>(userTasks);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [container, setContainer] = useState<undefined | HTMLElement>(undefined);
	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

	useEffect(() => {
		setContainer(window ? () => document.body : undefined);
	}, []);

	const getRecurrenceDays = (days: string[]) => {
		let recurrenceDays = "";
		days.forEach((day) => {
			recurrenceDays += day + ",";
		});
		return recurrenceDays.slice(0, -1);
	};

	const formatTwoDigits = (n: number) => {
		return n < 10 ? "0" + n : n;
	};

	const getData = () => {
		const data = tasks.map((task) => {
			const until_date = new Date(task.until_date);
			return {
				text: task.name,
				startDate: new Date(task.start_date),
				endDate: new Date(task.end_date),
				description: task.description,
				recurrenceRule: `FREQ=WEEKLY;BYDAY=${getRecurrenceDays(task.days)};UNTIL=${formatTwoDigits(
					until_date.getFullYear(),
				)}${formatTwoDigits(until_date.getMonth() + 1)}${formatTwoDigits(until_date.getDate())}`,
			};
		});
		return data;
	};

	return (
		<>
			<Head>
				<title>Dashboard - {house.house_code}</title>
				<meta name="description" content="Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CreateTaskModal
				isOpen={isCreateTaskModalOpen}
				onClose={() => setIsCreateTaskModalOpen(false)}
				onSubmit={async (data) => {
					const token = getCookie("auth-token");
					const task = Object.assign(data, { house_id: house._id });
					task.start_date = new Date(task.start_date);
					task.end_date = new Date(task.end_date);
					task.until_date = task.repeat ? new Date(task.until_date) : undefined;
					await createTask(data, token as string);
					setCurrentUserTasks(await getTasksByUser(house._id, user._id, token as string));
				}}
				users={house.users}
			/>
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
										<div className="flex flex-col-reverse md:flex-row items-start md:items-center mr-5">
											<p className="text-lg font-semibold flex-grow">Mis tareas:</p>
											<IconButton
												color="primary"
												className="bg-primary-90 hover:bg-primary-80 active:bg-primary-80"
												onClick={() => setIsCreateTaskModalOpen(true)}
											>
												<AddRoundedIcon />
											</IconButton>
										</div>
										<TasksList
											tasks={currentUserTasks}
											onChange={async (tid: string) => {
												await checkTask(tid, token as string);
												setCurrentUserTasks(await getTasksByUser(house._id, user._id, token as string));
											}}
										/>
									</div>
									<div className="overflow-y-auto h-[70vh] w-full">
										<MyScheduler data={getData()} isAdaptable={isMobile} />
									</div>
								</div>
								<div>
									<p className="text-xl">Progresos</p>
									<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
										<p className="font-semibold">Mi progreso:</p>
										<LinearProgress
											variant="determinate"
											className="flex-grow rounded-lg col-span-5 h-2"
											value={
												userTasks.length > 0
													? (currentUserTasks.filter((task) => task.done).length * 100) / currentUserTasks.length
													: 0
											}
										/>
									</div>
									<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
										<p className="font-semibold">Progreso de la casa:</p>
										<LinearProgress
											variant="determinate"
											className="flex-grow rounded-lg h-2 col-span-5"
											value={tasks.length > 0 ? (tasks.filter((task) => task.done).length * 100) / tasks.length : 0}
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

export const getServerSideProps: GetServerSideProps<{
	house: HouseI;
	userTasks: TaskI[];
	tasks: TaskI[];
	token: string;
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
	ctx.res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
	const house = await getHouse(ctx.query.hid as string, cookie);
	console.log(">>>>>", house);
	if (
		house.message === "User not belongs to this house or the house doesn't exist" ||
		house.message === "House not found" ||
		!house
	) {
		console.log(house);
		return {
			redirect: {
				destination: "/app/house/not_found",
				permanent: false,
			},
		};
	}
	const tasks: TaskI[] = await getTasksByHouse(ctx.query.hid as string, cookie);
	const userTasks: TaskI[] = await getTasksByUser(ctx.query.hid as string, decodedToken._id, cookie);
	console.log(tasks);
	return {
		props: {
			house,
			userTasks,
			tasks,
			token: cookie,
		},
	};
};

export default House;
