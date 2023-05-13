import { TaskI } from "@/dtos";
import { LinearProgress } from "@mui/material";

import { get_week_tasks } from "@/utils/weekTasks";

import { getUserTaskProgress, getHouseTaskProgress } from "@/utils/progress";
import LiquidProgress from "./liquidProgress";

const Progress = ({ currentUserTasks, tasks }: { currentUserTasks: TaskI[]; tasks: TaskI[] }) => {
	return (
		<div className="flex flex-col items-center bg-white p-5 rounded-lg h-full">
			<p className="text-xl self-start font-bold text-primary-30">Progresos semanales</p>
			<div className="flex mt-5 gap-10">
				<div className="flex flex-col items-center gap-2">
					<p className="self-start font-semibold text-neutral-20">Mi progreso:</p>
					{/* <LinearProgress
						variant="determinate"
						className="flex-grow rounded-lg col-span-5 h-2"
						value={getUserTaskProgress(currentUserTasks)}
					/> */}
					<LiquidProgress
						percent={getUserTaskProgress(currentUserTasks)/100}
					/>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="self-start font-semibold text-neutral-20">Progreso de la casa:</p>
					{/* <LinearProgress
						variant="determinate"
						className="flex-grow rounded-lg h-2 col-span-5"
						value={getHouseTaskProgress(tasks)}
					/> */}
					<LiquidProgress
						percent={getHouseTaskProgress(tasks)/100}
					/>
				</div>
			</div>
		</div>
	);
};

export default Progress;
