import { UserI } from ".";

export interface TaskI {
	_id: string;
	name: string;
	description: string;
	house_id: string;
	users: UserI[];
	done?: boolean;
	created_by?: UserI;
	start_date: Date;
	end_date: Date;
	repeat: boolean;
	days?: string[];
	until_date?: Date;
}
