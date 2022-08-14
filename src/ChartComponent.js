import Chart from "react-apexcharts";
import "./ChartComponent.css";

const ChartComponent = (data) => {
	var series = [
		{
			name: "Temperature",
			data: data.data.temp,
		},
		{
			name: "Humidity",
			data: data.data.hum,
		},
	];
	var options = {
		chart: {
			height: 350,
			type: "line",
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		xaxis: {
			type: "scale",
			categories: data.data.time_stamp,
		},
		yaxis: {
			title: {
				text: "Temperature on " + data.data.currentDate,
			},
		},
		title: {
			text: data.data.device_name + " on " + data.data.currentDate,
			align: "left",
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: "18px",
				color: "#263238",
			},
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};
	function hideGraph() {
		//set graph to empty array
		data.setGraph([]);
	}
	return (
		<div className="chart">
			<h1>Chart</h1>
			<span className="btn btn-close" onClick={() => hideGraph()}>
				X
			</span>
			<Chart options={options} series={series} type="bar" width="100%" />
		</div>
	);
};

export default ChartComponent;
