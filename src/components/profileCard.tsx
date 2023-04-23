// Material UI
import { Card, Paper, Stack, Typography, Divider, Avatar } from "@mui/material";

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
		<Card className="w-full h-[49%] rounded-md">
			<Stack alignItems={"center"} className="w-full h-full" style={{ position: "relative" }}>
				<div className="bg-sky-500 w-full h-[25%]"></div>
				<Avatar
					{...stringAvatar(name, 96, 30)}
					style={{
						position: "absolute",
						top: "25%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						border: "4px solid white",
					}}
				></Avatar>
				<div className="h-[15%]"></div>
				<span className="font-semibold text-xl pb-1">{name}</span>
				<span className="text-sm">
					<span className="font-semibold">Correo: </span>
					{email}
				</span>
				<span className="text-sm">
					<span className="font-semibold">Edad: </span>
					{getAge(birthDate)}
				</span>
				<span className="text-sm">
					<span className="font-semibold">Teléfono: </span>
					{phone}
				</span>
				<Divider className="w-[90%] pt-3" />
				<div className="w-[90%] pt-2">
					<Typography className="line-clamp-2 leading-5 text-sm text-center">{description}</Typography>
				</div>
				<Divider className="w-[90%] pt-3" />
				<div className="w-[90%] pt-2">
					<Stack className="w-full" justifyContent={"center"} direction="row" spacing={2}>
						{tags.map((tag, id) => (
							<Paper className="text-xs p-1" style={{ backgroundColor: stringToColor(tag, true) }} key={id}>
								{tag}
							</Paper>
						))}
					</Stack>
				</div>
			</Stack>
		</Card>
	);
};

export default ProfileCard;
