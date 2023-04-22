import moment from "moment";

export function getAge(birthDateString: string) {
	const birthdate = moment(birthDateString);
	const age = moment().diff(birthdate, "years");
	return age;
}
