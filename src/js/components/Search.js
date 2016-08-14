import React from 'react';

import * as SearchActions from '../actions/SearchActions';

export default class Search extends React.Component {
	constructor() {
		super();
		this.state={
			query: '' 
		};
	}

	getQuery(e) {
		this.setState({
			query: e.target.value
		});
	}

	findPlaces(e) {
		if (e.keyCode==13) {
			e.preventDefault();
			
			const { query }=this.state;
			SearchActions.findPlaces('store');

			this.setState({
				query: ''
			});
		}
	}

	render() {
		const { query }=this.state;

		return (
			<div id="search">
				<label>Find:&nbsp;</label>
				<input type="text" onChange={this.getQuery.bind(this)} value={query} 
				onKeyDown={this.findPlaces.bind(this)} />
			</div>
		)
	}
}