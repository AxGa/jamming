import React, { Component } from 'react';
import {Track} from '../track/Track';
import './TrackList.css';

export class TrackList extends Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => {
						return <Track key={track.ID} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>;
					})
				}
			</div>
		);
	}
}
