import React from 'react';

export default class Map extends React.Component {
	componentDidMount() {
		this.loadMap();
	}

	componentWillUpdate() {
		this.loadMap();
	}

	loadMap() {
		const { lat, lng }=this.props;
		const lat_lng={ lat, lng };
		const mapDiv=document.getElementById('map');

		let map=new google.maps.Map(mapDiv, {
			center: lat_lng,
			zoom: 12
		});

		let marker=new google.maps.Marker({
			position: lat_lng,
		});
		marker.setMap(map);
	}

	render() {
		return (
			<div id="map"></div>
		)
	}
}