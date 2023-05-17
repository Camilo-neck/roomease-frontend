export interface UserI {
	_id: string;
	name: string;
	email: string;
	password: string;
	birth_date: Date;
	phone: string;
	description: string;
	profile_picture: string;
	tags: string[];
	scores: string[];
	events: string[];
	houses: HouseI[];
}

export interface LoggedUserI {
	_id: string;
	name: string;
	email: string;
}

export interface HouseI {
	_id: string;
	name: string;
	owner: string;
	house_code: string;
	description: string;
	house_picture: string;
	address: string;
	users: UserI[];
	tags: string[];
	pending_users: string[];
}

export interface TaskI {
	_id: string;
	name: string;
	description: string;
	house_id: string;
	users_id: string[];
	done?: boolean;
	created_by?: UserI;
	start_date: Date;
	end_date: Date;
	repeat: boolean;
	days?: string[];
	until_date?: Date;
}

export interface HoursTaskI {
	start: string;
	end: string;
}
