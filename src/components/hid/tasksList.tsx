import { TaskI } from "@/dtos";
import { Avatar, AvatarGroup, Checkbox, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { stringAvatar } from "@/utils/avatar.utils";

function formatHour(hour: number) {
	return hour < 10 ? "0" + hour : hour;
}

function getHours(start_date: Date, end_date: Date) {
	return `${formatHour(start_date.getHours())}:${formatHour(start_date.getMinutes())} - ${formatHour(
		end_date.getHours(),
	)}:${formatHour(end_date.getMinutes())}`;
}

const Task = ({ task, onChange }: { task: TaskI; onChange: (tid: string) => void }) => (
	<div
		className={`flex flex-row m-1 mr-2 ${task.done ? "bg-primary-90/90" : "bg-neutral-95"} p-2 rounded-xl shadow-sm transition-all duration-300`}
	>
		<div className="flex flex-col gap-1 w-full">
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
				label={<p className="font-semibold">{task.name}</p>}
				className="flex-grow"
			/>
			<div className="flex text-xs ml-1">
				<AvatarGroup
					max={3}
					sx={{
						"& .MuiAvatar-root": {
							width: 14,
							height: 14,
						},
					}}
				>
					{task.users.map((user) => (
						<Avatar key={user._id} {...stringAvatar(user.name)} />
					))}
				</AvatarGroup>
				<p>{getHours(new Date(task.start_date), new Date(task.end_date))}</p>
				{task.repeat && <EventRepeatIcon htmlColor="#C5533F" fontSize="inherit" className="ml-2" />}
			</div>
		</div>
		<div>
			<IconButton>
				<DeleteIcon color="error" />
			</IconButton>
		</div>
	</div>
);

const TasksList = ({ tasks, onChange }: { tasks: TaskI[]; onChange: (tid: string) => void }) => {
	return (
		<FormGroup className="flex flex-col gap-2 p-1 m-1 mt-2 rounded-lg min-h-full">
			{tasks.map((task) => (
				<Task key={task._id} task={task} onChange={onChange} />
			))}
		</FormGroup>
	);
};

export default TasksList;
