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
			SearchActions.findPlaces(query);

			this.setState({
				query: ''
			});
		}
	}

	render() {
		const { query }=this.state;

		return (
			<div id="search">
				<div class="input-group">
					<span class="input-group-addon" id="basic-addon1">Find</span>
					<input type="text" onChange={this.getQuery.bind(this)} value={query} 
					onKeyDown={this.findPlaces.bind(this)} class="form-control" aria-describedby="basic-addon1" />
				</div>
			</div>
		)
	}
}