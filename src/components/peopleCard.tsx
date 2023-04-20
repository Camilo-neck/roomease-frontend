// React
import * as React from "react";

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { acceptPendingUser, rejectPendingUser } from "@/controllers/houses.controllers";

const getUsers = () => {
	const users = {
		members: [
			{
				id: 1,
				name: "Juan",
				lastName: "Perez",
				owner: true,
			},
			{
				id: 2,
				name: "Maria",
				lastName: "Perez",
				owner: false,
			},
		],
		pending: [
			{
				id: 3,
				name: "Pedro",
				lastName: "Perez",
				owner: false,
			},
			{
				id: 4,
				name: "Ana",
				lastName: "Rodriguez",
				owner: false,
			},
		],
	};
	return users;
};

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: 24,
			height: 24,
			fontSize: 10,
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

const NestedList = ({ users, pending_users, house_id }: { users: any[]; house_id: string; pending_users?: any[] }) => {
	const [open1, setOpen1] = React.useState(true);
	const [open2, setOpen2] = React.useState(true);
	// const users = getUsers();

	const handleClick1 = () => {
		setOpen1(!open1);
	};
	const handleClick2 = () => {
		setOpen2(!open2);
	};

	return (
		<List
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader className="text-center font-bold text-base p-2" component="div" id="nested-list-subheader">
					Integrantes
				</ListSubheader>
			}
		>
			<ListItemButton className="p-1" onClick={handleClick1}>
				<ListItemIcon>
					<PersonIcon />
				</ListItemIcon>
				<ListItemText primary="Miembros" />
				{open1 ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open1} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{users.map((user, id) => (
						<ListItem className="p-1 pl-5" key={id}>
							<ListItemIcon>
								<Avatar {...stringAvatar(user.name)} />
							</ListItemIcon>
							<ListItemText>
								<Typography className="text-xs">{user.name}</Typography>
							</ListItemText>
						</ListItem>
					))}
				</List>
			</Collapse>
			{pending_users && (
				<>
					<ListItemButton className="p-1" onClick={handleClick2}>
						<ListItemIcon>
							<PersonAddIcon />
						</ListItemIcon>
						<ListItemText primary="Pendientes" />
						{open2 ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open2} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{pending_users.map((user, id) => (
								<>
									<div className="flex flex-col">
										<ListItem
											className="p-1 pl-5"
											key={user.id}
											secondaryAction={
												<>
													<IconButton
														size="small"
														aria-label="accept"
														onClick={async () => await acceptPendingUser(house_id, user._id)}
													>
														<CheckIcon htmlColor="green" fontSize="small" />
													</IconButton>
													<IconButton
														size="small"
														edge="end"
														aria-label="reject"
														onClick={async () => await rejectPendingUser(house_id, user._id)}
													>
														<ClearSharpIcon htmlColor="red" fontSize="small" />
													</IconButton>
												</>
											}
										>
											<ListItemIcon>
												<Avatar {...stringAvatar(user.name)} />
											</ListItemIcon>
											<ListItemText>
												<Typography className="text-xs">{user.name}</Typography>
											</ListItemText>
										</ListItem>
									</div>
								</>
							))}
						</List>
					</Collapse>
				</>
			)}
		</List>
	);
};

const PeopleCard = ({ users, pending_users, house_id }: any) => {
	return (
		<Card className="shadow-lg rounded-lg">
			<CardContent>
				<NestedList users={users} pending_users={pending_users} house_id={house_id} />
			</CardContent>
			<CardActions className="items-center p-1">
				<Button className="w-full self-auto" size="small">
					Ver más
				</Button>
			</CardActions>
		</Card>
	);
};

export default PeopleCard;
