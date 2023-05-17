import Image from "next/image";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import Link from "next/link";
import { UserI } from "@/dtos";
import { stringAvatar } from "@/utils/avatar.utils";

const GridHouseCard = ({
	name,
	description,
	img,
	id,
	users,
}: {
	name: string;
	description: string;
	img: string;
	id: string;
	users: UserI[];
}) => {
	return (
		<div className="flex flex-col bg-white shadow-lg rounded-lg">
			<Image
				src={img ? img : "/house_placeholder.jpg"}
				alt="house placeholder"
				width={280}
				height={250}
				className="rounded-t-lg max-h-36 object-cover min-h-[144px]"
				priority
			/>
			<div className="flex flex-col gap-2 p-5">
				<div className="flex flex-row w-full items-center">
					<p className="font-semibold text-lg flex-grow">{name}</p>
				</div>
				<div className="flex flex-row w-full items-center">
					<AvatarGroup
						max={3}
						sx={{
							"& .MuiAvatar-root": {
								width: 24,
								height: 24,
							},
						}}
						className="flex flex-grow items-center justify-end p-1 text-sm"
					>
						{users.map((user) => {
							return user.profile_picture && user.profile_picture !== "" ? (
								<Avatar key={user._id} alt={user.name} src={user.profile_picture} {...stringAvatar(user.name)} />
							) : (
								<Avatar key={user._id} {...stringAvatar(user.name)} />
							);
						})}
					</AvatarGroup>
					<Link href={`/app/house/${id}`}>
						<Button
							size="small"
							variant="outlined"
							className="bg-tertiary-80/30 hover:bg-tertiary-80/50 active:bg-tertiary-80/70 border-tertiary-20 
                            hover:border-tertiary-20 text-tertiary-20 rounded-full"
						>
							Abrir
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default GridHouseCard;
