import Image from "next/image";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import Link from "next/link";
import { UserI } from "@/dtos";
import { stringAvatar } from "@/utils/avatar.utils";

const ListHouseCard = ({
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
		<div className="flex flex-row bg-white shadow-lg rounded-lg min-w-[600px]">
			<Image
				src={img ? img : "/house_placeholder.jpg"}
				alt="house placeholder"
				width={300}
				height={250}
				className="rounded-l-lg"
				priority
			/>
			<div className="flex flex-col gap-1 p-5 min-w-[300px] md:w-[700px]">
				<p className="font-semibold text-2xl">{name}</p>
				<p className="max-h-24 line-clamp-3 flex-grow">{description}</p>
				<div className="flex flex-row w-full self-end">
					<div className="flex flex-col gap-1 flex-grow">
						<p className="font-semibold">Integrantes:</p>
						<AvatarGroup
							max={4}
							spacing={2}
							sx={{
								"& .MuiAvatar-root": {
									width: 35,
									height: 35,
									fontSize: 14,
								},
							}}
							className="flex-grow flex justify-end text-sm"
						>
							{users.map((user) => {
								return user.profile_picture && user.profile_picture !== "" ? (
									<Avatar key={user._id} alt={user.name} src={user.profile_picture} {...stringAvatar(user.name)} />
								) : (
									<Avatar key={user._id} {...stringAvatar(user.name)} />
								);
							})}
						</AvatarGroup>
					</div>
					<Link className="self-end" href={`/app/house/${id}`}>
						<Button
							size="small"
							variant="outlined"
							className="bg-tertiary-80/30 hover:bg-tertiary-80/50 active:bg-tertiary-80/70 border-tertiary-20
							hover:border-tertiary-20 text-tertiary-20 rounded-full h-fit self-end"
						>
							Abrir
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ListHouseCard;
