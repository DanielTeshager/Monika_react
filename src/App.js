import "./App.css";
import "./style.css";
import { useState, useEffect } from "react";
import "./SensorsCardContainer";
import "./ChartComponent";
import SensorCardsContainer from "./SensorsCardContainer";
import ChartComponent from "./ChartComponent";
import HeaderComponent from "./HeaderComponent";

function App() {
	const [sensors, fetchSensors] = useState([]);
	const [graph, setGraph] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());

	//draw graph when sensor name is clicked
	async function draw_graph(sensor_name, device_name) {
		//populate graph_sensor_name with sensor_name
		console.log(sensor_name);
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
		//replace underscore with space in device_name
		device_name = device_name.replace(/_/g, " ");
		//capitalize first letter of device_name
		device_name = device_name.charAt(0).toUpperCase() + device_name.slice(1);
		//set graph_data with the data
		setGraph({
			device_name: device_name,
			time_stamp: time_stamp,
			temp: temp,
			hum: hum,
			currentDate: currentDate,
		});
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
					fetchSensors(res.data);
					console.log(res);
					setCurrentDate(res.current_date);
				}
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<HeaderComponent />

			<div className="main container">
				<div className="sensor-cards">
					<SensorCardsContainer
						data={sensors}
						graph={draw_graph}
					></SensorCardsContainer>
				</div>
				{Object.keys(graph).length > 0 && (
					<ChartComponent data={graph} setGraph={setGraph}></ChartComponent>
				)}
			</div>
		</div>
	);
}

export default App;
