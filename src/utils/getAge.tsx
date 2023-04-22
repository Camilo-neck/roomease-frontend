import moment from "moment";

export function getAge(birthDateString: Date) {
	const birthdate = moment(birthDateString);
	const age = moment().diff(birthdate, "years");
	return age;
}
