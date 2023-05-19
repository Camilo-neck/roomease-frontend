import { Drawer, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HouseCard from "./houseCard";
import PeopleCard from "./peopleCard";
import { HouseI, TaskI, UserI } from "@/dtos";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";

const Sidebar = ({
	house,
	sidebarWidth,
	mobileSidebarOpen,
	container,
	tasks,
	onMobileSidebarClose,
	openEditHouseModal,
	isOwner,
}: {
	house: HouseI;
	sidebarWidth: number;
	mobileSidebarOpen: boolean;
	container: undefined | HTMLElement;
	tasks: TaskI[];
	onMobileSidebarClose: (new_value: boolean) => void;
	openEditHouseModal: () => void;
	isOwner: boolean;
}) => {
	const [currentUsers, setCurrentUsers] = useState<UserI[]>(house.users);
	const [currentPendingUsers, setCurrentPendingUsers] = useState<UserI[]>(house.pending_users);
	const router = useRouter();

	const onAcceptUser = (user: UserI) => {
		setCurrentUsers([...currentUsers, user]);
		setCurrentPendingUsers(currentPendingUsers.filter((pending_user) => pending_user._id !== user._id));
	};

	const onRejectUser = (user: UserI) => {
		setCurrentPendingUsers(currentPendingUsers.filter((pending_user) => pending_user._id !== user._id));
	};

	const onKickUser = (user: UserI) => {
		setCurrentUsers(currentUsers.filter((kicked_user) => kicked_user._id !== user._id));
	};

	return (
		<div>
			<nav className={`md:w-[270px] md:flex-shrink-0`}>
				<Drawer
					sx={{
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: sidebarWidth,
						},
					}}
					variant="permanent"
					className="bg-primary-95 hidden md:block"
				>
					<div className="bg-primary-40/10 h-full">
						{/* House card */}
						<div className="p-5 items-center">
							<HouseCard
								name={house.name}
								address={house.address}
								description={house.description}
								picture={house.house_picture}
								code={house.house_code}
								openEditHouseModal={openEditHouseModal}
								isOwner={isOwner}
							/>
						</div>
						{/* House members */}
						<div className="p-5 pt-0">
							<PeopleCard
								tasks={tasks}
								users={currentUsers}
								pending_users={currentPendingUsers}
								house_id={house._id}
								isOwner={isOwner}
								Owner={house.owner}
								onAcceptUser={onAcceptUser}
								onRejectUser={onRejectUser}
								onKickUser={onKickUser}
							/>
						</div>
						<div className="w-full flex flex-col items-center">
							<Button
								endIcon={<ExitToAppIcon />}
								color="error"
								className="bg-error-90/70 hover:bg-error-90/90 active:bg-error-80/80 border border-error-50 rounded-2xl"
								onClick={async () => {
									const token = getCookie("auth-token");
									await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/leave/${house._id}`, {
										method: "PUT",
										headers: {
											"Content-Type": "application/json",
											"auth-token": token,
										},
									});
									router.push("/app/houses");
								}}
							>
								Salir de casa
							</Button>
						</div>
					</div>
				</Drawer>
				<Drawer
					sx={{
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: sidebarWidth,
						},
					}}
					anchor="left"
					open={mobileSidebarOpen}
					onClose={() => onMobileSidebarClose(false)}
					container={container}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					className="bg-primary-95 block md:hidden"
				>
					<div className="bg-primary-40/10 h-full">
						<Button onClick={() => onMobileSidebarClose(!mobileSidebarOpen)} className="block md:hidden">
							Toggle
						</Button>
						{/* House card */}
						<div className="p-5 items-center">
							<HouseCard
								name={house.name}
								address={house.address}
								description={house.description}
								picture={house.house_picture}
								code={house.house_code}
								openEditHouseModal={openEditHouseModal}
								isOwner={isOwner}
							/>
						</div>
						{/* House members */}
						<div className="p-5 pt-0">
							<PeopleCard
								users={currentUsers}
								tasks={tasks}
								pending_users={currentPendingUsers}
								house_id={house._id}
								isOwner={isOwner}
								Owner={house.owner}
								onAcceptUser={onAcceptUser}
								onRejectUser={onRejectUser}
								onKickUser={onKickUser}
							/>
						</div>
					</div>
				</Drawer>
			</nav>
		</div>
	);
};

export default Sidebar;
