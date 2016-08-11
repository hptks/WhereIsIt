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

	render() {
		return (
			<div>
				<Map lat={this.state.lat} lng={this.state.lng} />
				<Search />
			</div>
		)
	}
}