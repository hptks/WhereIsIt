import React from 'react';

import SearchStore from '../stores/SearchStore';

export default class Map extends React.Component {
	constructor() {
		super();
		this.map=null;
		this.lat_lng=null;
		this.days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	}

	componentDidMount() {
		this.loadMap();
	}

	componentWillMount() {
		SearchStore.on('find', (distance, query) => {
			this.loadMap();
			this.findPlaces(distance, query);
		});
	}

	componentWillUpdate() {
		this.loadMap();
	}

	openingHours(openNow, periods) {
		if (openNow) {
			return '<div id="ok"><b>Open now</b></div>';
		} else {
			let s='<div id="no"><b>Closed now</b></div>';
			if (typeof periods!=='undefined') {
				for (let i=0;i<peirods.length;i++) {
					let open=periods[i].open;
					s+='<div>'+this.days[open.day]+'&nbsp;'+open.time+'</div>';
				}
			}

			return s;
		}
	}

	displayInfo(url, name, rating) {
		return '<img src="'+url+'" /><div><b>'+name+'</b></div>'+
			   '<div>Rating:&nbsp'+rating+'/5.0</div>';
	}

	findPlaces(distance, query) {
		let infoWindow=new google.maps.InfoWindow();
		let service=new google.maps.places.PlacesService(this.map);
		service.nearbySearch({
			location: this.lat_lng,
			radius: distance,
			type: [query]
		}, (results, status) => {
			if (status===google.maps.places.PlacesServiceStatus.OK) {
				for (let i=0;i<results.length;i++) {
					let place=results[i];
					let photo=place.photos[0];
					let url=photo.getUrl({ 'maxWidth': 200, 'maxHeight': 200 });

					let marker=new google.maps.Marker({
						map: this.map,
						position: place.geometry.location,
					});

					marker.addListener('click', () => {
						let content=this.displayInfo(url, place.name, place.rating)+this.openingHours(place.opening_hours.open_now, place.opening_hours.periods);
						infoWindow.setContent(content);
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