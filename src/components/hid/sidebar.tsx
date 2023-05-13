import { Drawer, Button } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MediaCard from "./mediaCard";
import PeopleCard from "./peopleCard";
import { HouseI, TaskI } from "@/dtos";

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
							<MediaCard
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
							<PeopleCard tasks={tasks} users={house.users} pending_users={house.pending_users} house_id={house._id} />
						</div>
						<div className="w-full flex flex-col items-center">
							<Button endIcon={<ExitToAppIcon />} color="error" className="bg-error-90/70 hover:bg-error-90/90 active:bg-error-80/80 border border-error-50 rounded-2xl">
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
							<MediaCard
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
							<PeopleCard users={house.users} tasks={tasks} pending_users={house.pending_users} house_id={house._id} />
						</div>
					</div>
				</Drawer>
			</nav>
		</div>
	);
};

export default Sidebar;
