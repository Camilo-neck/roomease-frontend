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
		<div className="w-[35%] min-w-[250px] p-1 pl-2 bg-primary-100 rounded-md rounded-b-none max-h-[70vh] min-h-[500px]">
			<div className="flex flex-row items-center mx-5 h-[10%]">
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
			{currentUserTasks.length === 0 ? (
				<div className="flex flex-col items-center justify-center w-full h-[90%]">
					<div className="flex items-center justify-center">
						<img className="opacity-50 w-[30%]" src="/checklist-icon.png" alt="" />
					</div>
					<p className="text-center text-primary-40 p-5">
						Todavía no tienes tareas.<br></br> ¡Empieza a planear tu semana!
					</p>
				</div>
			) : (
				<TasksList tasks={currentUserTasks} onChange={onListChange} onEdit={onEdit} onDelete={onDelete} />
			)}
		</div>
	);
};

export default TasksBar;
