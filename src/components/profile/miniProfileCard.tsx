// Material UI
import { Card, Paper, Stack, Typography, Divider, Avatar, CircularProgress, Box, Button } from "@mui/material";
import EjectIcon from '@mui/icons-material/Eject';

// Utils
import { getAge } from "@/utils/getAge";
import { stringAvatar, stringToColor } from "@/utils/avatar.utils";
import { TaskI, UserI } from "@/dtos";

import { getUserTaskProgress } from "@/utils/progress";
import { isPending } from "@reduxjs/toolkit";

const MiniProfileCard = ({ user, userTasks, isPendingUser, isOwner, OwnerId }: { user: UserI; userTasks: TaskI[], isPendingUser: boolean, isOwner:boolean, OwnerId:string }) => {
	return (
		<Card className="w-full h-[49%] rounded-md p-3">
			<Stack alignItems={"center"} className="w-full h-full" style={{ position: "relative" }}>
				<div className="flex flex-row gap-2">
					<Avatar
						alt={user?.name} src={user?.profile_picture}
						{...stringAvatar(user ? user?.name : " ", 96, 30)}
						style={{
							border: "4px solid white",
						}}
					/>
					<div>
						<p className="font-semibold text-xl pb-1">{user?.name}</p>
						<p className="text-sm">
							<span className="font-semibold">Correo: </span>
							{user?.email}
						</p>
						<p className="text-sm">
							<span className="font-semibold">Edad: </span>
							{getAge(user?.birth_date)}
						</p>
						<p className="text-sm">
							<span className="font-semibold">Teléfono: </span>
							{user?.phone}
						</p>
					</div>
				</div>
				<Divider className="w-[90%] pt-3" />
				<div className="w-[90%] pt-2">
					<Typography className="line-clamp-2 leading-5 text-sm text-center">{user?.description}</Typography>
				</div>
				<Divider className="w-[90%] pt-3" />
				<div className="w-[90%] pt-2">
					<Stack className="flex flex-wrap gap-2" justifyContent={"center"} direction="row" spacing={2}>
						{user?.tags.map((tag, id) => (
							<Paper className="text-xs p-1" style={{ backgroundColor: stringToColor(tag, true) }} key={id}>
								{tag}
							</Paper>
						))}
					</Stack>
				</div>
				{!isPendingUser && (
					<>
					<Divider className="w-[90%] pt-3" />
					<div className="w-[90%] pt-2">
						<p className="text-sm font-semibold text-center mb-1">Avance de tareas</p>
						<Box className="justify-center w-full" sx={{ position: "relative", display: "inline-flex" }}>
							<CircularProgress variant="determinate" value={getUserTaskProgress(userTasks)} />
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Typography className="text-xs">{getUserTaskProgress(userTasks)}%</Typography>
							</Box>
						</Box>
					</div>
					{isOwner && user?._id !== OwnerId && (
						<>
							<div className="w-full flex flex-col items-center">
								<Button
									endIcon={<EjectIcon />}
									color="error"
									className="bg-error-90/70 hover:bg-error-90/90 active:bg-error-80/80 border border-error-50 rounded-2xl"
									/* onClick={async () => {
										const token = getCookie("auth-token");
										await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/leave/${house._id}`, {
											method: "PUT",
											headers: {
												"Content-Type": "application/json",
												"auth-token": token,
											},
										});
										router.push("/app/houses");
									}} */
								>
									Expulsar de la casa
								</Button>
							</div>
						</>
					)}
					</>
				)}
				
			</Stack>
		</Card>
	);
};

export default MiniProfileCard;
