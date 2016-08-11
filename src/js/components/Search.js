import React from 'react';

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

	findPlace(e) {
		if (e.keyCode==13) {
			e.preventDefault();
			
			const { query }=this.state;
			console.log(query);

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
				onKeyDown={this.findPlace.bind(this)} />
			</div>
		)
	}
}