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
import MediaCard from "@/components/hid/mediaCard";
import PeopleCard from "@/components/hid/peopleCard";
import { getHouse } from "@/helpers/houses.helpers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import AppNavbar from "@/components/appNavbar";
import { useAuth } from "@/hooks/useAuth";
import { HouseI, TaskI } from "@/utils/interfaces";
import MyScheduler from "@/components/hid/scheduler";

import jwt from "jsonwebtoken";
import { createTask, getTasksByUser, getTasksByHouse, checkTask } from "@/helpers/task.helpers";
import CreateTaskModal from "@/components/hid/createTaskModal";
import { useCookies } from "@/hooks/useCookie";
import TasksList from "@/components/hid/tasksList";
import Sidebar from "@/components/hid/sidebar";
import TasksBar from "@/components/hid/tasksBar";
import Progress from "@/components/hid/progress";

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
			const until_date = new Date(task.until_date || '');
			return {
				text: task.name,
				startDate: new Date(task.start_date),
				endDate: new Date(task.end_date),
				description: task.description,
				recurrenceRule: task.repeat ?  `FREQ=WEEKLY;BYDAY=${getRecurrenceDays(task.days || [])};UNTIL=${formatTwoDigits(
					until_date.getFullYear(),
				)}${formatTwoDigits(until_date.getMonth() + 1)}${formatTwoDigits(until_date.getDate())}` : undefined,
			};
		});
		return data;
	};

	const formatFormTask = (oldTask: TaskI) => {
		const task = Object.assign(oldTask, { house_id: house._id });
		task.start_date = new Date(task.start_date);
		task.end_date = new Date(task.end_date);
		task.until_date = task.repeat ? new Date(task.until_date || '') : undefined;
		return task;
	}
	const onCreateTask = async (data: TaskI) => {
		const token = getCookie("auth-token");
		const task = formatFormTask(data);
		await createTask(task, token as string);
		setCurrentUserTasks(await getTasksByUser(house._id, user._id, token as string));
	}

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
				onSubmit={onCreateTask}
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
						<Sidebar 
							house={house}
							sidebarWidth={sidebarWidth}
							mobileSidebarOpen={mobileSidebarOpen}
							container={container}
							onMobileSidebarClose={setMobileSidebarOpen}
						/>
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
									<TasksBar 
										currentUserTasks={currentUserTasks} 
										onCreateTask={() => setIsCreateTaskModalOpen(true)}
										onListChange={async (tid: string) => {
											await checkTask(tid, token);
											setCurrentUserTasks(await getTasksByUser(house._id, user._id, token));
										}}
									/>
									<div className="overflow-y-auto h-[70vh] w-full">
										<MyScheduler data={getData()} isAdaptable={isMobile} />
									</div>
								</div>
								<Progress currentUserTasks={currentUserTasks} tasks={tasks} />
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
	if (
		house.message === "User not belongs to this house or the house doesn't exist" ||
		house.message === "House not found" ||
		!house
	) {
		return {
			redirect: {
				destination: "/app/house/not_found",
				permanent: false,
			},
		};
	}
	const tasks: TaskI[] = await getTasksByHouse(ctx.query.hid as string, cookie);
	const userTasks: TaskI[] = await getTasksByUser(ctx.query.hid as string, decodedToken._id, cookie);
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
