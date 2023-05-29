import { Color } from "@mui/material";

export function stringToColor(string: string, rgba: boolean = false): string {
	if (!string) {
		return "#000";
	}
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

	if (rgba) {
		return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(
			color.slice(5, 7),
			16,
		)}, 0.3)`;
	}
	return color;
}

export function stringAvatar(name: string, size: number = 24, fontSize: number = 10) {
	if (!name || name.length < 1) {
		return {
			sx: {
				bgcolor: "#000",
				width: size,
				height: size,
				fontSize: fontSize,
			},
			children: "NA",
		};
	}
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: size,
			height: size,
			fontSize: fontSize,
		},
		children: name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.split(" ")[0][0]}`,
	};
}
