// Material UI
import { Card, Paper, Stack, Typography, Divider, Avatar, Grid, CardActions, Button } from "@mui/material";

// Utils
import { getAge } from "@/utils/getAge";
import { stringAvatar, stringToColor } from "@/utils/avatar.utils";

interface ProfileCardProps {
	name: string;
	email: string;
	description: string;
	birthDate: Date;
	phone: string;
	tags: string[];
	profile_picture: string;
	openEditProfileModal: () => void;
}

const ProfileCard = ({
	name,
	email,
	description,
	birthDate,
	phone,
	tags,
	profile_picture,
	openEditProfileModal,
}: ProfileCardProps) => {
	return (
		<Card className="flex flex-col w-full min-h-[650px] h-full rounded-lg shadow-lg">
			<Stack alignItems={"center"} style={{ position: "relative" }} className="h-full">
				<div className="bg-gradient-to-t from-primary-50 to-secondary-60 w-full min-h-[150px]"></div>
				<Avatar
					alt={name}
					src={profile_picture}
					{...stringAvatar(name, 120, 40)}
					style={{
						position: "absolute",
						top: "25%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						border: "4px solid white",
					}}
				></Avatar>
				<div className="w-full h-[10%] min-h-[70px]"></div>
				<span className="font-semibold text-[1.5rem]">{name}</span>
				<span className="text-sm pb-2">{email}</span>
				<Stack className="w-[80%] pt-3 items-center" spacing={1}>
					<span className="text-sm">
						<span className="font-semibold">Edad: </span>
						{getAge(birthDate)} años
					</span>
					<span className="text-sm">
						<span className="font-semibold">Teléfono: </span>
						{phone}
					</span>
				</Stack>
				<Divider className="w-[80%] pt-5" />
				<div className="w-[75%] pt-5 pb-5">
					<Typography className="line-clamp-5 hover:line-clamp-none transition-all duration-300 leading-5 text-sm text-center">{description}</Typography>
				</div>
				<Divider className="w-[80%] pt-3" />
				<div className="w-[80%] pt-5 pb-5">
					<Grid container spacing={2} className="justify-center">
						{tags.map((tag, id) => (
							<Grid item key={id}>
								<Paper className="text-sm p-1 capitalize" style={{ backgroundColor: stringToColor(tag, true) }}>
									{tag}
								</Paper>
							</Grid>
						))}
					</Grid>
				</div>
			</Stack>
			<CardActions className="flex flex-1 justify-center items-end p-3 py-5 w-full">
				<Button
					onClick={openEditProfileModal}
					className="bg-secondary-90/70 hover:bg-secondary-90/90 active:bg-secondary-80/80 rounded-2xl capitalize px-3"
					size="small"
					style={{ textTransform: "none" }}
				>
					Editar mi información
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProfileCard;
