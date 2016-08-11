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

	render() {
		const { query }=this.state;

		return (
			<div id="search">
				<label>Find:&nbsp;</label>
				<input type="text" onChange={this.getQuery.bind(this)} value={query} />
			</div>
		)
	}
}