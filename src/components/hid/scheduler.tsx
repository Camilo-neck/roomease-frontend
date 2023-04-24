import React from "react";
import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";

const MyScheduler = ({ data, isAdaptable }: { data: any; isAdaptable: boolean }) => {
	return (
		<Scheduler
			dataSource={data}
			defaultCurrentView="day"
			defaultCurrentDate={new Date()}
			startDayHour={0}
			endDayHour={24}
			className="h-full"
			editing={false}
			adaptivityEnabled={isAdaptable}
		/>
	);
};

export default MyScheduler;
