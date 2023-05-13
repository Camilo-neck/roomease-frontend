// React
import { useEffect, useState } from "react";

// Material UI
import { Button, Chip, IconButton, ListItem, Popover } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { acceptPendingUser, rejectPendingUser } from "@/helpers/houses.helpers";
import { stringAvatar } from "@/utils/avatar.utils";
import { TaskI, UserI } from "@/dtos";
import MiniProfileCard from "../miniProfileCard";
import { fetchUserData } from "@/helpers/user.helpers";
import { useCookies } from "@/hooks/useCookie";

import { get_week_tasks } from "@/utils/weekTasks";

const NestedList = ({
	users,
	pending_users,
	house_id,
	tasks,
	onAcceptUser,
	onRejectUser,
}: {
	users: UserI[];
	house_id: string;
	pending_users?: UserI[];
	tasks: TaskI[];
	onAcceptUser: (user: UserI) => void;
	onRejectUser: (user: UserI) => void;
}) => {
	const [open1, setOpen1] = useState(true);
	const [open2, setOpen2] = useState(true);
	const [popoverUser, setPopoverUser] = useState<UserI | null>(null);
	const [popoverUserTasks, setPopoverUserTasks] = useState<TaskI[]>([]);
	const [currentUser, setCurrentUser] = useState<UserI | null>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { getCookie } = useCookies();

	const handleClick1 = () => {
		setOpen1(!open1);
	};
	const handleClick2 = () => {
		setOpen2(!open2);
	};

	useEffect(() => {
		if (anchorEl) {
			fetchUserData(currentUser?._id as string, getCookie("auth-token") as string, getCookie('refreshToken')).then((res) => {
				setPopoverUser(res);
				console.log(res);
			});
			setPopoverUserTasks(getUserTasks(currentUser as UserI));
		}
	}, [anchorEl]);

	const getUserTasks = (user: UserI) => {
		const week_tasks = get_week_tasks(tasks);
		return week_tasks ? week_tasks.filter((task) => task.users.filter((u) => u._id === user._id).length > 0) : [];
	};

	const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setPopoverUser(null);
	};

	const open = Boolean(anchorEl) && Boolean(popoverUser);
	const popoverId = open ? "simple-popover" : undefined;

	return (
		<List
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader className="text-center font-bold text-base p-2" component="div" id="nested-list-subheader">
					Integrantes
				</ListSubheader>
			}
		>
			<Popover
				id={popoverId}
				open={open}
				anchorEl={anchorEl}
				onClose={handlePopoverClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				className="w-96"
			>
				<MiniProfileCard user={popoverUser as UserI} userTasks={popoverUserTasks} />
			</Popover>
			<ListItemButton className="p-1" onClick={handleClick1}>
				<ListItemIcon>
					<PersonIcon />
				</ListItemIcon>
				<ListItemText primary="Miembros" />
				{open1 ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open1} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{users.map((user, id) => (
						<ListItem className="p-1 pl-5" key={id}>
							<Chip
								variant="outlined"
								className="text-xs text-left rounded-xl"
								label={user.name}
								avatar={<Avatar {...stringAvatar(user.name)} />}
								onClick={async (e) => {
									setCurrentUser(user);
									handlePopoverClick(e);
								}}
								clickable
							/>
						</ListItem>
					))}
				</List>
			</Collapse>
			{pending_users && (
				<>
					<ListItemButton className="p-1" onClick={handleClick2}>
						<ListItemIcon>
							<PersonAddIcon />
						</ListItemIcon>
						<ListItemText primary="Pendientes" />
						{open2 ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open2} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{pending_users.map((user, id) => (
								<>
									<div className="flex flex-col">
										<ListItem
											className="p-1 pl-5"
											key={user._id}
											secondaryAction={
												<>
													<IconButton
														size="small"
														aria-label="accept"
														onClick={async () => {
															await acceptPendingUser(getCookie('auth-token') as string ,house_id, user._id);
															onAcceptUser(user);
														}}
													>
														<CheckIcon htmlColor="green" fontSize="small" />
													</IconButton>
													<IconButton
														size="small"
														edge="end"
														aria-label="reject"
														onClick={async () => {
															await rejectPendingUser(house_id, user._id);
															onRejectUser(user);
														}}
													>
														<ClearSharpIcon htmlColor="red" fontSize="small" />
													</IconButton>
												</>
											}
										>
											<Chip
												variant="outlined"
												className="text-xs text-left rounded-xl"
												label={user.name}
												avatar={<Avatar {...stringAvatar(user.name)} />}
												onClick={async (e) => {
													setCurrentUser(user);
													handlePopoverClick(e);
												}}
												clickable
											/>
										</ListItem>
									</div>
								</>
							))}
						</List>
					</Collapse>
				</>
			)}
		</List>
	);
};

const PeopleCard = ({
	users,
	pending_users,
	house_id,
	tasks,
	onAcceptUser,
	onRejectUser,
}: {
	users: UserI[];
	pending_users?: UserI[];
	house_id: string;
	tasks: TaskI[];
	onAcceptUser: (user: UserI) => void;
	onRejectUser: (user: UserI) => void;
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Card className="shadow-lg rounded-lg">
			<CardContent className="pb-0">
				<NestedList
					tasks={tasks}
					users={expanded ? users : users.slice(0, 4)}
					pending_users={expanded ? pending_users : pending_users?.slice(0, 4)}
					house_id={house_id}
					onAcceptUser={onAcceptUser}
					onRejectUser={onRejectUser}
				/>
			</CardContent>
			<CardActions className="flex flex-col items-center pb-3 w-full">
				<Button
					variant="outlined"
					onClick={() => setExpanded(!expanded)}
					className={`${
						users.length > 4 ? "" : "hidden"
					} bg-secondary-90/70 hover:bg-secondary-90/90 active:bg-secondary-80/80 rounded-2xl`}
					size="small"
				>
					{expanded ? "Ver menos" : "Ver más"}
				</Button>
			</CardActions>
		</Card>
	);
};

export default PeopleCard;
