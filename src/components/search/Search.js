import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {
	constructor(props){
		super(props);
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	search(){
		this.props.onSearch(this.state.term);
	}

	handleTermChange(event){
		this.setState({term: event.target.value});
	}

	render() {
		return (
			<div className="SearchBar">
	          <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
	          <a onClick={this.search}>SEARCH</a>
	        </div>
		);
	}
}
