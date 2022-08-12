import "./App.css";
import "./style.css";
import { useState, useEffect } from "react";
import "./SensorsCardContainer";
import "./ChartComponent";
import SensorCardsContainer from "./SensorsCardContainer";
import ChartComponent from "./ChartComponent";

function App() {
	const [sensors, fetchSensors] = useState([]);
	const [graph, setGraph] = useState([]);
	const options = {};
	// use state to store the graph data
	// const [graph_data, setGraphData] = useState([]);
	// const [graph_sensor_name, setGraphSensorName] = useState("");

	//draw graph when sensor name is clicked
	async function draw_graph(sensor_name, device_name) {
		//populate graph_sensor_name with sensor_name

		var chart_data = Object.values(sensor_name)[0];
		// loop through chart_data dictionary and get the keys
		var time_stamp = Object.keys(chart_data);
		// console.log(keys);
		var temp = [];
		var hum = [];
		// loop through the keys and get the values
		for (var i = 0; i < time_stamp.length; i++) {
			temp.push(chart_data[time_stamp[i]].T);
			hum.push(chart_data[time_stamp[i]].H);
		}
		//set graph_data with the data
		setGraph({
			device_name: device_name,
			time_stamp: time_stamp,
			temp: temp,
			hum: hum,
		});
		// setGraphSensorName(sensor_name);
		// call getDat function and wait for response to populate graph_data
		// setGraphData(data);
		//wait for response to populate graph_data
		// setGraphData(data);

		// console.log(graph_sensor_name);
		console.log(graph);
	}

	const getData = (sensor_name = "") => {
		var path = "";
		if (sensor_name) {
			path = `http://127.0.0.1:5000/?sensor_name=${sensor_name}`;
		} else {
			path = `http://127.0.0.1:5000/`;
		}
		fetch(path)
			.then((res) => res.json())
			.then((res) => {
				if (sensor_name) {
					return res;
				} else {
					fetchSensors(res);
					console.log(res);
				}
			});
	};

	useEffect(() => {
		getData();
	}, []);

	if (Object.keys(graph).length > 0) {
		return (
			<ChartComponent
				data={graph}
				options={options}
				setGraph={setGraph}
			></ChartComponent>
		);
	} else {
		return (
			<div className="App">
				<div className="sensor-cards">
					<SensorCardsContainer
						data={sensors}
						graph={draw_graph}
					></SensorCardsContainer>
				</div>
			</div>
		);
	}
}

export default App;
