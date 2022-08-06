import "./App.css";
import "./style.css";
import { useState, useEffect } from "react";
import "./SensorsCardContainer";
import SensorCardsContainer from "./SensorsCardContainer";

function App() {
	const [sensors, fetchSensors] = useState([]);

	function draw_graph(sensor_name) {
		getData(sensor_name);
	}

	const getData = (sensor_name = "") => {
		var path = "";
		if (sensor_name) {
			path = `http://127.0.0.1:5000/?sensor_name=${sensor_name}`;
		} else {
			path = `http://127.0.0.1:5000/current_temp_humidity`;
		}
		fetch(path)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				fetchSensors(res);
			});
	};

	useEffect(() => {
		getData();
	}, []);

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

export default App;
