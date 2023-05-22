import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";

export default function Logo() {
	return (
		<Link href="/app/houses" className="block" aria-label="Cruip">
			<div className="flex">
				<div className="pr-1">
					<HouseIcon fontSize="large" />
				</div>
				<div className="flex items-center justify-center">
					<p className="font-bold text-xl text-primary-20 flex-grow">RoomEase</p>
				</div>
			</div>
		</Link>
	);
}
