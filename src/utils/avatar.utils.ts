import { Color } from "@mui/material";

export function stringToColor(string: string, rgba: boolean = false): string {

	/* const getHashOfString = (str: string) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
		  hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		hash = Math.abs(hash);
		return hash;
	};
	const normalizeHash = (hash: number, min: number, max: number) => {
		return Math.floor((hash % (max - min)) + min);
	};

	const hRange = [0, 360];
	const sRange = [50, 60];
	const lRange = [45, 55];

	const generateHSL = (name: string): [h: number, s: number, l: number] => {
		const hash = getHashOfString(name);
		const h = normalizeHash(hash, hRange[0], hRange[1]);
		const s = normalizeHash(hash, sRange[0], sRange[1]);
		const l = normalizeHash(hash, lRange[0], lRange[1]);
		return [h, s, l];
	};

	const HSLtoString = (hsl: [h: number, s: number, l: number]) => {
		return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
	};


	return HSLtoString(generateHSL(string)); */


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
