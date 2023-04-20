import ListRoundedIcon from "@mui/icons-material/ListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const LayoutGroupButtons = ({ view, onChange }: { view: string; onChange: (value: string) => void }) => {
	return (
		<div className="flex flex-col w-full items-end">
			<ToggleButtonGroup
				className="self-end"
				value={view}
				onChange={(e, newAlignment) => onChange(newAlignment)}
				exclusive
			>
				<ToggleButton value="list">
					<ListRoundedIcon />
				</ToggleButton>

				<ToggleButton value="grid">
					<GridViewRoundedIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};

export default LayoutGroupButtons;
