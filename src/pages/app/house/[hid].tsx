// Next
import Head from "next/head";

// React
import * as React from "react";
import { useState } from "react";

// Material UI
import { Button, Box, useMediaQuery } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import { deleteHouse, getHouse } from "@/helpers/houses.helpers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import AppNavbar from "@/components/appNavbar";
import { HouseI, TaskI } from "@/dtos";
import MyScheduler from "@/components/hid/scheduler";

import jwt from "jsonwebtoken";
import { createTask, getTasksByUser, getTasksByHouse, checkTask, updateTask, deleteTask } from "@/helpers/task.helpers";
import CreateTaskModal from "@/components/hid/createTaskModal";
import { useCookies } from "@/hooks/useCookie";
import Sidebar from "@/components/hid/sidebar";
import TasksBar from "@/components/hid/tasksBar";
import DeleteHouseConfirmDialog from "@/components/hid/deleteHouseConfirmDialog";
import { edgeRefreshToken, refreshToken } from "@/helpers/auth.helpers";
import dayjs from "dayjs";
import EditHouseModal from "@/components/house/editHouseModal";
import { editHouse } from "@/helpers/houses.helpers";
import ProgressBars from "@/components/hid/progress";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const sidebarWidth = 290;

const House = ({ house, userTasks, tasks, token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const user = useSelector(selectUser);
	const { getCookie } = useCookies();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const router = useRouter();
	const [currentUserTasks, setCurrentUserTasks] = useState<TaskI[]>(userTasks);
	const [currentTasks, setCurrentTasks] = useState<TaskI[]>(tasks);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [container, setContainer] = useState<undefined | HTMLElement>(undefined);
	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
	const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
	const [toEditTask, setToEditTask] = useState<any | undefined>(undefined);
	const [currentHouse, setCurrentHouse] = useState<HouseI>(house);
	const [editHouseModalOpen, setEditHouseModalOpen] = useState<boolean>(false);
	const [isDeleteHouseConfirmationDialogOpen, setIsDeleteHouseConfirmationDialogOpen] = useState<boolean>(false);

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
		const data = currentTasks.map((task) => {
			const until_date = new Date(task.until_date || "");
			return {
				text: task.name,
				startDate: new Date(task.start_date),
				endDate: new Date(task.end_date),
				description: task.description,
				recurrenceRule: task.repeat
					? `FREQ=WEEKLY;BYDAY=${getRecurrenceDays(task.days || [])};UNTIL=${formatTwoDigits(
							until_date.getFullYear(),
					  )}${formatTwoDigits(until_date.getMonth() + 1)}${formatTwoDigits(until_date.getDate())}`
					: undefined,
			};
		});
		return data;
	};

	const formatFormTask = (oldTask: TaskI) => {
		const task = Object.assign(oldTask, { house_id: house._id });
		task.start_date = new Date(task.start_date);
		task.end_date = new Date(task.end_date);
		task.until_date = task.repeat ? new Date(task.until_date || "") : undefined;
		return task;
	};

	const formatTaskToForm = (task: TaskI) => {
		return {
			_id: task._id,
			name: task.name,
			description: task.description,
			house_id: task.house_id,
			users_id: task.users.map((user) => user._id),
			start_date: dayjs(task.start_date),
			end_date: dayjs(task.end_date),
			repeat: task.repeat,
			days: task.days,
			until_date: task.repeat ? dayjs(task.until_date) : "",
		};
	};
	const onEditTask = (tid: string) => {
		const task = currentTasks.find((task) => task._id === tid);
		if (!task) return;
		setToEditTask(formatTaskToForm(task));
		setIsUpdateTaskModalOpen(true);
	};
	const onCreateTask = async (data: TaskI) => {
		const token = getCookie("auth-token");
		const refreshToken = getCookie("refresh-token");
		const task = formatFormTask(data);
		const res = await createTask(task, token as string, refreshToken);
		if (!res.ok) {
			if (res.status === 400) {
				toast.error(res.message);
				return;
			}
			toast.error("Ha ocurrido un error al crear la tarea.");
			return;
		}
		setCurrentUserTasks(await getTasksByUser(house._id, user._id, token as string, refreshToken));
		setCurrentTasks(await getTasksByHouse(house._id, token as string, refreshToken));
		toast.success("Tarea creada.");
	};
	const onUpdateTask = async (data: TaskI) => {
		const token = getCookie("auth-token");
		const refreshToken = getCookie("refresh-token");
		const task = formatFormTask(data);
		const res = await updateTask(task._id, task, token as string, refreshToken);

		if (!res.ok) {
			if (res.status === 400) {
				toast.error(res.message);
				return;
			}
			toast.error("Ha ocurrido un error al editar la tarea.");
			return;
		}

		setCurrentUserTasks(await getTasksByUser(house._id, user._id, token as string, refreshToken));
		setCurrentTasks(await getTasksByHouse(house._id, token as string, refreshToken));
		setToEditTask(undefined);
		toast.success("Tarea actualizada.");
	};

	// Edit House Modal
	const openEditHouseModal = () => {
		setEditHouseModalOpen(true);
	};

	const closeEditHouseModal = () => {
		setEditHouseModalOpen(false);
	};

	const openDeleteHouseConfirmationDialog = () => {
		setIsDeleteHouseConfirmationDialogOpen(true);
	};

	const onEditHouseModalSubmit = async (data: HouseI) => {
		const token = getCookie("auth-token");
		const refreshToken = getCookie("refresh-token");
		const res = await editHouse(token as string, data, house._id);
		if (!res.ok) {
			if (res.status === 400) {
				toast.error(res.message);
				return;
			}
			toast.error("Ha ocurrido un error al editar la casa.");
			return;
		}
		setCurrentHouse(await getHouse(house._id, token as string, refreshToken));
		toast.success("Casa editada exitosamente.");
	};

	const onDeleteHouse = async () => {
		const token = getCookie("auth-token");
		const res = await deleteHouse(token as string, house._id);
		if (!res.ok) {
			if (res.status === 400) {
				toast.error(res.message);
				return;
			}
			toast.error("Ha ocurrido un error al eliminar la casa.");
			return;
		}
		router.push("/app/houses");
	};

	return (
		<>
			<Head>
				<title>Dashboard - {house.house_code}</title>
				<meta name="description" content="Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster />
			<CreateTaskModal
				isOpen={isCreateTaskModalOpen}
				onClose={() => setIsCreateTaskModalOpen(false)}
				onSubmit={onCreateTask}
				users={house.users}
			/>
			{toEditTask && (
				<CreateTaskModal
					isOpen={isUpdateTaskModalOpen}
					onClose={() => {
						setIsUpdateTaskModalOpen(false);
					}}
					onSubmit={onUpdateTask}
					currentState={toEditTask}
					isUpdate={true}
					users={house.users}
				/>
			)}
			<EditHouseModal
				onSubmit={onEditHouseModalSubmit}
				onClose={closeEditHouseModal}
				isOpen={editHouseModalOpen}
				house={{
					name: house.name,
					description: house.description,
					address: house.address,
					tags: house.tags.join(", "),
					house_picture: house.house_picture,
				}}
			/>
			<DeleteHouseConfirmDialog
				open={isDeleteHouseConfirmationDialogOpen}
				handleClose={() => setIsDeleteHouseConfirmationDialogOpen(false)}
				onConfirm={onDeleteHouse}
			/>
			<main className="bg-[#FAFDFD] h-full">
				<div className="bg-primary-40/5 min-h-screen h-full flex flex-col items-center">
					{/* Upper bar*/}
					<AppNavbar sidebarWidth={isMobile ? 0 : sidebarWidth} />
					{/*Main*/}
					<div className="flex flex-row w-full h-full">
						{/* Sidebar */}
						<Sidebar
							house={currentHouse}
							tasks={currentTasks}
							sidebarWidth={sidebarWidth}
							mobileSidebarOpen={mobileSidebarOpen}
							container={container}
							onMobileSidebarClose={setMobileSidebarOpen}
							openEditHouseModal={openEditHouseModal}
							openDeleteHouseConfirmationDialog={openDeleteHouseConfirmationDialog}
							isOwner={house.owner === user._id}
						/>
						{/* Content */}
						<Box
							sx={{
								flexGrow: 1,
								width: { md: `calc(100% - ${sidebarWidth}px)` },
							}}
							component="main"
							className="h-full p-3 pl-8 overflow-x-auto"
						>
							<Button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="block md:hidden">
								Toggle
							</Button>
							<div className="flex flex-col h-full pr-3">
								<div className="flex flex-row min-h-[500px] max-h-[70vh] h-full">
									<TasksBar
										currentUserTasks={currentUserTasks}
										onCreateTask={() => setIsCreateTaskModalOpen(true)}
										onListChange={async (tid: string) => {
											const refreshToken = getCookie("refresh-token");
											await checkTask(tid, token, refreshToken);
											setCurrentUserTasks(await getTasksByUser(house._id, user._id, token, refreshToken));
											setCurrentTasks(await getTasksByHouse(house._id, token, refreshToken));
										}}
										onEdit={onEditTask}
										onDelete={async (tid: string) => {
											const refreshToken = getCookie("refresh-token");
											await deleteTask(tid, token, refreshToken);
											setCurrentUserTasks(await getTasksByUser(house._id, user._id, token, refreshToken));
											setCurrentTasks(await getTasksByHouse(house._id, token, refreshToken));
											toast.success("Tarea eliminada.");
										}}
									/>
									<div className="overflow-y-auto w-full max-h-[70vh] min-h-[500px]">
										<MyScheduler data={getData()} isAdaptable={isMobile} />
									</div>
								</div>
								<div className="w-full h-full">
									<ProgressBars currentUserTasks={currentUserTasks} tasks={currentTasks} />
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
	let auth_token = ctx.req.cookies["auth-token"] as string;
	const refreshToken = ctx.req.cookies["refresh-token"];
	if (refreshToken && !auth_token) {
		const res = await edgeRefreshToken(refreshToken);
		auth_token = res ? (res.newToken as string) : "null";
	}
	if (!auth_token) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}
	const decodedToken = jwt.decode(auth_token) as { _id: string };
	const house = await getHouse(ctx.query.hid as string, auth_token, refreshToken);
	if (
		house.message === "User not belongs to this house or the house doesn't exist" ||
		house.message === "User not belongs to this house" ||
		house.message === "House doesn't exist" ||
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
	const tasks: TaskI[] = await getTasksByHouse(ctx.query.hid as string, auth_token, refreshToken);
	const userTasks: TaskI[] = await getTasksByUser(ctx.query.hid as string, decodedToken._id, auth_token, refreshToken);
	return {
		props: {
			house,
			userTasks,
			tasks,
			token: auth_token,
		},
	};
};

export default House;
