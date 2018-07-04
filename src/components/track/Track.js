import React, { Component } from 'react';

export class Track extends Component {
	constructor(props){
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	renderAction(){
		return this.props.isRemoval === true ? <a className="Track-action" onClick={this.removeTrack}>-</a> : <a className="Track-action" onClick={this.addTrack}>+</a>;
	}
	addTrack(){
		this.props.onAdd(this.props.track);
	}
	removeTrack(){
		this.props.onRemove(this.props.track);
	}
	render() {
		return (
			<div className="Track">
				<div className="Track-information">
				  <h3>{this.props.track.Name}</h3>
				  <p>{this.props.track.Artist} | {this.props.track.Album}</p>
				</div>
				{this.renderAction()}
			</div>
		);
	}
}
