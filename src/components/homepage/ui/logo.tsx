import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";

export default function Logo() {
	return (
		<Link href="/" className="block" aria-label="Cruip">
			<div className="grid grid-cols-6 items-center">
				<div className="col-span-2">
					<HouseIcon fontSize="large" />
				</div>
				<div className="col-span-4">
					<p className="font-bold text-xl text-primary-20 flex-grow">Roomease</p>
				</div>
			</div>
		</Link>
	);
}
