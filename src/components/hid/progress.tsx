import { taskI } from "@/dtos";
import { LinearProgress } from "@mui/material";

const Progress = ({ currentUserTasks, tasks }: { currentUserTasks: TaskI[]; tasks: TaskI[] }) => {
	return (
		<div>
			<p className="text-xl">Progresos</p>
			<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
				<p className="font-semibold">Mi progreso:</p>
				<LinearProgress
					variant="determinate"
					className="flex-grow rounded-lg col-span-5 h-2"
					value={
						currentUserTasks.length > 0
							? (currentUserTasks.filter((task) => task.done).length * 100) / currentUserTasks.length
							: 0
					}
				/>
			</div>
			<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
				<p className="font-semibold">Progreso de la casa:</p>
				<LinearProgress
					variant="determinate"
					className="flex-grow rounded-lg h-2 col-span-5"
					value={tasks.length > 0 ? (tasks.filter((task) => task.done).length * 100) / tasks.length : 0}
				/>
			</div>
		</div>
	);
};

export default Progress;
