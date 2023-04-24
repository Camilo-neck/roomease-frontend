import {
	IconButton,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TasksList from "./tasksList";
import { TaskI } from "@/utils/interfaces";

const TasksBar = ({
	currentUserTasks,
	onCreateTask,
	onListChange
}:{
	currentUserTasks: TaskI[],
	onCreateTask: () => void,
	onListChange: (tid: string) => void
}) => {
	return (
		<div className="w-[30%]">
			<div className="flex flex-col-reverse md:flex-row items-start md:items-center mr-5">
				<p className="text-lg font-semibold flex-grow">Mis tareas:</p>
				<IconButton
					color="primary"
					className="bg-primary-90 hover:bg-primary-80 active:bg-primary-80"
					onClick={onCreateTask}
				>
					<AddRoundedIcon />
				</IconButton>
			</div>
			<TasksList
				tasks={currentUserTasks}
				onChange={onListChange}
			/>
		</div>
	);
};

export default TasksBar;