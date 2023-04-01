import Link from "next/link";

import { IconButton } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const AppNavbar = () => {
    return (
        <div className="w-full min-w-full items-center flex flex-row p-2">
            <p className="font-bold text-xl text-primary-20 flex-grow">
                Roomease
            </p>
            <div className="flex flex-row gap-3 mr-5">
                <IconButton>
                    <AccountBoxOutlinedIcon className="text-primary-20" />
                </IconButton>
				<Link href='/app/houses'>
					<IconButton>
						<HomeOutlinedIcon className="text-primary-20" />
					</IconButton>
				</Link>
                <IconButton>
                    <SettingsOutlinedIcon className="text-primary-20" />
                </IconButton>
            </div>
        </div>
    );
};

export default AppNavbar;
