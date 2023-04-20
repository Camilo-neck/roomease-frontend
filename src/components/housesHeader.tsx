import Image from "next/image";

import AddHomeRoundedIcon from "@mui/icons-material/AddHomeRounded";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HousesHeader = ({
	addPopoverId,
	handleAddPopoverClick,
	addPopoverOpen,
	addPopoverAnchorEl,
	handleAddPopoverClose,
	openCreateHouseModal,
	openJoinHouseModal,
}: {
	addPopoverId: string | undefined;
	handleAddPopoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	addPopoverOpen: boolean;
	addPopoverAnchorEl: HTMLButtonElement | null;
	handleAddPopoverClose: () => void;
	openCreateHouseModal: () => void;
	openJoinHouseModal: () => void;
}) => {
	return (
		<div className="flex flex-row h-fit w-full">
			<div className="flex flex-grow items-center">
				<Image src="/houses_icon.png" alt="homes icon" width={45} height={45} />
				<p className="font-semibold text-3xl">Mis casas</p>
			</div>
			<IconButton
				aria-describedby={addPopoverId}
				onClick={handleAddPopoverClick}
				className="bg-tertiary-60 hover:bg-tertiary-60/90 active:bg-tertiary-60 focus:bg-tertiary-60
                text-white hover:text-tertiary-95 transition-colors ease-linear duration-200 h-fit"
			>
				<AddHomeRoundedIcon />
			</IconButton>
			<Menu
				id={addPopoverId}
				open={addPopoverOpen}
				anchorEl={addPopoverAnchorEl}
				onClose={handleAddPopoverClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<MenuItem
					onClick={openCreateHouseModal}
					className="text-primary-20 hover:text-primary-30 focus:text-primary-30"
				>
					Crear casa
				</MenuItem>
				<MenuItem onClick={openJoinHouseModal} className="text-primary-20 hover:text-primary-30 focus:text-primary-30">
					Unirse a casa
				</MenuItem>
			</Menu>
		</div>
	);
};

export default HousesHeader;
