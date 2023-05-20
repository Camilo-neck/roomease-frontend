import Link from "next/link";

import { Box, IconButton, Menu, MenuItem, Popover, Switch } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOulinedIcon from "@mui/icons-material/NotificationsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/helpers/auth.helpers";
import { useRouter } from "next/navigation";
import Logo from "./homepage/ui/logo";
import { NotificationI } from "@/dtos";
import { deleteNotification, getNotifications, readNotification } from "@/helpers/notifications.helpers";
import { getCookie } from "@/utils/cookie";

const AppNavbar = ({ sidebarWidth }: { sidebarWidth?: number }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [userPopoverAnchorEl, setUserPopoverAnchorEl] = useState<null | HTMLElement>(null);
	const userPopoverOpen = Boolean(userPopoverAnchorEl);
	const userPopoverId = userPopoverOpen ? "user-popover" : undefined;
	const [notificationsPopoverAnchorEl, setNotificationsPopoverAnchorEl] = useState<null | HTMLElement>(null);
	const notificationsPopoverOpen = Boolean(notificationsPopoverAnchorEl);
	const notificationsPopoverId = notificationsPopoverOpen ? "notifications-popover" : undefined;
	const [notifications, setNotifications] = useState<NotificationI[]>([]);
	const [currentNotifications, setCurrentNotifications] = useState<NotificationI[]>([]);
	const [onlyNotSeen, setOnlyNotSeen] = useState<boolean>(false);

	useEffect(() => {
		async function fetchNotifications() {
			const token = getCookie("auth-token");
			const refreshTokenCookie = getCookie("refresh-token");
			const res = await getNotifications(token, refreshTokenCookie);
			setNotifications(res);
		}
		fetchNotifications();
	}, []);

	useEffect(() => {
		setCurrentNotifications(
			notifications.filter((notification) => (onlyNotSeen ? notification.read === !onlyNotSeen : true)),
		);
	}, [notifications, onlyNotSeen]);

	const handleUserPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setUserPopoverAnchorEl(event.currentTarget);
	};

	const handleUserPopoverClose = () => {
		setUserPopoverAnchorEl(null);
	};

	const handleNotificationsPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setNotificationsPopoverAnchorEl(event.currentTarget);
	};

	const handleNotificationsPopoverClose = () => {
		setNotificationsPopoverAnchorEl(null);
	};

	return (
		<>
			<Box
				sx={{
					width: { sm: `calc(100% - ${sidebarWidth}px)` },
					ml: { sm: `${sidebarWidth}px` },
				}}
				className={`${sidebarWidth ? "min-w-full sm:min-w-min" : "w-full min-w-full"} items-center flex flex-row p-2 bg-[#ffffff]`}
			>
				<div>
					<Logo />
				</div>
				<div className="flex-grow mr-4"></div>
				<div className="flex flex-row gap-3 mr-5">
					<IconButton onClick={handleNotificationsPopoverOpen}>
						<NotificationsOulinedIcon className="text-primary-20" />
					</IconButton>
					<Link href="/app/houses">
						<IconButton>
							<HomeOutlinedIcon className="text-primary-20" />
						</IconButton>
					</Link>
					<IconButton onClick={handleUserPopoverOpen}>
						<AccountBoxOutlinedIcon className="text-primary-20" />
					</IconButton>
					<Menu
						id={userPopoverId}
						open={userPopoverOpen}
						anchorEl={userPopoverAnchorEl}
						onClose={handleUserPopoverClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<MenuItem className="text-primary-20 hover:text-primary-30 focus:text-primary-30 ">
							<Link href={"/app/profile"} className="w-full">
								Ver perfil
							</Link>
						</MenuItem>
						<MenuItem
							onClick={async () => {
								await dispatch(logoutUser());
								router.push("/");
							}}
							className="text-primary-20 hover:text-primary-30 focus:text-primary-30 "
						>
							Cerrar sesión
						</MenuItem>
					</Menu>
					<Popover
						id={notificationsPopoverId}
						open={notificationsPopoverOpen}
						anchorEl={notificationsPopoverAnchorEl}
						onClose={handleNotificationsPopoverClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<div className="flex p-2 w-full items-center gap-10">
							<p className="text-primary-10 text-lg flex-grow">Notificaciones</p>
							<div>
								<span>Sin leer</span>
								<Switch
									value={onlyNotSeen}
									onChange={() => {
										setOnlyNotSeen(!onlyNotSeen);
										setCurrentNotifications(
											notifications.filter((notification) => (onlyNotSeen ? notification.read === !onlyNotSeen : true)),
										);
										console.log(notifications);
									}}
								/>
							</div>
						</div>
						<hr />
						{currentNotifications.length === 0 ? (
							<p className="text-neutral-50 text-center m-3">No hay notificaciones {onlyNotSeen ? "sin leer" : ""}</p>
						) : (
							currentNotifications.map((notification) => (
								<MenuItem
									key={notification._id}
									onClick={async () => {
										const token = getCookie("auth-token");
										const refreshTokenCookie = getCookie("refresh-token");
										await readNotification(token, refreshTokenCookie, notification._id);
										setNotifications(
											notifications.map((n) => {
												if (n._id === notification._id) {
													n.read = true;
												}
												return n;
											}),
										);
									}}
									className={`${notification.read ? "bg-white" : "bg-neutral-95"} text-primary-20 
									hover:text-primary-30 focus:text-primary-30 
								`}
								>
									<div className="flex flex-row w-full min-w-max">
										<div className="flex-grow w-[23rem] break-words">
											<p className="font-semibold">{notification.title}</p>
											<p>{notification.description}</p>
											<p className={`text-neutral-40 text-xs ${!notification.read ? "" : "hidden"}`}>
												Da clic para marcar como visto
											</p>
										</div>
										<IconButton
											onClick={async () => {
												const token = getCookie("auth-token");
												const refreshTokenCookie = getCookie("refresh-token");
												await deleteNotification(token, refreshTokenCookie, notification._id);
												setNotifications(notifications.filter((n) => n._id !== notification._id));
											}}
											className="h-fit"
										>
											<CloseIcon />
										</IconButton>
									</div>
								</MenuItem>
							))
						)}
					</Popover>
				</div>
			</Box>
			<hr className="border border-neutral_variant-80 w-full" />
		</>
	);
};

export default AppNavbar;
