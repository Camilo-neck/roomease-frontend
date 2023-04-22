import { stringToColor } from "./stringToColor";

export function stringAvatar(name: string, size: number = 24, fontSize: number = 10) {
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: size,
			height: size,
			fontSize: fontSize,
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}
