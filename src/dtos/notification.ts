export interface NotificationI {
	_id: string;
	type: string;
	recipient: string;
	read: boolean;
	description: string;
	title: string;
}