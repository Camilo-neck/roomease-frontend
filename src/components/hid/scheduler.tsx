import React, { useEffect, useRef } from "react";
import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";

const MyScheduler = ({ data, isAdaptable }: { data: any; isAdaptable: boolean }) => {
	const schedulerRef = useRef<any | null>(null);

	useEffect(() => {
		const currentDate = new Date();
		schedulerRef.current?.instance?.scrollTo(currentDate);
		// schedulerRef.current?.instance?.scrollToTime(8, 0);
	}, []);

	return (
		<Scheduler
			ref={schedulerRef}
			dataSource={data}
			defaultCurrentView="week"
			startDayHour={0}
			endDayHour={24}
			shadeUntilCurrentTime={true}
			className="h-full"
			editing={false}
			adaptivityEnabled={isAdaptable}
		/>
	);
};

export default MyScheduler;
