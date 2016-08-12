import React from 'react';

import SearchStore from '../stores/SearchStore';

export default class Map extends React.Component {
	constructor() {
		super();
		this.map=null;
		this.lat_lng=null;
	}

	componentDidMount() {
		this.loadMap();
	}

	componentWillMount() {
		SearchStore.on('find', (query) => {
			this.findPlaces(query);
		});
	}

	componentWillUpdate() {
		this.loadMap();
	}

	displayPhoto(url) {
		return '<img src="'+url+'" />';
	}

	findPlaces(query) {
		let infoWindow=new google.maps.InfoWindow();
		let service=new google.maps.places.PlacesService(this.map);
		service.nearbySearch({
			location: this.lat_lng,
			radius: 300,
			type: [query]
		}, (results, status) => {
			if (status===google.maps.places.PlacesServiceStatus.OK) {
				for (let i=0;i<results.length;i++) {
					let place=results[i];
					let photo=place.photos[0];

					let marker=new google.maps.Marker({
						map: this.map,
						position: place.geometry.location,
					});

					google.maps.event.addListener(marker, 'click', () => {
						infoWindow.setContent(this.displayPhoto(photo.getUrl({ 'maxWidth': 200, 'maxHeight': 200 })));
						infoWindow.open(this.map, marker);
					});
				}
			}
		});
	}

	loadMap() {
		const { lat, lng }=this.props;
		this.lat_lng={ lat, lng };
		const mapDiv=document.getElementById('map');

		this.map=new google.maps.Map(mapDiv, {
			center: this.lat_lng,
			zoom: 13
		});
	}

	render() {
		return (
			<div id="map"></div>
		)
	}
}