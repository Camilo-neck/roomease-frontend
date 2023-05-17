import { HouseI } from "@/dtos";
import GridHouseCard from "./gridHouseCard";
import ListHouseCard from "./listHouseCard";

const HousesGrid = ({ houses, view }: { houses: HouseI[]; view: string }) => {
	return (
		<div className="w-full h-full overflow-y-auto p-5">
			<div
				className={`flex justify-center items-center w-full min-w-[350px]
                ${view === "grid" ? "flex-row flex-wrap" : "flex-col"} 
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
