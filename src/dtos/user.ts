import { HouseI } from ".";

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
