import React from 'react';

import * as SearchActions from '../actions/SearchActions';

export default class Search extends React.Component {
	constructor() {
		super();
		this.state={
			distance: '',
			query: '' 
		};
	}

	getDistance(e) {
		this.setState({
			distance: e.target.value
		});
	}

	getQuery(e) {
		this.setState({
			query: e.target.value
		});
	}

	findPlaces(e) {
		if (e.keyCode==13) {
			e.preventDefault();
			
			const { query, distance }=this.state;
			SearchActions.findPlaces(distance, query);

			this.setState({
				distance: '',
				query: ''
			});
		}
	}

	render() {
		const { distance, query }=this.state;

		return (
			<div id="search">
				<div class="input-group">
					<span class="input-group-addon">Distance</span>
					<input type="text" onChange={this.getDistance.bind(this)} value={distance}
					class="form-control" aria-describedby="basic-addon1" />
				</div>
				<div class="input-group">
					<span class="input-group-addon" id="basic-addon1">Find</span>
					<input type="text" onChange={this.getQuery.bind(this)} value={query} 
					onKeyDown={this.findPlaces.bind(this)} class="form-control" aria-describedby="basic-addon1" />
				</div>
			</div>
		)
	}
}