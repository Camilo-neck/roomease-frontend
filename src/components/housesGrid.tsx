import { HouseI } from "@/dtos";
import GridHouseCard from "./gridHouseCard";
import ListHouseCard from "./listHouseCard";

const HousesGrid = ({ houses, view }: { houses: HouseI[]; view: string }) => {
	return (
		<div className="w-full h-[68vh] overflow-y-auto rounded-lg">
			<div
				className={`flex w-full
                ${view === "grid" ? "flex-row flex-wrap" : "flex-col pr-5"} 
                gap-14 max-h-full`}
			>
				{view === "grid"
					? houses.map((house) => (
							<GridHouseCard
								key={house._id}
								name={house.name}
								description={house.description}
								img={house.house_picture}
								id={house._id}
								users={house.users}
							/>
					  ))
					: houses.map((house) => (
							<ListHouseCard
								key={house._id}
								name={house.name}
								description={house.description}
								img={house.house_picture}
								id={house._id}
								users={house.users}
							/>
					  ))}
			</div>
		</div>
	);
};

export default HousesGrid;
