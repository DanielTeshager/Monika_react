import SensorCard from "./SensorCard";
const SensorCardsContainer = (data) => {
	//map only if data is not empty
	function handleclick(sensor) {
		// console.log(sensor);
		// console.log("clicked");
		console.log(data);
	}
	handleclick();
	if (data.data.length > 0) {
		return data.data.map((sensor, idx) => {
			return (
				<SensorCard
					sensor={sensor}
					key={idx}
					getGraph={data.graph}
				></SensorCard>
			);
		});
	}

	// const sensorCards = data.map((sensor) => {
	// 	return <SensorCard sensor={sensor} />;
	// });

	// return <div className="sensor-cards">{sensorCards}</div>;
};

export default SensorCardsContainer;
