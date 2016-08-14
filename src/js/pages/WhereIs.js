import React from 'react';

import Map from '../components/Map';
import Search from '../components/Search';

export default class WhereIs extends React.Component {
	constructor() {
		super();
		this.state={
			lat: 51.5085300,
			lng: -0.1257400
		};
	}

	componentDidMount() {
		let element=document.getElementById('supports');
		const { lat, lng }=this.state;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}, () => {
				const nlat=this.state.lat, nlng=this.state.lng;
				if (lat==nlat&&lng==nlng) {
					this.handleLocationError(false, element);
				} else {
					this.handleLocationError(true, element);
				}
			});
		} else {
			this.handleLocationError(false, element);
		}
	}

	handleLocationError(browserSupportsLocation, element) {
		if (browserSupportsLocation) {
			element.innerHTML='';
			element.innerHTML='Location found';
		} else {
			element.innerHTML='';
			element.innerHTML='Location not found';
		}
	}

	render() {
		return (
			<div>
				<Map lat={this.state.lat} lng={this.state.lng} />
				<Search /><br />
				<div id="supports"></div>
			</div>
		)
	}
}