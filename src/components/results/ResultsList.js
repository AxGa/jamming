import React, { Component } from 'react';
import {TrackList} from '../tracklist/TrackList';
import './ResultsList.css';

export class ResultsList extends Component {
	render() {
		return (
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
          </div>
		);
	}
}
