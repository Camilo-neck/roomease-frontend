import Link from "next/link";

import { Box, IconButton } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const AppNavbar = ({ sidebarWidth }: { sidebarWidth?: number }) => {
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
				<Link href="/app/profile">
					<IconButton>
						<AccountBoxOutlinedIcon className="text-primary-20" />
					</IconButton>
				</Link>
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
