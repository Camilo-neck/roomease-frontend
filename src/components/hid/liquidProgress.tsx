import dynamic from "next/dynamic";

//import { Liquid } from '@ant-design/plots';
const Liquid = dynamic(() => import("@ant-design/charts").then(({ Liquid }: any) => Liquid), { ssr: false });

interface LiquidProgressProps {
	percent: number;
	shape?: string;
}

const LiquidProgress = ({ percent, shape }: LiquidProgressProps) => {
	const config: any = {
		height: 300,
		width: 300,
		autoFit: false,
		percent: percent,
		shape: shape,
		outline: {
			border: 4,
			distance: 8,
		},
		wave: { length: 128 },
		// liquidStyle: (percent: number) => {
		// 	return {
		// 		fill: percent > 0.65 ? 'green' : 'red',
		// 	};
		// },
	};

	return <Liquid {...config} />;
};

export default LiquidProgress;
