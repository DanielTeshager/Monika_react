const SensorCard = ({ sensor, getGraph }) => {
	// render only when sensor is not empty

	// handle click event

	if (sensor) {
		var sensor_name = Object.keys(sensor)[0];
		var key_time = Object.keys(sensor[sensor_name])[0];
		var sensor_data = sensor[sensor_name][key_time];

		function getClick() {
			console.log(Object.keys(sensor)[0]);
			getGraph(sensor, sensor_name);
		}

		return (
			<div className="sensor-card" onClick={getClick}>
				<div className="temp">
					<h3 id="temp_value">{sensor_data.T}</h3>
					<h4>°C</h4>
				</div>
				<div className="hum">
					<h3 id="hum_value">{sensor_data.H}</h3>
					<h4>%</h4>
				</div>
				<div className="sensor_detail">
					<p className="sensor_name">{sensor_name}</p>
				</div>
			</div>
		);
	}
};

export default SensorCard;
