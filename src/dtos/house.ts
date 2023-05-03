import { UserI } from ".";

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
