import { TaskI } from "@/dtos";
import { Avatar, AvatarGroup, Checkbox, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { stringAvatar } from "@/utils/avatar.utils";
import { recurrenceToDays } from "@/utils/recurrenceToDays";

function formatHour(hour: number) {
	return hour < 10 ? "0" + hour : hour;
}

function getHours(start_date: Date, end_date: Date) {
	return `${formatHour(start_date.getHours())}:${formatHour(start_date.getMinutes())} - ${formatHour(
		end_date.getHours(),
	)}:${formatHour(end_date.getMinutes())}`;
}

const Task = ({
	task,
	onChange,
	onEdit,
	onDelete,
}: {
	task: TaskI;
	onChange: (tid: string) => void;
	onEdit: (tid: string) => void;
	onDelete: (tid: string) => void;
}) => (
	<div
		className={`flex flex-col m-1 w-[95%] p-2 ${
			task.done ? "bg-primary-90/90" : "bg-neutral-95"
		} p-2 rounded-xl shadow-sm transition-all duration-300`}
	>
		<div className="flex flex-row">
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
			<div className="grid grid-cols-2 h-fit min-w-[50px] max-w-[50px]">
				<IconButton onClick={async () => await onEdit(task._id)}>
					<EditIcon color="primary" />
				</IconButton>
				<IconButton onClick={async () => await onDelete(task._id)}>
					<DeleteIcon color="error" />
				</IconButton>
			</div>
		</div>

		<div className="flex text-xs ml-1 pt-1">
			<AvatarGroup
				max={3}
				spacing={-1}
				sx={{
					"& .MuiAvatar-root": {
						width: 16,
						height: 16,
						fontSize: "0.5rem",
						border: "none",
					},
				}}
			>
				{task.users.map((user) => (
					<Avatar key={user._id} alt={user.name} src={user.profile_picture} {...stringAvatar(user.name)} />
				))}
			</AvatarGroup>

			<p className="pl-1 flex items-center">{getHours(new Date(task.start_date), new Date(task.end_date))}</p>
			{task.repeat && task.days && (
				<>
					<EventRepeatIcon htmlColor="#C5533F" fontSize="inherit" className="ml-2" />
					<p className="ml-1">{recurrenceToDays(task.days!)}</p>
				</>
			)}
		</div>
	</div>
);

const TasksList = ({
	tasks,
	onChange,
	onEdit,
	onDelete,
}: {
	tasks: TaskI[];
	onChange: (tid: string) => void;
	onEdit: (tid: string) => void;
	onDelete: (tid: string) => void;
}) => {
	return (
		<div className="overflow-y-auto flex flex-col gap-2 rounded-lg h-[90%]">
			{tasks.map((task) => (
				<Task key={task._id} task={task} onChange={onChange} onEdit={onEdit} onDelete={onDelete} />
			))}
		</div>
	);
};

export default TasksList;
