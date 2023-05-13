import { TaskI } from "@/dtos";
import { LinearProgress } from "@mui/material";

import { get_week_tasks } from "@/utils/weekTasks";

import { getUserTaskProgress, getHouseTaskProgress } from "@/utils/progress";

const Progress = ({ currentUserTasks, tasks }: { currentUserTasks: TaskI[]; tasks: TaskI[] }) => {
	return (
		<div className="bg-white p-5 rounded-lg h-full">
			<p className="text-xl">Progresos semanales</p>
			<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
				<p className="font-semibold">Mi progreso:</p>
				<LinearProgress
					variant="determinate"
					className="flex-grow rounded-lg col-span-5 h-2"
					value={getUserTaskProgress(currentUserTasks)}
				/>
			</div>
			<div className="grid grid-flow-row-dense grid-cols-6 items-center gap-2">
				<p className="font-semibold">Progreso de la casa:</p>
				<LinearProgress
					variant="determinate"
					className="flex-grow rounded-lg h-2 col-span-5"
					value={getHouseTaskProgress(tasks)}
				/>
			</div>
		</div>
	);
};

export default Progress;
