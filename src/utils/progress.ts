import { TaskI } from "@/dtos";
import { get_week_tasks } from "@/utils/weekTasks";

export const getUserTaskProgress = (currentUserTasks: TaskI[]) => {
	if (currentUserTasks.length === 0) return 0;
	return Math.round((currentUserTasks.filter((task) => task.done).length * 100) / currentUserTasks.length);
};

export const getHouseTaskProgress = (tasks: TaskI[]) => {
	if (tasks.length === 0) return 0;

	tasks = get_week_tasks(tasks);
	return (tasks.filter((task) => task.done).length * 100) / tasks.length;
};
