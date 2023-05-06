import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TasksList from "./tasksList";
import { TaskI } from "@/dtos";

const TasksBar = ({
	currentUserTasks,
	onCreateTask,
	onListChange,
	onEdit,
	onDelete,
}: {
	currentUserTasks: TaskI[];
	onCreateTask: () => void;
	onListChange: (tid: string) => void;
	onEdit: (tid: string) => void;
	onDelete: (tid: string) => void;
}) => {
	return (
		<div className="w-[30%] p-1 bg-primary-100 rounded-md">
			<div className="flex flex-col-reverse md:flex-row items-start md:items-center mx-5 my-2">
				<p className="text-lg font-semibold flex-grow text-primary-30">Mis tareas:</p>
				<IconButton
					color="primary"
					className="bg-primary-90 hover:bg-primary-80 active:bg-primary-80"
					onClick={onCreateTask}
				>
					<AddRoundedIcon />
				</IconButton>
			</div>
			<hr />
			<TasksList tasks={currentUserTasks} onChange={onListChange} onEdit={onEdit} onDelete={onDelete} />
		</div>
	);
};

export default TasksBar;
