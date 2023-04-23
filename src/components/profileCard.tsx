// Material UI
import { Card, Paper, Stack, Typography, Divider, Avatar, Grid } from "@mui/material";

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
}

const ProfileCard = ({ name, email, description, birthDate, phone, tags }: ProfileCardProps) => {
	return (
		<Card className="w-full h-full rounded-lg shadow-lg">
			<Stack alignItems={"center"} className="w-full h-full" style={{ position: "relative" }}>
				<div className="bg-gradient-to-t from-primary-50 to-secondary-60 w-full h-[25%]"></div>
				<Avatar
					{...stringAvatar(name, 120, 40)}
					style={{
						position: "absolute",
						top: "25%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						border: "4px solid white",
					}}
				></Avatar>
				<div className="h-[10%]"></div>
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
					<Typography className="line-clamp-5 leading-5 text-sm text-center">{description}</Typography>
				</div>
				<Divider className="w-[80%] pt-3" />
				<div className="w-[80%] pt-5">
					<Grid container spacing={2} className="justify-center">
						{tags.map((tag, id) => (
							<Grid item key={id}>
								<Paper className="text-sm p-1" style={{ backgroundColor: stringToColor(tag, true) }}>
									{tag}
								</Paper>
							</Grid>
						))}
					</Grid>
				</div>
			</Stack>
		</Card>
	);
};

export default ProfileCard;
