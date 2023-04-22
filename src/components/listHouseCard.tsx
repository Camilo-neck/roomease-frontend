import Image from "next/image";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import Link from "next/link";
import { UserI } from "@/lib/interfaces";
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
		<div className="flex flex-row bg-white shadow-lg rounded-lg">
			<Image
				src={img ? img : "/house_placeholder.jpg"}
				alt="house placeholder"
				width={300}
				height={250}
				className="rounded-t-lg"
				priority
			/>
			<div className="flex flex-col gap-1 p-5 w-full">
				<p className="font-semibold text-2xl">{name}</p>
				<Rating className="flex-grow" name="read-only" value={4} size="medium" readOnly />
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
							{users.map((user) => {
								return user.profile_picture && user.profile_picture !== "" ? (
									<Avatar key={user._id} alt={user.name} className="w-6 h-6" src={user.profile_picture} />
								) : (
									<Avatar key={user._id} className="w-6 h-6" {...stringAvatar(user.name)} />
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
