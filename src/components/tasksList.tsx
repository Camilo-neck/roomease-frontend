import { TaskI } from "@/lib/interfaces";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const TasksList = ({ tasks, onChange }: { tasks: TaskI[]; onChange: (tid: string) => void }) => {
	return (
		<FormGroup className="flex flex-col gap-2">
			{tasks.map((task) => (
				<FormControlLabel
					control={
						<Checkbox
							checked={task.done}
							name={task._id}
							onChange={async () => {
								await onChange(task._id);
							}}
						/>
					}
					key={task._id}
					label={task.name}
				/>
			))}
		</FormGroup>
	);
};

export default TasksList;
