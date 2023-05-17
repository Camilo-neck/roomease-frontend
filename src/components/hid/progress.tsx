import { TaskI } from "@/dtos";
import { LinearProgress } from "@mui/material";

import { get_week_tasks } from "@/utils/weekTasks";

import { getUserTaskProgress, getHouseTaskProgress } from "@/utils/progress";
import LiquidProgress from "./liquidProgress";

const ProgressBars = ({ currentUserTasks, tasks }: { currentUserTasks: TaskI[]; tasks: TaskI[] }) => {
	return (
		<div className="flex flex-col items-center bg-white p-7 rounded-lg rounded-t-none w-full">
			<p className="text-xl self-start font-bold text-primary-30">Progresos semanales:</p>
			<div className="w-full flex flex-col flex-grow pl-2 mt-5 gap-5">
				<div className="flex flex-row items-center justify-center gap-2">
					<p className="self-center font-semibold text-neutral-20 w-[20%]">Mi progreso:</p>
					<LinearProgress
						variant="determinate"
						className="flex-grow rounded-lg col-span-5 h-3"
						value={getUserTaskProgress(currentUserTasks)}
					/>
					<div className="w-[3%]">
						<p className="text-sm text-neutral-20">{Math.round(getUserTaskProgress(currentUserTasks))}%</p>
					</div>
					{/* <LiquidProgress percent={getUserTaskProgress(currentUserTasks) / 100} shape="rect" /> */}
				</div>
				<div className="flex flex-row items-center gap-2">
					<p className="self-start font-semibold text-neutral-20 w-[20%]">Progreso de la casa:</p>
					<LinearProgress
						variant="determinate"
						className="flex-grow rounded-lg h-3 col-span-5"
						value={getHouseTaskProgress(tasks)}
					/>
					<div className="w-[3%]">
						<p className="text-sm text-neutral-20">{Math.round(getHouseTaskProgress(tasks))}%</p>
					</div>
					{/* <LiquidProgress percent={getHouseTaskProgress(tasks) / 100} shape="rect" /> */}
				</div>
			</div>
		</div>
	);
};

export default ProgressBars;
