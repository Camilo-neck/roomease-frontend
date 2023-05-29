// React
import * as React from "react";

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const HouseCard = ({
	name,
	description,
	address,
	picture,
	code,
	openEditHouseModal,
	openDeleteHouseConfirmationDialog,
	isOwner,
}: {
	name: string;
	description: string;
	address: string;
	picture: string;
	code: string;
	openEditHouseModal: () => void;
	openDeleteHouseConfirmationDialog: () => void;
	isOwner: boolean;
}) => {
	return (
		<Card className="shadow-lg rounded-lg" sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 150 }} image={picture ? picture : "/house_placeholder.jpg"} />
			<CardContent>
				<Typography className="text-center leading-5 font-semibold text-lg" gutterBottom component="div">
					{name}
				</Typography>
				<Typography
					onClick={async () => await navigator.clipboard.writeText(code)}
					className="text-xs text-center line-clamp-1 hover:line-clamp-none text-primary-40 font-mono cursor-pointer hover:text-primary-50 active:text-primary-30"
					gutterBottom
					component="div"
				>
					<ContentCopyIcon fontSize="small" />
					{code}
				</Typography>
				<Typography className="text-sm text-center line-clamp-1 hove:line-clamp-none" gutterBottom component="div" color="text.secondary">
					{address}
				</Typography>
				<Typography className="line-clamp-3 hover:line-clamp-none leading-5 text-sm">{description}</Typography>
			</CardContent>
			{isOwner ? (
				<CardActions className="flex flex-col md:flex-row items-center p-3 w-full">
					<Button
						onClick={openEditHouseModal}
						style={{ textTransform: "none" }}
						className="bg-secondary-90/70 hover:bg-secondary-90/90 active:bg-secondary-80/80 rounded-2xl w-full"
						size="small"
					>
						Editar
					</Button>
					<Button
						onClick={openDeleteHouseConfirmationDialog}
						style={{ textTransform: "none" }}
						className="bg-error-90/70 hover:bg-error-90/90 active:bg-error-80/80 rounded-2xl w-full mt-2 md:mt-0 md:ml-2"
						size="small"
						color="error"
					>
						Eliminar
					</Button>
				</CardActions>
			) : (
				<></>
			)}
		</Card>
	);
};

export default HouseCard;
