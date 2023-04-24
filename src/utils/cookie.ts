export function setCookie(
	cname: string,
	cvalue: any,
	date: Date = new Date(),
	exdays: number | null = null,
	time: number | null = null,
	path: string = "/",
) {
	// cname: cookie name
	// cvalue: cookie value
	// date: date object to set cookie
	// exdays: number of days to expire
	// path: path to set cookie
	const d = date;
	if (exdays) d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	else if (time) d.setTime(d.getTime() + time);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

export function getCookie(cname: string) {
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export function checkCookie() {
	let user: string | null = getCookie("username");
	if (user != "") {
		alert("Welcome again " + user);
	} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, undefined, 365);
		}
	}
}

export function deleteCookie(cname: string) {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
