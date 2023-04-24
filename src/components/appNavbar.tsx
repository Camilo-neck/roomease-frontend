import Link from "next/link";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/helpers/auth.helpers";
import { useRouter } from "next/navigation";

const AppNavbar = ({ sidebarWidth }: { sidebarWidth?: number }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [userPopoverAnchorEl, setUserPopoverAnchorEl] = useState<null | HTMLElement>(null);
	const userPopoverOpen = Boolean(userPopoverAnchorEl);
	const userPopoverId = userPopoverOpen ? "user-popover" : undefined;

	const handleUserPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setUserPopoverAnchorEl(event.currentTarget);
	};

	const handleUserPopoverClose = () => {
		setUserPopoverAnchorEl(null);
	};

	return (
		<Box
			sx={{
				width: { md: `calc(100% - ${sidebarWidth}px)` },
				ml: { md: `${sidebarWidth}px` },
			}}
			className={`${sidebarWidth ? "min-w-full md:min-w-min" : "w-full min-w-full"} items-center flex flex-row p-2`}
		>
			<p className="font-bold text-xl text-primary-20 flex-grow">Roomease</p>
			<div className="flex flex-row gap-3 mr-5">
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
						<Link href={"/app/profile"}>Ver perfil</Link>
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
				<Link href="/app/houses">
					<IconButton>
						<HomeOutlinedIcon className="text-primary-20" />
					</IconButton>
				</Link>
				<IconButton>
					<SettingsOutlinedIcon className="text-primary-20" />
				</IconButton>
			</div>
		</Box>
	);
};

export default AppNavbar;
