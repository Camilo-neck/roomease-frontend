import React from "react";
import "devextreme/dist/css/dx.light.css";
import { Scheduler, Resource } from "devextreme-react/scheduler";

const appointments = [
	{
		text: "Website Re-Design Plan",
		startDate: new Date(2021, 4, 22, 9, 30),
		endDate: new Date(2021, 4, 22, 11, 30),
	},
	{
		text: "Book Flights to San Fran for Sales Trip",
		startDate: new Date(2021, 4, 22, 12, 0),
		endDate: new Date(2021, 4, 22, 13, 0),
		allDay: true,
	},
	{
		text: "Install New Router in Dev Room",
		startDate: new Date(2021, 4, 22, 14, 30),
		endDate: new Date(2021, 4, 22, 15, 30),
	},
	{
		text: "Approve Personal Computer Upgrade Plan",
		startDate: new Date(2021, 4, 23, 10, 0),
		endDate: new Date(2021, 4, 23, 11, 0),
	},
	{
		text: "Final Budget Review",
		startDate: new Date(2021, 4, 23, 12, 0),
		endDate: new Date(2021, 4, 23, 13, 35),
	},
	{
		text: "New Brochures",
		startDate: new Date(2021, 4, 23, 14, 30),
		endDate: new Date(2021, 4, 23, 15, 45),
	},
	{
		text: "Install New Database",
		startDate: new Date(2021, 4, 24, 9, 45),
		endDate: new Date(2021, 4, 24, 11, 15),
	},
	{
		text: "Approve New Online Marketing Strategy",
		startDate: new Date(2021, 4, 24, 12, 0),
		endDate: new Date(2021, 4, 24, 14, 0),
	},
	{
		text: "Upgrade Personal Computers",
		startDate: new Date(2021, 4, 24, 15, 15),
		endDate: new Date(2021, 4, 24, 16, 30),
	},
	{
		text: "Customer Workshop",
		startDate: new Date(2021, 4, 25, 11, 0),
		endDate: new Date(2021, 4, 25, 12, 0),
		allDay: true,
	},
];

const MyScheduler = () => {
	const [data, setData] = React.useState(appointments);

	return (
		<Scheduler
			dataSource={data}
			defaultCurrentView="day"
			defaultCurrentDate={new Date(2021, 4, 22)}
			startDayHour={9}
			endDayHour={19}
			className="h-full"
		>
			<Resource
				dataSource={[
					{ text: "Room 1", id: 1, color: "#cb6bb2" },
					{ text: "Room 2", id: 2, color: "#56ca85" },
				]}
				fieldExpr="roomId"
				useColorAsDefault={true}
			/>
		</Scheduler>
	);
};

export default MyScheduler;
