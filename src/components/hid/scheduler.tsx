import React, { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";

const MyScheduler = ({ data, isAdaptable }: { data: any; isAdaptable: boolean }) => {
	return (
		<Scheduler
			dataSource={data}
			defaultCurrentView="week"
			currentDate={new Date()}
			startDayHour={7}
			endDayHour={21}
			showCurrentTimeIndicator={true}
			shadeUntilCurrentTime={true}
			indicatorUpdateInterval={60000}
			
			className="h-full"
			editing={false}
			adaptivityEnabled={isAdaptable}
		/>
	);
};

export default MyScheduler;
