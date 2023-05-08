import { TaskI } from "@/dtos";

export const get_week_tasks = (tasks: TaskI[]) => {
	const today = new Date();
	const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

	return tasks.filter((task: TaskI) => {
		const t_date = task.until_date ? task.until_date : task.end_date;
		const taskDate = new Date(t_date);
		return taskDate >= firstDayOfWeek;
	});
};