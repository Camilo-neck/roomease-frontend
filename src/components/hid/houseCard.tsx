// React
import * as React from "react";

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

const HouseCard = ({
	name,
	description,
	address,
	picture,
	code,
	openEditHouseModal,
	isOwner,
}: {
	name: string;
	description: string;
	address: string;
	picture: string;
	code: string;
	openEditHouseModal: () => void;
	isOwner: boolean;
}) => {
	return (
		<Card className="shadow-lg rounded-lg" sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 150 }} image={picture ? picture : "/house_placeholder.jpg"} />
			<CardContent>
				<Typography className="text-center leading-5 font-semibold text-lg" gutterBottom component="div">
					{name}
				</Typography>
				<Typography className="text-xs text-center line-clamp-1 text-primary-40 font-mono" gutterBottom component="div">
					{code}
				</Typography>
				<Typography className="text-sm text-center line-clamp-1" gutterBottom component="div" color="text.secondary">
					{address}
				</Typography>
				<Typography className="line-clamp-3 leading-5 text-sm">{description}</Typography>
			</CardContent>
			{isOwner ? (
				<CardActions className="flex flex-col items-center p-3 w-full">
					<Button
						onClick={openEditHouseModal}
						style={{ textTransform: 'none' }}
						className="bg-secondary-90/70 hover:bg-secondary-90/90 active:bg-secondary-80/80 rounded-2xl w-[50%]"
						size="small"
					>
						Editar
					</Button>
				</CardActions>
			) : (
				<></>
			)}
		</Card>
	);
};

export default HouseCard;
