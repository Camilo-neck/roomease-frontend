import Image from "next/image";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";

const ListHouseCard = ({
	name,
	description,
}: {
	name: string;
	description: string;
}) => {
	return (
		<div className="flex flex-row bg-white shadow-lg rounded-lg">
			<Image
				src="/house_placeholder.jpg"
				alt="house placeholder"
				width={300}
				height={250}
				className="rounded-t-lg"
				priority
			/>
			<div className="flex flex-col gap-1 p-5 w-full">
				<p className="font-semibold text-2xl">{name}</p>
				<Rating
					className="flex-grow"
					name="read-only"
					value={4}
					size="medium"
					readOnly
				/>
				<p className="max-h-24 line-clamp-3">{description}</p>
				<div className="flex flex-row w-full">
					<div className="flex flex-col gap-1 flex-grow">
						<p className="font-semibold">Integrantes:</p>
						<AvatarGroup
							max={3}
							sx={{
								"& .MuiAvatar-root": {
									width: 35,
									height: 35,
									fontSize: "14px",
								},
							}}
							className="flex-grow flex justify-end text-sm"
						>
							<Avatar
								alt="Remy Sharp"
								src="/avatar_placeholder.webp"
							/>
							<Avatar
								alt="Travis Howard"
								src="/avatar_placeholder.webp"
							/>
							<Avatar
								alt="Cindy Baker"
								src="/avatar_placeholder.webp"
							/>
							<Avatar
								alt="Cindy Baker"
								src="/avatar_placeholder.webp"
							/>
						</AvatarGroup>
					</div>
					<Button
						size="small"
						variant="outlined"
						className="bg-tertiary-80/30 hover:bg-tertiary-80/50 active:bg-tertiary-80/70 border-tertiary-20
						hover:border-tertiary-20 text-tertiary-20 rounded-full h-fit self-end"
					>
						Abrir
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ListHouseCard;
