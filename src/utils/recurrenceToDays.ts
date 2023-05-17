export function recurrenceToDays(days: string[]) {
	const translatedDays: Record<string, string> = {
		MO: "lun.",
		TU: "mar.",
		WE: "mié.",
		TH: "jue.",
		FR: "vie.",
		SA: "sáb.",
		SU: "dom.",
	};

	const order = ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."];

	const spanishDays = days.map((day) => translatedDays[day]).sort((a, b) => order.indexOf(a) - order.indexOf(b));

	return spanishDays.join(", ");
}
